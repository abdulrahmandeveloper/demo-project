import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { TMDBPeopleData } from "@/routes/peoples/interfaces/people.interface";
import { TMDBSeriesResponse } from "entry/features/series/interfaces/tmdb.interface";

export interface QueryResultsResponseData {
  series?: TMDBSeriesResponse[];
  movies?: TMDBMovieResponse[];
  people?: TMDBPeopleData[];
}
