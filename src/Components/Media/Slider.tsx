import { AnimatePresence } from "framer-motion";
import { Title, Row, BoxContainer, IndexBtn } from "../Common/SliderStyled";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMediaItems } from "../../Api/types";
import styled from "styled-components";
import { rowVariants } from "../../motionVariants";
import BoxItem from "./BoxItem";
import { useWindowSize } from "../../Hooks/useWindowSize";

const Container = styled.div`
  position: relative;
  margin-bottom: 5%;
`;

interface ISliderProps {
  mediaType: string;
  title: string;
  mediaItem: IMediaItems;
  layoutIdPrefix: string;
}

function Slider({ mediaType, title, mediaItem, layoutIdPrefix }: ISliderProps) {
  console.log(mediaItem.results);
  const { width } = useWindowSize();
  const offset =
    width >= 1440
      ? 6
      : width >= 1024
      ? 5
      : width >= 768
      ? 4
      : width >= 600
      ? 3
      : width >= 480
      ? 2
      : 1;
  const [sliderIndex, setSliderIndex] = useState(0);
  const leaving = useRef(false);
  const [back, setBack] = useState(false);
  const navigate = useNavigate();

  const totalMideaItem = mediaItem.results.length - 1;

  const toggleLeaving = () => {
    leaving.current = !leaving.current;
  };
  const indexUp = () => {
    if (leaving.current) return;
    toggleLeaving();
    setBack(false);

    const maxIndex = Math.floor(totalMideaItem / offset) - 1;
    setSliderIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const indexDown = () => {
    if (leaving.current) return;
    toggleLeaving();
    setBack(true);
    const maxIndex = Math.floor(totalMideaItem / offset) - 1;
    setSliderIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const onBoxClicked = useCallback(
    (mediaId?: number) => {
      navigate(`/${mediaType}/${layoutIdPrefix}/${mediaId}`);
    },
    [navigate, layoutIdPrefix]
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
            columns={offset}
          >
            {mediaItem?.results
              .slice(offset * sliderIndex, offset * sliderIndex + offset)
              .map((item) => (
                <BoxItem
                  key={item.id}
                  title={item.title || item.name || ""}
                  backdrop={item.backdrop_path}
                  poster={item.poster_path}
                  layoutIdPrefix={layoutIdPrefix}
                  mediaId={item.id}
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
