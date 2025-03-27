const API_KEY = "30f13121bc59f1b8f60a03f4d5c57300";
const BASE_PATH = "https://api.themoviedb.org/3";
const KR = "&language=ko-KR";

interface IMovieResult {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export interface IGetMovies {
  dates: {
    maximum: number;
    minimum: number;
  };
  page: number;
  results: IMovieResult[];
  total_pages: number;
  total_results: number;
}

interface IUpcommingResult {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export interface IUpcommingMovies {
  dates: {
    maximum: number;
    minimum: number;
  };
  page: number;
  results: IUpcommingResult[];
  total_pages: number;
  total_results: number;
}

interface ISearchResult {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export interface ISearchMovies {
  page: number;
  results: ISearchResult[];
  total_pages: number;
  total_results: number;
}

export async function getMovies() {
  const json = await (
    await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getUpcomming() {
  const json = await (
    await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
    )
  ).json();
  return json;
}

export async function getSearchMovies(keyword: string) {
  const json = await (
    await fetch(`${BASE_PATH}/search/movie?query=${keyword}&api_key=${API_KEY}`)
  ).json();
  return json;
}
