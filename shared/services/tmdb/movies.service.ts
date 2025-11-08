export const getMovieReccomendationsPosters = async (limitNumber: number) => {
  try {
    const recommendetMovies = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await recommendetMovies.json();
    if (!data) {
      return;
    }
    const filteredMovies = data.results.slice(0, limitNumber);

    return filteredMovies;
  } catch (e) {
    console.log(e);
  }
};

export const getMovieSearchResultsFromTMDB = async (query) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    }
  );
  const data = await res.json();
  return data;
};
