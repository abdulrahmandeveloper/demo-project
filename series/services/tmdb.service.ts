import { tmdbApi } from "@/shared/lib/axios/axios";

export const getSeriesSearchResultsFromTMDB = async (query) => {
  const res = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/tv?query=${query}`
  );
  const data = res.data;
  return data;
};

export const getSeriesRecommendationsFromTMDB = async (
  seriesID: number,
  pages: number
) => {
  const res = tmdbApi.get(`/movie/${seriesID}/recommendations?page=${pages}`);

  const data = (await res).data;
  return data;
};

export const getSeriesVideosID = async (seriesId: number[]) => {
  const res = await Promise.allSettled(
    seriesId.map((id) =>
      tmdbApi.get(`/movie/${id}/videos`).then((videos) => videos.data.results)
    )
  );

  const trailerKeysArray = res.map((movie) => {
    const trailer = movie.value.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );
    return trailer ? trailer.key : null;
  });

  const trailerKeys = trailerKeysArray.slice(0, 5);

  return trailerKeys;
};

//
export const getSeriesListFromTmdb = async () => {
  const res = await tmdbApi.get("/tv/top_rated");

  const data = res.data;

  return data;
};
