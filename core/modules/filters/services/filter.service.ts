import { tmdbApi } from "@/shared/lib/axios/axios";

export const getSeriesDiscoveryFromTMDB = async (
  queries: string,
  page: number
) => {
  const res = await tmdbApi(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/tv?${queries}&page=${page}`
  );

  const data = res.data;

  return data;
};
