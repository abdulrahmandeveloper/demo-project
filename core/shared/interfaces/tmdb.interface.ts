export interface collectionRespose {
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: collectionParts[];
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
}

export interface TMDBCommonMediaDataResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
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

export interface collectionParts extends TMDBCommonMediaDataResponse {
  media_type: string;
}

export interface TMDBTrailerResponse {
  status: string;
  value: [TMDBVideoReferenceResponse];
}
