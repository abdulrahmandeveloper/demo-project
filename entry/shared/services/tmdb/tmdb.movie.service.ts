import { TMDBCastResponse } from "@/shared/interfaces/tmdb.interface";
import { TMDBMovieResponse } from "entry/features/movie/interfaces/tmdb.interface";
import { tmdbApi } from "entry/shared/lib/axios/axios";

export const getMovieByIDFromTMDB = async (
  movieId: number
): Promise<TMDBMovieResponse> => {
  const response = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}`
  );

  const data = response.data;

  return data;
};

export const getMovieByIdCredits = async (
  movieId: number
): Promise<TMDBCastResponse[]> => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);
  const data = response.data;

  if (data.cast) {
    const selectedCast = data.cast.slice(0, 9);

    return selectedCast;
  }

  return data;
};
