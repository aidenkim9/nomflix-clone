import { motion } from "framer-motion";
import styled from "styled-components";

export const Overlay = styled(motion.div)`
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)<{ bgphoto: string }>`
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 1rem;
  width: 65vw;
  height: 80vh;
  position: fixed;
  overflow: hidden;
  overflow-y: scroll;
  top: 7rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  @media screen and (max-width: 1024px) {
    width: 70vw;
    height: 80vh;
  }
  @media screen and (max-width: 768px) {
    width: 90vw;
    height: 90vh;
    top: 4.2rem;
  }
  @media screen and (max-width: 480px) {
    width: 100vw;
    height: 100vh;
    top: 4.2rem;
  }
`;

export const BigX = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme.white.darker};
`;

export const BigTitle = styled.h1`
  font-size: 2.2rem;
  position: absolute;
  top: 47%;
  left: 40%;
  width: 55%;
  font-weight: bold;
  @media screen and (max-width: 1024px) {
    top: 48%;
    font-size: 1.9rem;
  }
  @media screen and (max-width: 768px) {
    top: 51%;
    font-size: 1.7rem;
  }
  @media screen and (max-width: 480px) {
    top: 53%;
    font-size: 1.7rem;
  }
`;

export const BigPoster = styled.div<{ bgphoto: string }>`
  aspect-ratio: 2/3;
  object-fit: cover;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  width: 30%;
  height: 50%;
  position: absolute;
  top: 35%;
  left: 5%;
  @media screen and (max-width: 1024px) {
    top: 45%;
    height: 45%;
  }
  @media screen and (max-width: 768px) {
    top: 50%;
    height: 35%;
  }
  @media screen and (max-width: 480px) {
    height: 50%;
  }
`;

export const BigInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60%;
  left: 40%;
  width: 100%;
  padding-bottom: 10rem;
`;

export const BigOverview = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media screen and (max-width: 1024px) {
    font-size: 0.9rem;
    top: 0;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    top: 0;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
    top: 0;
  }
`;

export const BigTagline = styled.span`
  font-style: italic;
  opacity: 0.9;
  margin-bottom: 1rem;
`;

export const BigHeader = styled.div`
  display: flex;
  margin-bottom: 2%;
  span,
  ul {
    margin-right: 2%;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

export const BigGenres = styled.ul`
  display: flex;
  justify-content: space-between;
  li {
    margin-right: 3%;
  }
`;
