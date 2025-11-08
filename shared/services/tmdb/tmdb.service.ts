import { collectionRespose } from "@/shared/interfaces/tmdb";
import { collectionsID } from "@/shared/lib/utils/constants/collections";
import { getMovieSearchResultsFromTMDB } from "./movies.service";
import { getSeriesSearchResultsFromTMDB } from "./series.service";
import { tmdbApi } from "@/shared/lib/axios/axios";
import axios from "axios";

export const getCollectionFromTMDB = async () => {
  const collectionsData: collectionRespose[] = [];

  for (let i = 0; i < collectionsID.length; i++) {
    const res = await tmdbApi.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/collection/${collectionsID[i]}`
    );
    if (!res) {
      return;
    }
    const data = res.data;

    collectionsData.push(data);
  }

  return collectionsData;
};

export const getSearchResultFromTMDB = async (query) => {
  const [movies, serieses] = await Promise.allSettled([
    getMovieSearchResultsFromTMDB(query),
    getSeriesSearchResultsFromTMDB(query),
  ]);

  return {
    movies: movies.status === "fulfilled" ? movies.value.results : [],
    serieses: serieses.status === "fulfilled" ? serieses.value.results : [],
  };
};

export const GetSlideShowVidoes = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}`);
  if (!res.status === 200) {
    return [];
  }
  const data = res.data;
  return data;
};
