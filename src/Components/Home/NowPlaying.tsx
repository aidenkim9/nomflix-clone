import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { getBgPath } from "../../utils";
import { IGetMovies } from "../../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: relative;
  width: 100%;
  top: -12%;
`;

const Row = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 240px;
`;

const Title = styled(motion.div)`
  font-size: 25px;
  padding: 10px 10px 10px 20px;
  font-weight: bold;
`;

const IndexBtn = styled(motion.div)`
  height: 175px;
  width: 40px;
  font-size: 40px;
  padding: 30px;
  background-color: transparent;
  color: ${(props) => props.theme.white.darker};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  position: absolute;
  bottom: 0;
  &:last-child {
    right: 0;
  }
`;

const BoxContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
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
  bottom: -10%;
  h4 {
    text-align: center;
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
    scale: 1.15,
    y: -30,
    transition: { delay: 0.4, duration: 0.3 },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.4, duration: 0.3 },
  },
};

const offset = 6;

interface INowPlayingProps {
  movies?: IGetMovies;
}

function NowPlaying({ movies }: INowPlayingProps) {
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const navigate = useNavigate();

  const increaseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setNowPlayingIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setNowPlayingIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/now_playing/${movieId}`);
  };

  return (
    <Container>
      <Row>
        <Title>Now Playing</Title>
        <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
          <BoxContainer
            variants={rowVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{ type: "linear", duration: 1 }}
            key={nowPlayingIndex}
            custom={back}
          >
            {movies?.results
              .slice(1)
              .slice(
                offset * nowPlayingIndex,
                offset * nowPlayingIndex + offset
              )
              .map((movie) => (
                <Box
                  layoutId={"now_playing/" + movie.id + ""}
                  onClick={() => onBoxClicked(movie.id)}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  key={movie.id}
                  transition={{ type: "linear" }}
                  bgphoto={getBgPath(movie.backdrop_path || movie.poster_path)}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </BoxContainer>
        </AnimatePresence>

        <IndexBtn onClick={decreaseIndex} whileHover={{ opacity: 1 }}>
          ⬅︎
        </IndexBtn>
        <IndexBtn onClick={increaseIndex} whileHover={{ opacity: 1 }}>
          ➡︎
        </IndexBtn>
      </Row>
    </Container>
  );
}

export default NowPlaying;
