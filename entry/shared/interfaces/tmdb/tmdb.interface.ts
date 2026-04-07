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
  genre_ids: number[];
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
  crew: TMDBCrewResponse;
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

export interface TMDBCrewResponse {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}
export interface Keywords {
  id: 4812;
  name: "plan";
}

export interface KeywordsResponse {
  id: number;
  keywords: Keywords[];
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating: string;
}

export interface TMDBReviewsResponse {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface TMDBContentRating {
  descriptors: any[];
  iso_3166_1: string;
  rating: string;
}
export interface TMDBContentRatingResponse {
  results: TMDBContentRating[];
  id: number;
}

export interface TMDBExternalIdsResponse {
  id: number;
  imdb_id: string;
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface TMDBBackdropsData {
  aspect_ratio: number;
  height: number;
  iso_3166_1?: string;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface TMDBLogosData {
  aspect_ratio: number;
  height: number;
  iso_3166_1?: string;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface TMDBPostersData {
  aspect_ratio: number;
  height: number;
  iso_3166_1?: string;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface TMDBImagesResponse {
  backdrops: TMDBBackdropsData[];
  id: number;
  logos: TMDBLogosData[];
  posters: TMDBPostersData[];
}
