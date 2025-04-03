import { AnimatePresence } from "framer-motion";

import { Title, Row, BoxContainer, Box, IndexBtn, Info } from "./Common/Styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBgPath } from ".././utils";
import { INowPlaying, ITopRated, IUpcommingMovies } from ".././api";
import styled from "styled-components";
import { rowVariants, boxVariants, infoVariants } from "../Variants";

const Container = styled.div`
  position: relative;
`;

const offset = 6;

interface ISliderProps {
  title: string;
  movies: INowPlaying | IUpcommingMovies | ITopRated; //INowPlaying INowPlaying[] 차이?
  layoutId: string;
  top: number;
}

function Slider({ title, movies, layoutId, top }: ISliderProps) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const navigate = useNavigate();

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${layoutId}/${movieId}`);
  };
  const indexUp = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const indexDown = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setSliderIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  return (
    <Container style={{ top: `${top}%` }}>
      <Row>
        <Title>{title}</Title>
        <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
          <BoxContainer
            variants={rowVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{ type: "linear", duration: 1 }}
            key={sliderIndex}
            custom={back}
          >
            {movies?.results
              .slice(1)
              .slice(offset * sliderIndex, offset * sliderIndex + offset)
              .map((movie) => (
                <Box
                  layoutId={`${layoutId}/` + movie.id + ""}
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

        <IndexBtn onClick={indexDown} whileHover={{ opacity: 1 }}>
          ⬅︎
        </IndexBtn>
        <IndexBtn onClick={indexUp} whileHover={{ opacity: 1 }}>
          ➡︎
        </IndexBtn>
      </Row>
    </Container>
  );
}

export default Slider;
