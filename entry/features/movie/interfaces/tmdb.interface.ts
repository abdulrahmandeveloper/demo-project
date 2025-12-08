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
