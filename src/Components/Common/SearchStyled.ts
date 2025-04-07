import styled from "styled-components";
import { motion } from "framer-motion";

export const Movies = styled.div`
  padding: 50px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

export const Movie = styled(motion.div)<{ bgphoto: string }>`
  font-size: 20px;
  margin-bottom: 20px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-position: center center;
  background-size: cover;
  background-image: url(${(props) => props.bgphoto});
  cursor: pointer;
`;

export const MovieTitle = styled.h1`
  font-size: 14px;
  margin-bottom: 10px;
`;

export const SearchTitle = styled.h1`
  font-size: 20px;
  margin-left: 5%;
`;

export const BigMovie = styled(motion.div)`
  overflow: hidden;
  overflow-y: scroll;
  width: 60%;
  height: 80%;
  background-color: ${(props) => props.theme.black.lighter};
  position: fixed;
  top: 14%;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
`;

export const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
`;

export const BigCover = styled.div`
  width: 100%;
  height: 55%;
  background-size: cover;
  background-position: center center;
`;

export const BigTitle = styled.h1`
  font-size: 30px;
  position: absolute;
  top: 45%;
  left: 40%;
  width: 55%;
  font-weight: bold;
`;

export const BigOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  padding-bottom: 20px;
`;

export const BigTagline = styled.span`
  font-style: italic;
  opacity: 0.9;
`;

export const BigPoster = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 30%;
  height: 50%;
  position: absolute;
  top: 35%;
  left: 5%;
`;

export const BigInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60%;
  left: 40%;
  width: 100%;
`;

export const BigHeader = styled.div`
  display: flex;
  margin-bottom: 2%;
  span,
  ul {
    margin-right: 2%;
  }
`;

export const BigGenres = styled.ul`
  display: flex;
  li {
    margin-right: 3%;
  }
`;
