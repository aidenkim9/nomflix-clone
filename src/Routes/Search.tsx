import { useQuery } from "@tanstack/react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Loader } from "../Components/Common/SliderStyled";
import {
  SearchTitle,
  Movies,
  Movie,
  MovieTitle,
  Overlay,
  BigMovie,
  BigCover,
  BigPoster,
  BigTitle,
  BigInfo,
  BigHeader,
  BigGenres,
  BigTagline,
  BigOverview,
} from "../Components/Common/SearchStyled";
import { IMediaDetail, IMediaItems } from "../Api/types";
import { getMediaDetail, getSearchMovies } from "../Api/api";
import { getBgPath } from "../utils";
import { AnimatePresence } from "framer-motion";
import { movieVariants, bigMovieVariants } from "../motionVariants";

const Container = styled.div`
  height: 100vh;
  margin-top: 10%;
`;

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const movieMatch = useMatch("/search/:movieId");
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: searchData, isLoading: searchIsLoading } =
    useQuery<IMediaItems>({
      queryKey: ["search", keyword],
      queryFn: () => getSearchMovies(keyword + ""),
    });

  const clickedMovie = searchData?.results.find(
    (movie) => movie.id === Number(movieMatch?.params.movieId)
  );
  const { data: movieDetailData, isLoading: movieDetailIsLoading } =
    useQuery<IMediaDetail>({
      queryKey: ["movies", "detail", clickedMovie],
      queryFn: () =>
        getMediaDetail("movies", clickedMovie ? clickedMovie.id + "" : ""),
    });

  const goMovieDetail = (movieId: number) => {
    navigate(`/search/${movieId}?keyword=${keyword}`);
  };
  const goBack = () => {
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <Container>
      {searchIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SearchTitle>
            {searchData ? `Result of searching with "${keyword}"` : null}
          </SearchTitle>
          <Movies>
            {searchData?.results.map((movie) =>
              movie.backdrop_path ? (
                <Movie
                  variants={movieVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "linear" }}
                  onClick={() => goMovieDetail(movie.id)}
                  key={movie.id}
                  bgphoto={getBgPath(movie.backdrop_path)}
                >
                  <MovieTitle>{movie.title}</MovieTitle>
                </Movie>
              ) : null
            )}
          </Movies>
          {clickedMovie ? (
            <>
              <AnimatePresence>
                <Overlay
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={goBack}
                />
                <BigMovie
                  variants={bigMovieVariants}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                >
                  {movieDetailIsLoading ? (
                    <Loader>Loading...</Loader>
                  ) : (
                    movieDetailData && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), transparent), url(${getBgPath(
                              clickedMovie.backdrop_path ||
                                clickedMovie.poster_path
                            )})`,
                          }}
                        />
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigInfo>
                          <BigHeader>
                            <span>
                              {movieDetailData.release_date
                                ? movieDetailData.release_date.slice(0, 4)
                                : ""}
                            </span>
                            <span>{movieDetailData.runtime}m</span>
                            <BigGenres>
                              {movieDetailData.genres
                                .slice(0, 2)
                                .map((genre, index) => (
                                  <li key={index}>{genre.name}</li>
                                ))}
                            </BigGenres>
                            <span>{movieDetailData.vote_average}</span>
                          </BigHeader>
                          <BigOverview>
                            <BigTagline>
                              {movieDetailData.tagline
                                ? "【 " + movieDetailData.tagline + " 】"
                                : null}
                            </BigTagline>
                            {clickedMovie.overview}
                          </BigOverview>
                        </BigInfo>
                      </>
                    )
                  )}
                </BigMovie>
              </AnimatePresence>
            </>
          ) : null}
        </>
      )}
    </Container>
  );
}

export default Search;
