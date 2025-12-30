export interface TMDBPeopleCredits {
  adult: false;
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: "movie" | "tv";
  original_language: string;
  genre_ids: [number];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: [string];
}

export interface TMDBPeopleData {
  adult: false;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: [TMDBPeopleCredits];
}

export interface TMDBPeopleResponse {
  page: number;
  results: TMDBPeopleData[];
  total_pages?: number;
  total_results?: number;
}

export interface TMDBTrendingPersonResponse {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
}
export interface TMDBPeopleTrendingResponse {
  page: number;
  results: TMDBTrendingPersonResponse[];
}

export interface PersonDataFromTMDBResponse {
  adult: boolean;
  also_known_as: [];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface PeopleSarchQueryParameters {
  gender: number | null;
  department: string;
  nationality: string;
}

export interface PersonImageProfileResponse {
  aspect_ratio: number;
  height: number;
  iso_3166_1: string;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface PersonGalleryResponse {
  id: number;
  profiles: PersonImageProfileResponse[];
}

export interface PersonMovieCreditsResponse {
  cast: PersonMovieAsCastResponse[];
  crew: PersonMovieAsCrewResponse[];
}

export interface PersonMovieAsCastResponse {
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
  character: string;
  credit_id: string;
  order: number;
}

export interface PersonMovieAsCrewResponse {
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
  credit_id: string;
  department: string;
  job: string;
}

export interface PersonTvCreditsResponse {
  cast: PersonTVAsCastResponse[];
  crew: PersonTVAsCrewResponse[];
}

export interface PersonTVAsCastResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  episode_count: number;
}

export interface PersonTVAsCrewResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  episode_count: 1;
  job: string;
}
