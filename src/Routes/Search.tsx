import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovies, ISearchMovies } from "../api";

const Wrapper = styled.div`
  height: 200vh;
`;
const Movies = styled.div`
  padding: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Movie = styled.li`
  font-size: 20px;
  margin-bottom: 20px;
`;

const SearchTitle = styled.h1`
  font-size: 40px;
  text-align: center;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<ISearchMovies>({
    queryKey: ["search", keyword],
    queryFn: () => getSearchMovies(keyword + ""),
  });

  console.log(keyword);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Movies>
            <SearchTitle>{data ? `Search: ${keyword}` : null}</SearchTitle>
            <ul>
              {data?.results.map((movie) => (
                <Movie key={movie.id}>{movie.title}</Movie>
              ))}
            </ul>
          </Movies>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
