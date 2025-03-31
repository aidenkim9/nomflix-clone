import { useQuery } from "@tanstack/react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieDetail,
  getSearchMovies,
  IMovieDetail,
  ISearchMovies,
} from "../api";
import { getBgPath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";

const Container = styled.div`
  height: 100vh;
  margin-top: 10%;
`;
const Movies = styled.div`
  padding: 50px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

const Movie = styled(motion.div)<{ bgphoto: string }>`
  font-size: 20px;
  margin-bottom: 20px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.bgphoto});
  cursor: pointer;
`;

const MovieTitle = styled.h1`
  font-size: 14px;
  margin-bottom: 10px;
`;

const SearchTitle = styled.h1`
  font-size: 20px;
  margin-left: 5%;
`;

const Loader = styled.div`
  height: 20vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BigMovie = styled(motion.div)`
  overflow: hidden;
  overflow-y: scroll;
  width: 60%;
  height: 80%;
  background-color: ${(props) => props.theme.black.lighter};
  position: fixed;
  top: 14%;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
`;

const BigCover = styled.div`
  width: 100%;
  height: 55%;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h1`
  font-size: 30px;
  position: absolute;
  top: 45%;
  left: 40%;
  width: 55%;
  font-weight: bold;
`;

const BigOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  padding-bottom: 20px;
`;

const BigTagline = styled.span`
  font-style: italic;
  opacity: 0.9;
`;

const BigPoster = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 30%;
  height: 50%;
  position: absolute;
  top: 35%;
  left: 5%;
`;

const BigInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60%;
  left: 40%;
  width: 100%;
`;

const BigHeader = styled.div`
  display: flex;
  margin-bottom: 2%;
  span,
  ul {
    margin-right: 2%;
  }
`;

const BigGenres = styled.ul`
  display: flex;
  li {
    margin-right: 3%;
  }
`;

const movieVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.3, delay: 0.3 },
  },
};

const bigMovieVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const movieMatch = useMatch("/search/:movieId");
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: searchData, isLoading: searchIsLoading } =
    useQuery<ISearchMovies>({
      queryKey: ["search", keyword],
      queryFn: () => getSearchMovies(keyword + ""),
    });
  const clickedMovie = searchData?.results.find(
    (movie) => movie.id === Number(movieMatch?.params.movieId)
  );
  const { data: movieDetailData, isLoading: movieDetailIsLoading } =
    useQuery<IMovieDetail>({
      queryKey: ["movies", "detail", clickedMovie],
      queryFn: () => getMovieDetail(clickedMovie ? clickedMovie.id + "" : ""),
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
                        <BigPoster
                          bgphoto={getBgPath(movieDetailData.poster_path)}
                        />
                        <BigInfo>
                          <BigHeader>
                            <span>
                              {movieDetailData.release_date.slice(0, 4)}
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
