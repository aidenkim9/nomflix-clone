import { useQuery } from "@tanstack/react-query";
import { getMovies, getUpcomming, IGetMovies, IUpcommingMovies } from "../api";
import styled from "styled-components";
import { getBgPath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 200vh;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  font-weight: bold;
`;
const Overview = styled.p`
  font-size: 23px;
  width: 60%;
`;
const Slider = styled.div`
  position: relative;
  top: -200px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Row = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 0px;
  width: 100%;
`;

const IndexBtn = styled(motion.div)`
  height: 175px;
  width: 40px;
  font-size: 40px;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.3);
  color: ${(props) => props.theme.white.darker};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  opacity: 0;
  &:last-child {
    right: 0;
  }
`;

const BoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 175px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;

  &:last-child {
    transform-origin: center right;
  }
  &:first-child {
    transform-origin: center left;
  }
`;

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  padding: 10px;
  position: absolute;
  width: 100%;
  bottom: -30px;
  h4 {
    text-align: center;
  }
`;

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

const Options = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  &:first-child {
    width: 115px;
    background-color: ${(props) => props.theme.white.darker};
    color: black;
  }
  &:last-child {
    width: 145px;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const rowVariants = {
  initial: (back: boolean) => ({
    x: back ? -window.innerWidth - 10 : window.innerWidth + 10,
  }),
  visible: { x: 0 },
  exit: (back: boolean) => ({
    x: back ? window.innerWidth + 10 : -window.innerWidth - 10,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.5, duration: 0.3 },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.3 },
  },
};

const offset = 6;

function Home() {
  const bigMovieMatch = useMatch("movies/:movieId");
  const navigate = useNavigate();
  const { data: nowMovies, isLoading: nowMoviesLoading } = useQuery<IGetMovies>(
    {
      queryKey: ["movies", "nowPlaying"],
      queryFn: getMovies,
    }
  );
  const { data: upCommingMovies, isLoading: upcommingLoading } =
    useQuery<IUpcommingMovies>({
      queryKey: ["movies", "upcomming"],
      queryFn: getUpcomming,
    });

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    nowMovies?.results.find(
      (movie) => movie.id === Number(bigMovieMatch.params.movieId)
    );
  const increaseIndex = () => {
    if (nowMovies) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      const totalMovies = nowMovies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (nowMovies) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalMovies = nowMovies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const goBackHome = () => {
    navigate("/");
  };

  return (
    <Wrapper>
      {nowMoviesLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={getBgPath(nowMovies?.results[0].backdrop_path || "")}
          >
            <Title>{nowMovies?.results[0].title}</Title>
            <Overview>{nowMovies?.results[0].overview}</Overview>
            <Options>
              <Button>Play</Button>
              <Button>
                <span>Detail</span>
              </Button>
            </Options>
          </Banner>
          <Slider>
            <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
              <Row
                variants={rowVariants}
                initial="initial"
                animate="visible"
                exit="exit"
                transition={{ type: "linear", duration: 1 }}
                key={index}
                custom={back}
              >
                <IndexBtn onClick={decreaseIndex} whileHover={{ opacity: 1 }}>
                  ⬅︎
                </IndexBtn>
                <BoxContainer>
                  {nowMovies?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        onClick={() => onBoxClicked(movie.id)}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        key={movie.id}
                        transition={{ type: "linear" }}
                        bgphoto={getBgPath(
                          movie.backdrop_path || movie.poster_path
                        )}
                      >
                        <Info variants={infoVariants}>
                          <h4>{movie.title}</h4>
                        </Info>
                      </Box>
                    ))}
                </BoxContainer>
                <IndexBtn onClick={increaseIndex} whileHover={{ opacity: 1 }}>
                  ➡︎
                </IndexBtn>
              </Row>
            </AnimatePresence>
            <AnimatePresence>
              {bigMovieMatch ? (
                <>
                  <Overlay
                    onClick={goBackHome}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <BigMovie layoutId={bigMovieMatch.params.movieId}>
                    {clickedMovie && (
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
                        <BigOverview>{clickedMovie.overview}</BigOverview>
                      </>
                    )}
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
