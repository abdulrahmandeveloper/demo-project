import { TMDBMovieResponse } from "@/movie/interfaces/tmdb.interface";
import { TMDBSerieResponse } from "@/series/interfaces/tmdb";

export interface queryResultsResponseData {
  movies: TMDBMovieResponse[];
  serieses: TMDBSerieResponse[];
}
