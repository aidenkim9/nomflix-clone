import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  IMovieDetail,
  INowPlaying,
  ITopRated,
  IUpcommingMovies,
} from "../../Api/types";
import { getMovieDetail } from "../../Api/api";
import { getBgPath } from "../../utils";
import { useQuery } from "@tanstack/react-query";

const Overlay = styled(motion.div)`
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  border-radius: 15px;
  width: 45vw;
  height: 80vh;
  position: fixed;
  overflow: scroll;
  z-index: 99;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
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

interface IMovieDetailProps {
  nowPlayingMovies?: INowPlaying;
  upCommingMovies?: IUpcommingMovies;
  topRatedMovies?: ITopRated;
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
