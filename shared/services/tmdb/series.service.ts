import { tmdbApi } from "@/shared/lib/axios/axios";

export const getSeriesSearchResultsFromTMDB = async (query) => {
  const res = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/tv?query=${query}`
  );
  const data = res.data;
  return data;
};
