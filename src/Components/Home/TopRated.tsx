import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getBgPath } from "../../utils";
import { ITopRated } from "../../api";

const Container = styled.div`
  position: relative;
  top: -7%;
`;

const Title = styled(motion.div)`
  font-size: 25px;
  padding: 10px 10px 10px 20px;
  font-weight: bold;
`;

const Row = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 240px;
`;

const BoxContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
  bottom: 0;
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

const IndexBtn = styled(motion.div)`
  cursor: pointer;
  background-color: transparent;
  width: 60px;
  height: 175px;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
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
