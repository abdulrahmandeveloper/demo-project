interface getMovieReccomendationsPostersResponse {
  page: 1;
  results: [
    {
      adult: boolean;
      backdrop_path: string;
      genre_ids: [number];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: 8567.865;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }
  ];
}

export const getMovieReccomendationsPosters = async (limitNumber: number) => {
  console.log(process.env.NEXT_PUBLIC_TMDB_API_KEY);

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
      console.log(data);
    }
    const filteredMovies = data.results.slice(0, limitNumber);
    /*  const moviePosters: [] = filteredMovies.map(
      (movie: any) => movie.poster_path
    ); */
    console.log(filteredMovies);

    return filteredMovies;
  } catch (e) {
    console.log(e);
  }
};
