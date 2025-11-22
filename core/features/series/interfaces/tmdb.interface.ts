import { TMDBCommonMediaDataResponse } from "@/shared/interfaces/tmdb.interface";

export interface TMDBSeriesResponse extends TMDBCommonMediaDataResponse {
  origin_country: [string];
  original_name: string;
  first_air_date: string;
  name: string;
}
