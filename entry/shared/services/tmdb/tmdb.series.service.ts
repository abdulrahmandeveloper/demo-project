import { TMDBSeriesResponse } from "entry/features/series/interfaces/tmdb.interface";
import { tmdbApi } from "entry/shared/lib/axios/axios";
import { TMDBSeriesSearchResponse } from "entry/features/series/interfaces/tmdb.interface";

export const getSeriesByIDFromTMDB = async (
  seriesId: number
): Promise<TMDBSeriesResponse> => {
  const response = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/${seriesId}`
  );

  const data = response.data;

  return data;
};

export const getSeriesDiscoveryFromTMDB = async (
  queries: string,
  page: number = 1
): Promise<TMDBSeriesSearchResponse> => {
  const response = await tmdbApi(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/tv?${queries}&page=${page}
    }`
  );

  const data = response.data;

  return data;
};
