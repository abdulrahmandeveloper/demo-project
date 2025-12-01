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

export interface TMDBCompanyInfo {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TMDBCompanyInfo {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface TMDBCountryInfo {
  iso_3166_1: string;
  name: string;
}

export interface TMDBSpokenLanguagesResponse {
  english_name: string;
  iso_639_1: string;
  name: string;
}
export interface TMDBCommonMediaDataResponse {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genres: Genres[];
  homepage: string;
  original_language: string;
  origin_country: string[];
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TMDBCompanyInfo[];
  production_countries: TMDBCountryInfo[];
  spoken_languages: TMDBSpokenLanguagesResponse[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  media_type?: "movie" | "tv";
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
}

export interface TMDBTrailerResponse {
  status: string;
  value: [TMDBVideoReferenceResponse];
}

export interface EpisodeResponse {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  season_number: number;
  runtime: number;
}

export interface SeasonResponse {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface TMDBCommonContetResponse {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genres: Genres[];
  homepage: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TMDBCompanyInfo[];
  production_countries: TMDBCountryInfo[];
  spoken_languages: TMDBSpokenLanguagesResponse[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;

  // Title/name properties (differently named in each)
  title?: string; // For movies
  name?: string; // For TV series
  original_title?: string; // For movies
  original_name?: string; // For TV series

  // Release/air date properties
  release_date?: string; // For movies
  first_air_date?: string; // For TV series

  // Type discriminator (optional but useful)
  media_type?: "movie" | "tv";
}

export interface TMDBCreditResponse {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  departmen: string;
  order: number;
}

export interface TMDBCreditMediaResponse {
  id: number;
  cast: TMDBCastResponse;
}

export interface TMDBCastResponse {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: 7;
  character: string;
  credit_id: string;
  order: number;
}
