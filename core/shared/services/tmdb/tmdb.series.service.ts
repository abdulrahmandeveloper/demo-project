import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";
import { tmdbApi } from "@/shared/lib/axios/axios";

export const getSeriesByIDFromTMDB = async (
  seriesId: number
): Promise<TMDBSeriesResponse> => {
  const res = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/${seriesId}`
  );

  const data = res.data;
  console.log(data);

  return data;
};
