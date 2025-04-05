export interface IMediaResult {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  title?: string;
  first_air_date?: string;
  name?: string;
}

export interface IMediaItems {
  dates?: {
    maximum: number;
    minimum: number;
  };
  page: number;
  results: IMediaResult[];
  total_pages: number;
  total_results: number;
}

export interface IGetMedia {
  results: IMediaResult[];
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
