import { tmdbApi } from "entry/shared/lib/axios/axios";
import { TMDBMovieResponse } from "entry/features/movie/interfaces/tmdb.interface";
import {
  TMDBMediaResponse,
  TMDBVideoReferenceResponse,
} from "@/shared/interfaces/tmdb/tmdb.interface";

export const getPopularMoviesPosters = async (
  limitNumber: number
): Promise<TMDBMovieResponse[] | []> => {
  try {
    const response = await tmdbApi.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?page=1`
    );

    if (!response) {
      return [];
    }
    const filteredMovies: TMDBMovieResponse[] = response.data.results.slice(
      0,
      limitNumber
    );

    return filteredMovies;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getMovieSearchResultsFromTMDB = async (
  query: string
): Promise<TMDBMediaResponse<TMDBMovieResponse>> => {
  const response = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${query}`
  );
  const data: TMDBMediaResponse<TMDBMovieResponse> = response.data;

  return data;
};

export const getMovieRecommendationsFromTMDB = async (
  movieID: number,
  pages: number
): Promise<TMDBMediaResponse<TMDBMovieResponse>> => {
  const response = tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieID}/recommendations?page=${pages}`
  );

  const data: TMDBMediaResponse<TMDBMovieResponse> = (await response).data;

  return data;
};

export const getMoviesVideosID = async (
  movieIDs: number | number[]
): Promise<string | string[]> => {
  if (typeof movieIDs === "object") {
    const response = await Promise.allSettled(
      movieIDs.map((id) =>
        tmdbApi.get(`/movie/${id}/videos`).then((videos) => videos.data.results)
      )
    );

    const successfulResponses = response.filter(
      (
        result
      ): result is PromiseFulfilledResult<TMDBVideoReferenceResponse[]> =>
        result.status === "fulfilled"
    );

    const trailerKeysArray = successfulResponses
      .map((movie) => {
        const trailer = movie.value.find(
          (v: TMDBVideoReferenceResponse) =>
            v.site === "YouTube" && v.type === "Trailer"
        );
        return trailer?.key;
      })
      .filter((key): key is string => key !== undefined);

    const trailerKeys: string[] = trailerKeysArray.slice(0, 5);

    return trailerKeys;
  } else {
    const response = await tmdbApi.get(`/movie/${movieIDs}/videos`);

    const data: string = response.data.results
      .filter(
        (item: TMDBVideoReferenceResponse) =>
          item.site === "YouTube" && item.type === "Trailer"
      )
      .map((item: TMDBVideoReferenceResponse) => item.key)
      .slice(0, 1)
      .join(" ");

    return data;
  }
};

//
export const getMoviesListFromTmdb = async (
  page: number = 1
): Promise<TMDBMediaResponse<TMDBMovieResponse>> => {
  const response = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/top_rated?page=${page}&language=en-US`
  );

  const data = response.data;

  return data;
};

export const getMoviesDiscoveryFromTmdb = async (
  queries: string,
  page: number = 1
): Promise<TMDBMediaResponse<TMDBMovieResponse>> => {
  const response = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?page=${page}&${queries}`
  );

  const data = response.data;

  return data;
};
