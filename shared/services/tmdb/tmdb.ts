export const getCollectionFromTMDB = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBIC_TMDB_BASE_URL}/collection/`
  );

  return await data.json();
};
