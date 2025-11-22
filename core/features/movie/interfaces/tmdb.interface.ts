import { TMDBCommonMediaDataResponse } from "@/shared/interfaces/tmdb.interface";

export interface TMDBMovieResponse extends TMDBCommonMediaDataResponse {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}
