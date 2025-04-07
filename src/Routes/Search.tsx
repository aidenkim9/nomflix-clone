import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Loader } from "../Components/Common/SliderStyled";
import { SearchTitle, Movies } from "../Components/Common/SearchStyled";
import { IMediaItems } from "../Api/types";
import { getSearchMedia } from "../Api/api";

import MediaDetail from "../Components/Media/MediaDetail";
import BoxItem from "../Components/Media/BoxItem";

const Container = styled.div`
  height: 100vh;
  margin-top: 10%;
`;

function Search() {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: searchData, isLoading: searchIsLoading } =
    useQuery<IMediaItems>({
      queryKey: ["search", keyword],
      queryFn: () => getSearchMedia(type + "", keyword + ""),
    });
  console.log(searchData?.results.length);
  const goMovieDetail = (movieId: number) => {
    navigate(`/search/${type}/${movieId}?keyword=${keyword}`);
  };

  return (
    <Container>
      {searchIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        searchData &&
        type && (
          <>
            <SearchTitle>{`Result of searching with "${keyword}"`}</SearchTitle>
            <Movies>
              {searchData.results.map((movie) =>
                movie.backdrop_path ? (
                  <BoxItem
                    layoutIdPrefix={type}
                    mediaId={movie.id}
                    title={movie.title || ""}
                    backdrop={movie.backdrop_path}
                    poster={movie.poster_path}
                    onBoxClicked={goMovieDetail}
                    key={movie.id}
                  />
                ) : null
              )}
            </Movies>
            <MediaDetail
              mediaType={type}
              layoutIdPrefix={type}
              mediaItems={searchData}
            />
          </>
        )
      )}
    </Container>
  );
}

export default Search;
