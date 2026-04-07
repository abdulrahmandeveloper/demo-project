import {
  TMDBCastResponse,
  TMDBCommonMediaDataResponse,
  TMDBCrewResponse,
  TMDBMediaResponse,
  TMDBPostersData,
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
  origin_country?: string;
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

export interface SeriesAlternativeTitles {
  iso_3166_1: string;
  title: string;
  type: string;
}
export interface SeriesAlternativeResponse {
  id: number;
  results: SeriesAlternativeTitles[];
}

export interface TMDBSeasoEpisodesResponse {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: TMDBCrewResponse[];
  guest_stars: TMDBCastResponse[];
}
export interface TMDBSeasonResponse {
  _id: string;
  air_date: string;
  episodes: TMDBSeasoEpisodesResponse[];
  name: string;
  networks: NetworksInfoResponse[];
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface TMDBEpisodeStillsData {
  aspect_ratio: number;
  height: number;
  iso_639_1: null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface TMDBEpisodeImagesResponse {
  id: number;
  stills: TMDBEpisodeStillsData[];
}

export interface TMDBSeasonImageResponse {
  id: number;
  posters: TMDBPostersData[];
}

export interface TMDBSeasonVideosResponse {
  id: number;
  results: TMDBSeasonEpisodeVideosData[];
}

export interface TMDBSeasonEpisodeVideosData {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: true;
  published_at: string;
  id: string;
}
export interface TMDBEpisodeVideosResponse {
  id: number;
  results: TMDBSeasonEpisodeVideosData[];
}
