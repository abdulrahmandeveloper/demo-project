import {
  TMDBCommonMediaDataResponse,
  TMDBMediaResponse,
} from "entry/shared/interfaces/tmdb.interface";

export interface TMDBSeriesResponse extends TMDBCommonMediaDataResponse {
  origin_country: [string];
  original_name: string;
  first_air_date: string;
  name: string;
}

export interface TMDBSeriesSearchResponse
  extends TMDBMediaResponse<TMDBSeriesResponse> {
  total_pages: number;
  total_results: number;
}
