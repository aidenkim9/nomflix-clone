import { AnimatePresence } from "framer-motion";

import { Title, Row, BoxContainer, IndexBtn } from "../Common/Styled";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IGetMovies } from "../../Api/types";
import styled from "styled-components";
import { rowVariants } from "../../motionVariants";
import BoxItem from "./BoxItem";

const Container = styled.div`
  position: relative;
  margin-bottom: 5%;
`;

const offset = 6;

interface ISliderProps {
  title: string;
  movies: IGetMovies;
  layoutId: string;
}

function Slider({ title, movies, layoutId }: ISliderProps) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const leaving = useRef(false);
  const [back, setBack] = useState(false);
  const navigate = useNavigate();
  console.log(movies);
  const toggleLeaving = () => {
    leaving.current = !leaving.current;
  };
  const indexUp = () => {
    if (movies) {
      if (leaving.current) return;
      toggleLeaving();
      setBack(false);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const indexDown = () => {
    if (movies) {
      if (leaving.current) return;
      toggleLeaving();
      setBack(true);
      const totalMovies = movies.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setSliderIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const onBoxClicked = useCallback(
    (movieId: number) => {
      navigate(`/movies/${layoutId}/${movieId}`);
    },
    [indexUp]
  );

  return (
    <Container>
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
              .slice(
                1 + offset * sliderIndex,
                1 + offset * sliderIndex + offset
              )
              .map((movie) => (
                <BoxItem
                  key={movie.id}
                  title={movie.title}
                  backdrop={movie.backdrop_path}
                  poster={movie.poster_path}
                  layoutId={layoutId}
                  movieId={movie.id}
                  onBoxClicked={onBoxClicked}
                />
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
