import { collectionRespose } from "@/shared/interfaces/tmdb";
import { collectionsID } from "@/shared/lib/utils/constants/collections";
import { getMovieSearchResultsFromTMDB } from "./movies.service";
import { getSeriesSearchResultsFromTMDB } from "./series.service";

export const getCollectionFromTMDB = async () => {
  const collectionsData: collectionRespose[] = [];

  for (let i = 0; i < collectionsID.length; i++) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/collection/${collectionsID[i]}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    const data = await res.json();
    collectionsData.push(data);
  }

  return collectionsData;
};

export const getSearchResultFromTMDB = async (query) => {
  const [movies, serieses] = await Promise.allSettled([
    getMovieSearchResultsFromTMDB(query),
    getSeriesSearchResultsFromTMDB(query),
  ]);
  console.log("service :", movies);
  console.log("service :", serieses);

  return {
    movies: movies.status === "fulfilled" ? movies.value.results : [],
    serieses: serieses.status === "fulfilled" ? serieses.value.results : [],
  };
};

export const GetSlideShowVidoes = () => {};
