import {
  Genres,
  TMDBCommonMediaDataResponse,
} from "entry/shared/interfaces/tmdb.interface";

export interface TMDBMovieResponse extends TMDBCommonMediaDataResponse {
  original_title: string;
  release_date: string;
  genres: Genres[];
  title: string;
  video: boolean;
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
  departmen:string;
  order: number;
}


export interface TMDBCreditMediaResponse {
  id:number;
  cast:TMDBCastResponse;
  crew:
}