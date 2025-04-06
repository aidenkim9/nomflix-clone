import styled from "styled-components";
import { getBgPath } from "../../utils";
import { IMediaItems } from "../../Api/types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Container = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2vw;
  background-position: center center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;

  @media screen and (max-width: 768px) {
    padding: 3vw;
  }
`;
const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  width: 50%;
  @media screen and (max-width: 768px) {
    font-size: 3.5rem;
  }
`;
const Overview = styled.p`
  font-size: 1.3rem;
  width: 45%;
  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
    width: 60%;
  }
`;

const Options = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled(motion.div)`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  font-size: 1.1rem;
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
  @media screen and (max-width: 768px) {
    height: 2.5rem;
    font-size: 0.9rem;
  }
`;

interface IBannerProps {
  mediatype: string;
  mediaItem: IMediaItems;
}

function Banner({ mediatype, mediaItem }: IBannerProps) {
  const navigate = useNavigate();
  const showDetail = (movieId: number) => {
    navigate(`/${mediatype}/banner/${movieId}`);
  };
  return (
    <Container bgphoto={getBgPath(mediaItem.results[0].backdrop_path || "")}>
      <Title>{mediaItem.results[0].title || mediaItem.results[0].name}</Title>
      <Overview>{mediaItem?.results[0].overview}</Overview>
      <Options>
        <Button>Play</Button>
        <Button
          layoutId={`banner/${mediaItem.results[0].id}`}
          onClick={() => showDetail(mediaItem.results[0].id || 0)}
        >
          <span>Detail</span>
        </Button>
      </Options>
    </Container>
  );
}

export default Banner;
