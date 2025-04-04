export interface IMovieResult {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export interface IGetMovies {
  results: IMovieResult[];
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

export interface ISearchMovies {
  page: number;
  results: IMovieResult[];
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
