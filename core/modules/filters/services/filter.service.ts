import { TMDBSeriesSearchResponse } from "@/features/series/interfaces/tmdb.interface";
import { tmdbApi } from "@/shared/lib/axios/axios";

export const getSeriesDiscoveryFromTMDB = async (
  queries: string,
  page: number = 1
): Promise<TMDBSeriesSearchResponse> => {
  const res = await tmdbApi(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/tv?${queries}&page=${page}
    }`
  );

  const data = res.data;
  console.log(data);

  return data;
};
