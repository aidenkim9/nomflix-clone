import { useQuery } from "@tanstack/react-query";
import { IMediaItems } from "../Api/types";
import {
  getMovies,
  getTopRated,
  getTrendingMovie,
  getUpcomming,
} from "../Api/api";
import { Loader } from "../Components/Common/SliderStyled";
import styled from "styled-components";
import Banner from "../Components/Media/Banner";
import Slider from "../Components/Media/Slider";
import MediaDetail from "../Components/Media/MediaDetail";
import { useMatch } from "react-router-dom";

const Container = styled.div`
  overflow: hidden;
`;

const Sliders = styled.div`
  position: relative;
  top: -12rem;
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
  const { data: trendingData, isLoading: trendingLoading } =
    useQuery<IMediaItems>({
      queryKey: ["movies", "trending"],
      queryFn: getTrendingMovie,
    });

  const match = useMatch(`/movie/:layoutPrefix/:mediaId`);
  return (
    <Container>
      {nowPlayingDataLoading || upcommingDataLoading || topRatedLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        nowPlayingData &&
        upCommingData &&
        topRatedData &&
        trendingData && (
          <>
            <Banner mediatype={"movie"} mediaItem={nowPlayingData} />
            <Sliders>
              <Slider
                mediaType={"movie"}
                title={"Now Playing"}
                mediaItem={nowPlayingData}
                layoutIdPrefix={"now_playing"}
              />
              <Slider
                mediaType={"movie"}
                title={"Up comming"}
                mediaItem={upCommingData}
                layoutIdPrefix={"up_comming"}
              />
              <Slider
                mediaType={"movie"}
                title={"Top Rated"}
                mediaItem={topRatedData}
                layoutIdPrefix={"top_rated"}
              />
              <Slider
                mediaType={"movie"}
                title={"Trending"}
                mediaItem={trendingData}
                layoutIdPrefix={"trending"}
              />
            </Sliders>
            {match ? (
              <MediaDetail
                mediaType={"movie"}
                layoutIdPrefix={match.params.layoutPrefix + ""}
                mediaId={match.params.mediaId + ""}
              />
            ) : null}
          </>
        )
      )}
    </Container>
  );
}

export default Home;
