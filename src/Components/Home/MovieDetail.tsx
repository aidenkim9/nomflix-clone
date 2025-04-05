import { AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { IMediaItems, IMovieDetail } from "../../Api/types";
import { getMovieDetail } from "../../Api/api";
import { getBgPath } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import {
  Overlay,
  BigMovie,
  BigCover,
  BigPoster,
  BigHeader,
  BigTitle,
  BigGenres,
  BigInfo,
  BigOverview,
  BigTagline,
  BigX,
} from "../Common/MovieDetailStyled";
import { useEffect } from "react";

interface IMovieDetailProps {
  nowPlayingMovies?: IMediaItems;
  upCommingMovies?: IMediaItems;
  topRatedMovies?: IMediaItems;
}

function MovieDetail({
  nowPlayingMovies,
  upCommingMovies,
  topRatedMovies,
}: IMovieDetailProps) {
  const navigate = useNavigate();
  const bannerMatch = useMatch("movies/banner/:movieId");
  const nowPlayingMatch = useMatch("movies/now_playing/:movieId");
  const upCommingMatch = useMatch("movies/up_comming/:movieId");
  const topRatedMatch = useMatch("movies/top_rated/:movieId");

  const clickedMovie =
    (bannerMatch?.params.movieId &&
      nowPlayingMovies?.results.find(
        (movie) => movie.id === Number(bannerMatch.params.movieId)
      )) ||
    (nowPlayingMatch?.params.movieId &&
      nowPlayingMovies?.results.find(
        (movie) => movie.id === Number(nowPlayingMatch.params.movieId)
      )) ||
    (upCommingMatch?.params.movieId &&
      upCommingMovies?.results.find(
        (movie) => movie.id === Number(upCommingMatch?.params.movieId)
      )) ||
    topRatedMovies?.results.find(
      (movie) => movie.id === Number(topRatedMatch?.params.movieId)
    );
  const { data: movieDetailData, isLoading: movieDetailIsLoading } =
    useQuery<IMovieDetail>({
      queryKey: ["movies", "detail", clickedMovie],
      queryFn: () => getMovieDetail(clickedMovie ? clickedMovie.id + "" : ""),
    });

  const goBackHome = () => {
    navigate("/");
  };

  // useEffect(() => {
  //   if (clickedMovie) {
  //     document.body.style.overflow = "hidden";
  //   }
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [clickedMovie]);

  return (
    <>
      <AnimatePresence>
        {bannerMatch?.params.movieId ||
        nowPlayingMatch?.params.movieId ||
        upCommingMatch?.params.movieId ||
        topRatedMatch?.params.movieId ? (
          <>
            <Overlay
              onClick={goBackHome}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie
              layoutId={
                bannerMatch
                  ? "banner/" + bannerMatch.params.movieId
                  : nowPlayingMatch
                  ? "now_playing/" + nowPlayingMatch.params.movieId
                  : upCommingMatch
                  ? "up_comming/" + upCommingMatch.params.movieId
                  : topRatedMatch
                  ? "top_rated/" + topRatedMatch.params.movieId
                  : ""
              }
            >
              <BigX onClick={goBackHome}>X</BigX>
              {clickedMovie && movieDetailData && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), transparent), url(${getBgPath(
                        clickedMovie.backdrop_path || clickedMovie.poster_path
                      )})`,
                    }}
                  />
                  <BigTitle>{clickedMovie.title}</BigTitle>
                  <BigPoster bgphoto={getBgPath(movieDetailData.poster_path)} />
                  <BigInfo>
                    <BigHeader>
                      <span>{movieDetailData.release_date.slice(0, 4)}</span>
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
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default MovieDetail;

/*typescript
layoutId animation 렌더링 순서 문제 clickedMovie에서???
언제 state를 rendering 다시 하는게 좋은지?
rendering이 많을수록 최적화가 안되니 효율적인 방법은?
*/
