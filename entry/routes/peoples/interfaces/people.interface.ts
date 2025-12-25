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

export interface LatestPersonFromTMDBResponse {
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
