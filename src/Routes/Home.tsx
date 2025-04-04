import { useQuery } from "@tanstack/react-query";
import { INowPlaying, ITopRated, IUpcommingMovies } from "../Api/types";
import { getMovies, getTopRated, getUpcomming } from "../Api/api";
import { Loader } from "../Components/Common/Styled";
import styled from "styled-components";
import Banner from "../Components/Home/Banner";
import Slider from "../Components/Home/Slider";
import MovieDetail from "../Components/Home/MovieDetail";

const Container = styled.div`
  overflow-x: hidden;
  height: 200vh;
`;

const Sliders = styled.div`
  position: relative;
  top: -10%;
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
          <Sliders>
            {nowPlayingData && (
              <Slider
                title={"Now Playing"}
                movies={{ results: nowPlayingData.results }}
                layoutId={"now_playing"}
              />
            )}
            {upCommingData && (
              <Slider
                title={"Up comming"}
                movies={{ results: upCommingData.results }}
                layoutId={"up_comming"}
              />
            )}
            {topRatedData && (
              <Slider
                title={"Top Rated"}
                movies={{ results: topRatedData.results }}
                layoutId={"top_rated"}
              />
            )}
          </Sliders>
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
