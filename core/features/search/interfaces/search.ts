import { TMDBMovieResponse } from "@/core/features/movie/interfaces/tmdb.interface";
import { TMDBSerieResponse } from "@/series/interfaces/tmdb";

export interface queryResultsResponseData {
  movies: TMDBMovieResponse[];
  serieses: TMDBSerieResponse[];
}
