import { useQuery } from "@tanstack/react-query";
import { IMediaItems } from "../Api/types";
import { getMovies, getTopRated, getUpcomming } from "../Api/api";
import { Loader } from "../Components/Common/SliderStyled";
import styled from "styled-components";
import Banner from "../Components/Home/Banner";
import Slider from "../Components/Home/Slider";
import MovieDetail from "../Components/Home/MovieDetail";

const Container = styled.div`
  overflow-x: hidden;
  height: 200vh;
  scroll-behavior: smooth;
`;

const Sliders = styled.div`
  position: relative;
  top: -10%;
`;

function Home() {
  const { data: nowPlayingData, isLoading: nowPlayingDataLoading } =
    useQuery<IMediaItems>({
      queryKey: ["movies", "nowPlaying"],
      queryFn: getMovies,
    });
  const { data: upCommingData, isLoading: upcommingDataLoading } =
    useQuery<IMediaItems>({
      queryKey: ["movies", "upcomming"],
      queryFn: getUpcomming,
    });
  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IMediaItems>({
      queryKey: ["movies", "topRated"],
      queryFn: getTopRated,
    });

  return (
    <Container>
      {nowPlayingDataLoading || upcommingDataLoading || topRatedLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        nowPlayingData && (
          <>
            <Banner mediatype={"movies"} mediaItem={nowPlayingData} />
            <Sliders>
              {nowPlayingData && (
                <Slider
                  mediaType={"movies"}
                  title={"Now Playing"}
                  mediaItem={nowPlayingData}
                  layoutId={"now_playing"}
                />
              )}
              {upCommingData && (
                <Slider
                  mediaType={"movies"}
                  title={"Up comming"}
                  mediaItem={upCommingData}
                  layoutId={"up_comming"}
                />
              )}
              {topRatedData && (
                <Slider
                  mediaType={"movies"}
                  title={"Top Rated"}
                  mediaItem={topRatedData}
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
        )
      )}
    </Container>
  );
}

export default Home;
