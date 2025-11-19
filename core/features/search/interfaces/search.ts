import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { TMDBSerieResponse } from "@/features/series/interfaces/tmdb";

export interface queryResultsResponseData {
  movies: TMDBMovieResponse[];
  serieses: TMDBSerieResponse[];
}
