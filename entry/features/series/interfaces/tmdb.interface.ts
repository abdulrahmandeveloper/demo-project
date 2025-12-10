import {
  TMDBCommonMediaDataResponse,
  TMDBMediaResponse,
} from "@/shared/interfaces/tmdb/tmdb.interface";
import {
  EpisodeResponse,
  SeasonResponse,
} from "@/shared/interfaces/tmdb/tmdb.series.interface";

export interface ProfileInfoResponse {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface NetworksInfoResponse {
  id: number;
  name: string;
  logo_path: string | null;
}
export interface TMDBSeriesResponse extends TMDBCommonMediaDataResponse {
  media_type: "tv";
  name: string;
  original_name: string;
  first_air_date: string;
  last_air_date: string;
  created_by: ProfileInfoResponse[];
  episode_run_time: number[];
  in_production: boolean;
  languages: string[];
  last_episode_to_air: EpisodeResponse | null;
  next_episode_to_air: EpisodeResponse | null;
  networks: NetworksInfoResponse[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  seasons: SeasonResponse[];
  type: string;
}

export interface TMDBSeriesSearchResponse
  extends TMDBMediaResponse<TMDBSeriesResponse> {
  total_pages: number;
  total_results: number;
}
