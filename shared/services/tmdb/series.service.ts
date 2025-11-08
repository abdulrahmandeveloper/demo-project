export const getSeriesSearchResultsFromTMDB = async (query) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/tv?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    }
  );
  const data = await res.json();
  return data;
};
