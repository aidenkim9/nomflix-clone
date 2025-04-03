import { useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getTopRated,
  getUpcomming,
  INowPlaying,
  ITopRated,
  IUpcommingMovies,
} from "../api";
import { Loader } from "../Components/Common/Styled";
import styled from "styled-components";
import Banner from "../Components/Home/Banner";
import Slider from "../Components/Slider";
import MovieDetail from "../Components/Home/MovieDetail";

const Container = styled.div`
  overflow-x: hidden;
  height: 200vh;
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
          {nowPlayingData && (
            <Slider
              title={"Now Playing"}
              movies={nowPlayingData}
              layoutId={"now_playing"}
              top={-12}
            />
          )}
          {upCommingData && (
            <Slider
              title={"Up comming"}
              movies={upCommingData}
              layoutId={"up_comming"}
              top={-9}
            />
          )}
          {topRatedData && (
            <Slider
              title={"Top Rated"}
              movies={topRatedData}
              layoutId={"top_rated"}
              top={-7}
            />
          )}
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
