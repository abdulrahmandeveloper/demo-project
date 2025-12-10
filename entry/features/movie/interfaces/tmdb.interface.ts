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

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating: string;
}

export interface TMDBMOvieReviewsResponse {
  author: "futuretv";
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
