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
    /*  const moviePosters: [] = filteredMovies.map(
      (movie: any) => movie.poster_path
    ); 
    console.log(filteredMovies);*/

    return filteredMovies;
  } catch (e) {
    console.log(e);
  }
};
