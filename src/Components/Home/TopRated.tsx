import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getBgPath } from "../../utils";
import { ITopRated } from "../../api";
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
  top: -7%;
`;

const boxContainerVariants = {
  initial: {
    x: window.innerWidth,
  },
  animate: {
    x: 0,
    transition: { duration: 1 },
  },
  exit: {
    x: -window.innerWidth,
    transition: { duration: 1 },
  },
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

interface ITopRatedProps {
  movies?: ITopRated;
}

function TopRated({ movies }: ITopRatedProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const maxIndex = movies ? Math.floor(movies.results.length / offset) - 1 : 0;
  const navigate = useNavigate();

  const onIndexUp = () => {
    if (leaving) return;
    toggleLeaving();
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const getClickedMovie = (movieId: number) => {
    navigate(`/movies/top_rated/${movieId}`);
  };
  return (
    <Container>
      <Row>
        <Title>Top Rated</Title>
        <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
          <BoxContainer
            variants={boxContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "linear" }}
            key={index}
          >
            {movies?.results
              .slice(index * offset, index * offset + offset)
              .map((movie) => (
                <Box
                  layoutId={"top_rated/" + movie.id + ""}
                  variants={boxVariants}
                  onClick={() => getClickedMovie(movie.id)}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "linear" }}
                  key={movie.id}
                  bgphoto={getBgPath(movie.backdrop_path)}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </BoxContainer>
        </AnimatePresence>
        <IndexBtn onClick={onIndexUp} whileHover={{ opacity: 1 }}>
          😜
        </IndexBtn>
      </Row>
    </Container>
  );
}

export default TopRated;
