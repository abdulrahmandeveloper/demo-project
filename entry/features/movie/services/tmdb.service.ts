import { tmdbApi } from "entry/shared/lib/axios/axios";
import {
  MovieRtingsData,
  TMDBMovieCreditResponse,
  TMDBMovieExternalIdsResponse,
  TMDBMovieReleaseDatesResponse,
  TMDBMovieResponse,
  TMDBMovieWatchProvidersResponse,
} from "entry/features/movie/interfaces/tmdb.interface";
import {
  TMDBImagesResponse,
  TMDBMediaResponse,
  TMDBReviewsResponse,
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
  query: string,
  page?: number
): Promise<TMDBMediaResponse<TMDBMovieResponse>> => {
  const response = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie`,
    { params: { query: query, page: page && page } }
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
export const getMoviesTopRatedListFromTmdb = async (
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

export const GetSimilarMoviesById = async (
  movieId: number
): Promise<TMDBMovieResponse[]> => {
  const response = await tmdbApi.get(`/movie/${movieId}/similar`);
  const data = response.data.results;
  return data;
};

export const getMovieReviewsByIdFromTmdb = async (
  movieId: number
): Promise<TMDBReviewsResponse[]> => {
  const response = await tmdbApi.get(`/movie/${movieId}/reviews`);
  const data = response.data.results;
  return data;
};

export class movieService {
  movieId: number;
  constructor(movieId: number) {
    this.movieId = movieId;
  }
  async getMovieDetailsFromTMDB(): Promise<TMDBMovieResponse> {
    const response = await tmdbApi.get(`/movie/${this.movieId}`);
    return response.data;
  }

  async getMovieCreditsFromTMDB(): Promise<TMDBMovieCreditResponse> {
    const response = await tmdbApi.get(`/movie/${this.movieId}/credits`);
    return response.data;
  }

  async getMovieGalleryFromTMDB(): Promise<TMDBImagesResponse> {
    const response = await tmdbApi.get(`/movie/${this.movieId}/images`);
    return response.data;
  }

  async getMovieReleaseDatesFromTMDB(): Promise<TMDBMovieReleaseDatesResponse> {
    const response = await tmdbApi.get(`/movie/${this.movieId}/release_dates`);
    return response.data;
  }

  async getMovieContentRatingsFromTMDB(): Promise<MovieRtingsData[]> {
    const ratings = [{ country: "", rating: "" }];
    const response = await tmdbApi.get(`/movie/${this.movieId}/release_dates`);
    const data: TMDBMovieReleaseDatesResponse = response.data;
    data.results.map((provider) => {
      provider.release_dates.map((release) => {
        ratings.push({
          country: provider.iso_3166_1,
          rating: release.certification,
        });
      });
    });
    return ratings;
  }
  async getMovieProvidersFromTMDB(): Promise<TMDBMovieWatchProvidersResponse> {
    const response = await tmdbApi.get(
      `/movie/${this.movieId}/watch/providers`
    );
    return response.data;
  }
  async getMovieExternalIdsFromTMDB(): Promise<TMDBMovieExternalIdsResponse> {
    const response = await tmdbApi.get(`/movie/${this.movieId}/external_ids`);
    return response.data;
  }
}
