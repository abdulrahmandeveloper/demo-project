export interface CollectionRespose {
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: CollectionParts[];
}

export interface Genres {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: [Genres];
}

export interface TMDBMediaResponse<T> {
  page: number;
  results: [T];
  total_pages: number;
  total_results: number;
}

export interface TMDBCommonMediaDataResponse {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genres?: any;
  genre_ids: [number];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  media_type?: string;
}

export interface TMDBVideoReferenceResponse {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: true;
  published_at: string;
  id: string;
}

export interface CollectionParts extends TMDBCommonMediaDataResponse {
  title: string;
  media_type: string;
}

export interface TMDBTrailerResponse {
  status: string;
  value: [TMDBVideoReferenceResponse];
}
