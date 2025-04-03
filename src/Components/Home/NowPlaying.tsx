import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBgPath } from "../../utils";
import { INowPlaying } from "../../api";
import {
  Title,
  Row,
  BoxContainer,
  Box,
  IndexBtn,
  Info,
} from "../Common/Styled";

const Container = styled.div`
  position: relative;
  top: -12%;
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
  movies?: INowPlaying;
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
