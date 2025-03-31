import { useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getTopRated,
  getUpcomming,
  INowPlaying,
  ITopRated,
  IUpcommingMovies,
} from "../api";
import styled from "styled-components";
import Banner from "../Components/Home/Banner";
import NowPlaying from "../Components/Home/NowPlaying";
import UpComming from "../Components/Home/UpComming";
import MovieDetail from "../Components/Home/MovieDetail";
import TopRated from "../Components/Home/TopRated";

const Container = styled.div`
  overflow-x: hidden;
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const { data: nowPlayingData, isLoading: nowPlayingDataLoading } =
    useQuery<INowPlaying>({
      queryKey: ["movies", "nowPlaying"],
      queryFn: getMovies,
    });
  const { data: upCommingData, isLoading: upcommingDataLoading } =
    useQuery<IUpcommingMovies>({
      queryKey: ["movies", "upcomming"],
      queryFn: getUpcomming,
    });
  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<ITopRated>({
      queryKey: ["movies", "topRated"],
      queryFn: getTopRated,
    });

  return (
    <Container>
      {nowPlayingDataLoading || upcommingDataLoading || topRatedLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner movies={nowPlayingData} />
          <NowPlaying movies={nowPlayingData} />
          <UpComming movies={upCommingData} />
          <TopRated movies={topRatedData} />
          <MovieDetail
            nowPlayingMovies={nowPlayingData}
            upCommingMovies={upCommingData}
            topRatedMovies={topRatedData}
          />
        </>
      )}
    </Container>
  );
}

export default Home;
