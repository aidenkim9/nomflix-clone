import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Loader } from "../Components/Common/SliderStyled";
import { IMediaItems } from "../Api/types";
import { getSearchMedia } from "../Api/api";

import MediaDetail from "../Components/Media/MediaDetail";
import BoxItem from "../Components/Media/BoxItem";

const Container = styled.div`
  margin-top: 10%;
  min-height: 100vh;
`;

export const Movies = styled.div`
  padding: 4rem;
  height: 100%;
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 10px;
  @media screen and (max-width: 768px) {
    padding: 30px;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  }
`;

export const SearchTitle = styled.h1`
  font-size: 1.5rem;
  margin-left: 5%;
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
