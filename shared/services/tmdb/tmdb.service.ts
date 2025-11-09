import { collectionRespose } from "@/shared/interfaces/tmdb";
import { collectionsID } from "@/shared/lib/utils/constants/collections";
import {
  getMovieRecommendationsFromTMDB,
  getMovieSearchResultsFromTMDB,
  getMoviesVideosID,
} from "../../../movie/services/tmdb.service";
import {
  getSeriesRecommendationsFromTMDB,
  getSeriesSearchResultsFromTMDB,
  getSeriesVideosID,
} from "../../../series/services/tmdb.service";
import { tmdbApi } from "@/shared/lib/axios/axios";
import { getYoutubeTrailer } from "./youtube.service";

export const getCollectionFromTMDB = async (): Promise<
  collectionRespose[] | undefined
> => {
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

export const getSearchResultFromTMDB = async (query: string) => {
  const [movies, serieses] = await Promise.allSettled([
    getMovieSearchResultsFromTMDB(query),
    getSeriesSearchResultsFromTMDB(query),
  ]);

  return {
    movies: movies.status === "fulfilled" ? movies.value.results : [],
    serieses: serieses.status === "fulfilled" ? serieses.value.results : [],
  };
};

export const GetSlideShowVidoes = async (
  movieID: number,
  seriesId: number,
  pages: number
) => {
  //request to tmdb for getting recommended videos id.
  const [movies, serieses] = await Promise.allSettled([
    getMovieRecommendationsFromTMDB(movieID, pages),
    getSeriesRecommendationsFromTMDB(seriesId, pages),
  ]);

  const data = {
    movies:
      movies.status === "fulfilled"
        ? movies.value.results.map((item) => item.id)
        : [],
    serieses:
      serieses.status === "fulfilled"
        ? serieses.value.results.map((item) => item.id)
        : [],
  };

  // request to tmdb videos endpoint to get youtube trailer id.
  const [moviesVideoIds, seiesesVideoIds] = await Promise.allSettled([
    getMoviesVideosID(data.movies),
    getSeriesVideosID(data.serieses),
  ]);

  const youtubeIDs = {
    moviesVideoIds:
      moviesVideoIds.status === "fulfilled" ? moviesVideoIds.value : [],
    seiesesVideoIds:
      seiesesVideoIds.status === "fulfilled" ? seiesesVideoIds.value : [],
  };

  // request to youtube to get back videos url
  const videos = getYoutubeTrailer(youtubeIDs);

  return videos;
};
