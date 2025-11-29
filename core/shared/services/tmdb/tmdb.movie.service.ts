import {
  TMDBCastResponse,
  TMDBMovieResponse,
} from "@/features/movie/interfaces/tmdb.interface";
import { tmdbApi } from "@/shared/lib/axios/axios";

export const getMovieByIDFromTMDB = async (
  movieId: number
): Promise<TMDBMovieResponse> => {
  const res = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieId}`
  );

  const data = res.data;

  return data;
};

export const getMovieByIdCredits = async (
  movieId: number
): Promise<TMDBCastResponse[]> => {
  const res = await tmdbApi.get(`/movie/${movieId}/credits`);
  const data = res.data;

  if (data.cast) {
    const selectedCast = data.cast.slice(0, 9);
    console.log("selectedCast: ", selectedCast);

    return selectedCast;
  }

  return data;
};
