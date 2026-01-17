import {
  CollectionRespose,
  TMDBCommonMediaDataResponse,
} from "@/shared/interfaces/tmdb/tmdb.interface";

export interface TMDBMovieResponse extends TMDBCommonMediaDataResponse {
  media_type: "movie";
  title: string;
  original_title: string;
  release_date: string;
  budget: number;
  revenue: number;
  runtime: number;
  belongs_to_collection: CollectionRespose | null;
  imdb_id: string;
  video: boolean;
}

export interface TMDBMovieCastData {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface TMDBMovieCrewData {
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
export interface TMDBMovieCreditResponse {
  id: number;
  cast: TMDBMovieCastData[];
  crew: TMDBMovieCrewData[];
}

export interface TMDBMovieReleaseTypes {
  1: "Premiere";
  2: "Theatrical (limited)";
  3: "Theatrical	";
  4: "Digital";
  5: "Physical";
  6: "TV";
}
export interface TMDBMovieCountryReleaseDatesResponse {
  certification: string;
  descriptors: [];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: TMDBMovieReleaseTypes;
}
export interface TMDBMovieReleaseDatesResultsResponse {
  iso_3166_1: string;
  release_dates: TMDBMovieCountryReleaseDatesResponse[];
}
export interface TMDBMovieReleaseDatesResponse {
  id: 550;
  results: TMDBMovieReleaseDatesResultsResponse[];
}

export interface TMDBMovieProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}
export interface TMDBMovieCountryWatchProvidersResponse {
  link: string;
  free?: TMDBMovieProvider[];
  flatrate?: TMDBMovieProvider[];
  rent?: TMDBMovieProvider[];
  buy?: TMDBMovieProvider[];
  ads?: TMDBMovieProvider[];
}

export interface TMDBMovieWatchProvidersResponse {
  id: number;
  results: Record<string, TMDBMovieCountryWatchProvidersResponse>;
}

export interface TMDBMovieExternalIdsResponse {
  id: number;
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface MovieRtingsData {
  country: string;
  rating: string;
}
