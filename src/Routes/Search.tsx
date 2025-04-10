import { useQuery } from "@tanstack/react-query";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
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
const Movies = styled.div`
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
const SearchTitle = styled.h1`
  font-size: 1.5rem;
  margin-left: 5%;
`;
const ErrorMsg = styled.div`
  font-size: 1.5rem;
  margin-left: 7rem;
  margin-top: 3rem;
`;

function Search() {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const {
    data: searchData,
    isError,
    isLoading: searchIsLoading,
  } = useQuery<IMediaItems>({
    queryKey: ["search", keyword],
    queryFn: () => getSearchMedia(type + "", keyword + ""),
  });

  const goMovieDetail = (movieId: number) => {
    navigate(`/search/${type}/${movieId}?keyword=${keyword}`);
  };
  const match = useMatch(`/search/:layoutPrefix/:mediaId`);

  return (
    <Container>
      {searchIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        searchData &&
        type && (
          <>
            <SearchTitle>{`Result of searching with "${keyword?.toUpperCase()}"`}</SearchTitle>
            {searchData.results.length === 0 ? (
              <ErrorMsg>{`No result of ${keyword}`}</ErrorMsg>
            ) : (
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
            )}
            {match ? (
              <MediaDetail
                mediaType={match.params.layoutPrefix + ""}
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

export default Search;
