import styled from "styled-components";
import { getBgPath } from "../../utils";
import { INowPlaying } from "../../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Container = styled.div<{ bgphoto: string }>`
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
  width: 45%;
`;

const Options = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled(motion.div)`
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

interface IBannerProps {
  movies?: INowPlaying;
}

function Banner({ movies }: IBannerProps) {
  const navigate = useNavigate();
  const showDetail = (movieId: number) => {
    navigate(`/movies/banner/${movieId}`);
  };
  return (
    <Container bgphoto={getBgPath(movies?.results[0].backdrop_path || "")}>
      <Title>{movies?.results[0].title}</Title>
      <Overview>{movies?.results[0].overview}</Overview>
      <Options>
        <Button>Play</Button>
        <Button
          layoutId={`banner/${movies?.results[0].id}`}
          onClick={() => showDetail(movies?.results[0].id || 0)}
        >
          <span>Detail</span>
        </Button>
      </Options>
    </Container>
  );
}

export default Banner;
