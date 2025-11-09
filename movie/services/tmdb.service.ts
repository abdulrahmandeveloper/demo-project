import { tmdbApi } from "@/shared/lib/axios/axios";

export const getPopularMoviesPosters = async (limitNumber: number) => {
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

export const getMovieRecommendationsFromTMDB = async (
  movieID: number,
  pages: number
) => {
  const res = tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieID}/recommendations?page=${pages}`
  );

  const data = (await res).data;
  return data;
};

export const getMoviesVideosID = async (movieIDs: number[]) => {
  const req = await Promise.allSettled(
    movieIDs.map((id) =>
      tmdbApi.get(`/movie/${id}/videos`).then((videos) => videos.data.results)
    )
  );

  const trailerKeysArray = req.map((movie) => {
    const trailer = movie.value.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );
    return trailer ? trailer.key : null;
  });

  const trailerKeys = trailerKeysArray.slice(0, 5);

  return trailerKeys;
};
