interface getMovieReccomendationsPostersResponse {
  page: 1;
  results: [
    {
      adult: boolean;
      backdrop_path: string;
      genre_ids: [number];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: 8567.865;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }
  ];
}

export interface TMDBMovieResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
