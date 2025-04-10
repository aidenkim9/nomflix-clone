import { useQuery } from "@tanstack/react-query";
import { IMediaItems } from "../Api/types";
import {
  getOnAirTv,
  getAringToDayTv,
  getTopRatedTv,
  getTrendingTv,
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
  top: -11rem;
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
  const { data: trendingData, isLoading: trendingLoading } =
    useQuery<IMediaItems>({
      queryKey: ["tv", "trending"],
      queryFn: getTrendingTv,
    });
  const match = useMatch(`/tv/:layoutPrefix/:mediaId`);

  return (
    <Container>
      {onAirLoading ||
      aringToDayLoading ||
      topRatedLoading ||
      trendingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        onAirData &&
        aringToDayData &&
        topRatedData &&
        trendingData && (
          <>
            <Banner mediatype={"tv"} mediaItem={onAirData} />
            <Sliders>
              <Slider
                mediaType={"tv"}
                title={"On The Air"}
                mediaItem={onAirData}
                layoutIdPrefix={"on_the_air"}
              />

              <Slider
                mediaType={"tv"}
                title={"Aring Today"}
                mediaItem={aringToDayData}
                layoutIdPrefix={"airing_today"}
              />
              <Slider
                mediaType={"tv"}
                title={"Top Rated"}
                mediaItem={topRatedData}
                layoutIdPrefix={"top_rated"}
              />
              <Slider
                mediaType={"tv"}
                title={"Trending"}
                mediaItem={trendingData}
                layoutIdPrefix={"trending"}
              />
            </Sliders>
            {match ? (
              <MediaDetail
                mediaType={"tv"}
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

export default Tv;
