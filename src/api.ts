const API_KEY = "30f13121bc59f1b8f60a03f4d5c57300";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovieResult {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export interface INowPlaying {
  dates: {
    maximum: number;
    minimum: number;
  };
  page: number;
  results: IMovieResult[];
  total_pages: number;
  total_results: number;
}

export interface IUpcommingMovies {
  dates: {
    maximum: number;
    minimum: number;
  };
  page: number;
  results: IMovieResult[];
  total_pages: number;
  total_results: number;
}

export interface ITopRated {
  page: number;
  results: IMovieResult[];
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

interface IGenres {
  id: number;
  name: string;
}

export interface IMovieDetail {
  genres: IGenres[];
  id: number;
  overview: string;
  popularity: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  title: string;
  vote_average: number;
  tagline: string;
  runtime: string;
}

export async function getMovies() {
  const json = await (
    await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getUpcomming() {
  const json = await (
    await fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getTopRated() {
  const json = await (
    await fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getMovieDetail(movieId: string) {
  const json = await (
    await fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`)
  ).json();
  return json;
}

export async function getSearchMovies(keyword: string) {
  const json = await (
    await fetch(`${BASE_PATH}/search/movie?query=${keyword}&api_key=${API_KEY}`)
  ).json();
  return json;
}
