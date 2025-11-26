import {
  CollectionRespose,
  GenresResponse,
} from "@/shared/interfaces/tmdb.interface";
import { collectionsID } from "@/shared/constants/collections.constants";
import {
  getMovieRecommendationsFromTMDB,
  getMovieSearchResultsFromTMDB,
  getMoviesVideosID,
} from "@/features/movie/services/tmdb.service";
import {
  getSeriesRecommendationsFromTMDB,
  getSeriesSearchResultsFromTMDB,
  getSeriesVideosID,
} from "@/features/series/services/tmdb.service";
import { tmdbApi } from "@/shared/lib/axios/axios";
import { getYoutubeTrailer } from "@/shared/services/youtube.service";
import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";

export const getCollectionFromTMDB = async (): Promise<
  CollectionRespose[] | null
> => {
  const collectionsData: CollectionRespose[] = [];

  for (let i = 0; i < collectionsID.length; i++) {
    const res = await tmdbApi.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/collection/${collectionsID[i]}`
    );
    if (!res) {
      return null;
    }
    const data = res.data;

    collectionsData.push(data);
  }

  return collectionsData;
};

export const getSearchResultFromTMDB = async (
  query: string
): Promise<{
  movies: TMDBMovieResponse[];
  series: TMDBSeriesResponse[];
}> => {
  const [movies, series] = await Promise.allSettled([
    getMovieSearchResultsFromTMDB(query),
    getSeriesSearchResultsFromTMDB(query),
  ]);

  return {
    movies: movies.status === "fulfilled" ? movies.value.results : [],
    series: series.status === "fulfilled" ? series.value.results : [],
  };
};

export const GetSlideShowVidoes = async (
  movieID: number,
  seriesId: number,
  pages: number
): Promise<string[]> => {
  //request to tmdb for getting recommended videos id.
  const [movies, series] = await Promise.allSettled([
    getMovieRecommendationsFromTMDB(movieID, pages),
    getSeriesRecommendationsFromTMDB(seriesId, pages),
  ]);

  const data = {
    movies:
      movies.status === "fulfilled"
        ? movies.value.results.map((movie: TMDBMovieResponse) => movie.id)
        : [],
    series:
      series.status === "fulfilled"
        ? series.value.results.map((series: TMDBSeriesResponse) => series.id)
        : [],
  };

  // request to tmdb videos endpoint to get youtube trailer id.
  const [moviesVideoIds, seiesesVideoIds] = await Promise.allSettled([
    getMoviesVideosID(data.movies),
    getSeriesVideosID(data.series),
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

// genres
export const getGenresFromTmdb = async (): Promise<GenresResponse> => {
  const res = await tmdbApi.get("/genre/tv/list");

  const data: GenresResponse = res.data;

  return data;
};
