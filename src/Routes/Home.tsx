import { useQuery } from "@tanstack/react-query";
import { getMovies, getUpcomming, IGetMovies, IUpcommingMovies } from "../api";
import styled from "styled-components";
import Banner from "../Components/Home/Banner";
import NowPlaying from "../Components/Home/NowPlaying";
import UpComming from "../Components/Home/UpComming";
import MovieDetail from "../Components/Home/MovieDetail";

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
    useQuery<IGetMovies>({
      queryKey: ["movies", "nowPlaying"],
      queryFn: getMovies,
    });
  const { data: upCommingData, isLoading: upcommingDataLoading } =
    useQuery<IUpcommingMovies>({
      queryKey: ["movies", "upcomming"],
      queryFn: getUpcomming,
    });

  return (
    <Container>
      {nowPlayingDataLoading && upcommingDataLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner movies={nowPlayingData} />
          <NowPlaying movies={nowPlayingData} />
          <UpComming movies={upCommingData} />
          <MovieDetail
            nowPlayingMovies={nowPlayingData}
            upCommingMovies={upCommingData}
          />
        </>
      )}
    </Container>
  );
}

export default Home;
