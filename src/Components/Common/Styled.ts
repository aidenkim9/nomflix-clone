import styled from "styled-components";
import { motion } from "framer-motion";

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled(motion.div)`
  font-size: 25px;
  padding: 10px 10px 10px 20px;
  font-weight: bold;
`;

export const Row = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 240px;
`;

export const BoxContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
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

export const IndexBtn = styled(motion.div)`
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

export const Info = styled(motion.div)`
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
