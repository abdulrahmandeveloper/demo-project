import { tmdbApi } from "@/shared/lib/axios/axios";

export const getMovieReccomendationsPosters = async (limitNumber: number) => {
  try {
    const recommendetMovies = await tmdbApi.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?page=1`
    );

    if (!recommendetMovies) {
      return;
    }
    const filteredMovies = recommendetMovies.data.results.slice(0, limitNumber);

    return filteredMovies;
  } catch (e) {
    console.error(e);
  }
};

export const getMovieSearchResultsFromTMDB = async (query: string) => {
  const res = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${query}`
  );
  const data = res.data;
  return data;
};
