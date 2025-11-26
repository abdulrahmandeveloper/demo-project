import {
  Genres,
  TMDBCommonMediaDataResponse,
} from "@/shared/interfaces/tmdb.interface";

export interface TMDBMovieResponse extends TMDBCommonMediaDataResponse {
  original_title: string;
  release_date: string;
  genres: Genres[];
  title: string;
  video: boolean;
}
