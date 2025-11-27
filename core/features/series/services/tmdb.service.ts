import { tmdbApi } from "@/shared/lib/axios/axios";
import {
  TMDBMediaResponse,
  TMDBVideoReferenceResponse,
} from "@/shared/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "../interfaces/tmdb.interface";

export const getSeriesSearchResultsFromTMDB = async (
  query: string
): Promise<TMDBMediaResponse<TMDBSeriesResponse>> => {
  const res = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/tv?query=${query}`
  );
  const data: TMDBMediaResponse<TMDBSeriesResponse> = res.data;
  return data;
};

export const getSeriesRecommendationsFromTMDB = async (
  seriesID: number,
  pages: number
): Promise<TMDBMediaResponse<TMDBSeriesResponse>> => {
  const res = tmdbApi.get(`/movie/${seriesID}/recommendations?page=${pages}`);

  const data: TMDBMediaResponse<TMDBSeriesResponse> = (await res).data;

  return data;
};

export const getSeriesVideosID = async (
  seriesId: number | number[]
): Promise<string | string[]> => {
  if (typeof seriesId === "object") {
    const res = await Promise.allSettled(
      seriesId.map((id) =>
        tmdbApi.get(`/movie/${id}/videos`).then((videos) => videos.data.results)
      )
    );

    const successfulResponses = res.filter(
      (
        result
      ): result is PromiseFulfilledResult<TMDBVideoReferenceResponse[]> =>
        result.status === "fulfilled"
    );

    const trailerKeysArray = successfulResponses
      .map((series) => {
        const trailer = series.value.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );
        return trailer ? trailer.key : null;
      })
      .filter((key): key is string => key !== undefined);

    const trailerKeys = trailerKeysArray.slice(0, 5);

    return trailerKeys;
  } else {
    const res = await tmdbApi.get(`/tv/${seriesId}/videos`);
    console.log("res: ", res.data.results);

    const data: string = res.data.results
      .filter((item) => item.site === "YouTube" && item.type === "Trailer")
      .map((item) => item.key)
      .slice(0, 1)
      .join(" ");
    console.log("getSeriesVideosID data: ", data);

    return data;
  }
};

//
export const getSeriesListFromTmdb = async (page: number, queries?: string) => {
  const res = await tmdbApi.get(`/tv/top_rated?page=${page}?${queries}`);

  const data = res.data;

  return data;
};
