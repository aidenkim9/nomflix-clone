import { useQuery } from "@tanstack/react-query";
import { IMediaItems } from "../Api/types";
import { getOnAirTv, getAringToDayTv, getTopRatedTv } from "../Api/api";
import { Loader } from "../Components/Common/SliderStyled";
import styled from "styled-components";
import Banner from "../Components/Home/Banner";
import Slider from "../Components/Home/Slider";

const Container = styled.div`
  overflow-x: hidden;
  height: 200vh;
  scroll-behavior: smooth;
`;

const Sliders = styled.div`
  position: relative;
  top: -10%;
`;

function Tv() {
  const { data: onAirData, isLoading: onAirLoading } = useQuery<IMediaItems>({
    queryKey: ["tv", "onAir"],
    queryFn: getOnAirTv,
  });
  const { data: aringToDayData, isLoading: aringToDayLoading } =
    useQuery<IMediaItems>({
      queryKey: ["tv", "airing"],
      queryFn: getAringToDayTv,
    });
  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IMediaItems>({
      queryKey: ["tv", "topRated"],
      queryFn: getTopRatedTv,
    });

  return (
    <Container>
      {onAirLoading || aringToDayLoading || topRatedLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        onAirData && (
          <>
            <Banner mediatype={"tv_show"} mediaItem={onAirData} />
            <Sliders>
              {onAirData && (
                <Slider
                  mediaType={"tv_shows"}
                  title={"On The Air"}
                  mediaItem={onAirData}
                  layoutId={"on_the_air"}
                />
              )}
              {aringToDayData && (
                <Slider
                  mediaType={"tv_shows"}
                  title={"Aring Today"}
                  mediaItem={aringToDayData}
                  layoutId={"arsing_today"}
                />
              )}
              {topRatedData && (
                <Slider
                  mediaType={"tv_shows"}
                  title={"Top Rated"}
                  mediaItem={topRatedData}
                  layoutId={"top_rated"}
                />
              )}
            </Sliders>

            {/* <MovieDetail
            nowPlayingMovies={onAirData}
            upCommingMovies={upCommingData}
            topRatedMovies={topRatedData}
          /> */}
          </>
        )
      )}
    </Container>
  );
}

export default Tv;
