import { tmdbApi } from "@/shared/lib/axios/axios";
import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import {
  TMDBMediaResponse,
  TMDBVideoReferenceResponse,
} from "@/shared/interfaces/tmdb.interface";

export const getPopularMoviesPosters = async (
  limitNumber: number
): Promise<TMDBMovieResponse[] | []> => {
  try {
    const res = await tmdbApi.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?page=1`
    );

    if (!res) {
      return [];
    }
    const filteredMovies: TMDBMovieResponse[] = res.data.results.slice(
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
  const res = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${query}`
  );
  const data: TMDBMediaResponse<TMDBMovieResponse> = res.data;

  return data;
};

export const getMovieRecommendationsFromTMDB = async (
  movieID: number,
  pages: number
): Promise<TMDBMediaResponse<TMDBMovieResponse>> => {
  const res = tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieID}/recommendations?page=${pages}`
  );

  const data: TMDBMediaResponse<TMDBMovieResponse> = (await res).data;

  return data;
};

export const getMoviesVideosID = async (
  movieIDs: number[]
): Promise<string[]> => {
  const res = await Promise.allSettled(
    movieIDs.map((id) =>
      tmdbApi.get(`/movie/${id}/videos`).then((videos) => videos.data.results)
    )
  );

  const successfulResponses = res.filter(
    (result): result is PromiseFulfilledResult<TMDBVideoReferenceResponse[]> =>
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
};

//
export const getMoviesListFromTmdb = async (
  page: number = 1
): Promise<TMDBMediaResponse<TMDBMovieResponse>> => {
  const res = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/top_rated?page=${page}&language=en-US`
  );

  const data = res.data;

  return data;
};

export const getMoviesDiscoveryFromTmdb = async (
  queries: string,
  page: number = 1
): Promise<TMDBMediaResponse<TMDBMovieResponse>> => {
  const res = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?page=${page}&${queries}`
  );

  const data = res.data;

  return data;
};
