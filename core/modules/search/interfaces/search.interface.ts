import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";

export interface QueryResultsResponseData {
  series?: TMDBSeriesResponse[];
  movies?: TMDBMovieResponse[];
}
