import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IGetMovies, IUpcommingMovies } from "../../api";
import { getBgPath } from "../../utils";

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
  overflow: hidden;
  z-index: 99;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 310px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h1`
  font-size: 28px;
  padding: 20px;
  position: relative;
  top: -70px;
`;

const BigOverview = styled.p`
  padding: 30px;
  position: relative;
  top: -70px;
`;

interface IMovieDetailProps {
  nowPlayingMovies?: IGetMovies;
  upCommingMovies?: IUpcommingMovies;
}

function MovieDetail({ nowPlayingMovies, upCommingMovies }: IMovieDetailProps) {
  const navigate = useNavigate();
  const bannerMatch = useMatch("movies/banner/:movieId");
  const nowPlayingMatch = useMatch("movies/now_playing/:movieId");
  const upCommingMatch = useMatch("movies/up_comming/:movieId");
  console.log(bannerMatch, nowPlayingMatch, upCommingMatch);
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
      ));

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <>
      <AnimatePresence>
        {bannerMatch || nowPlayingMatch || upCommingMatch ? (
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
                  : ""
              }
            >
              {clickedMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), transparent), url(${getBgPath(
                        clickedMovie.backdrop_path || clickedMovie.poster_path
                      )})`,
                    }}
                  />
                  <BigTitle>{clickedMovie.title}</BigTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
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
