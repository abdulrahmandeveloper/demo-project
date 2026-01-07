import { tmdbApi } from "entry/shared/lib/axios/axios";
import {
  TMDBCastResponse,
  TMDBContentRating,
  TMDBContentRatingResponse,
  TMDBCrewResponse,
  TMDBExternalIdsResponse,
  TMDBMediaResponse,
  TMDBReviewsResponse,
  TMDBSeriesImagesResponse,
  TMDBVideoReferenceResponse,
} from "@/shared/interfaces/tmdb/tmdb.interface";
import {
  SeriesAlternativeResponse,
  TMDBSeasoEpisodesResponse,
  TMDBSeasonEpisodesResponse,
  TMDBSeriesResponse,
} from "../interfaces/tmdb.interface";

export const getSeriesSearchResultsFromTMDB = async (
  query: string,
  page?: number
): Promise<TMDBMediaResponse<TMDBSeriesResponse>> => {
  const response = await tmdbApi.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/tv`,
    { params: { query: query, page: page && page } }
  );
  const data: TMDBMediaResponse<TMDBSeriesResponse> = response.data;
  return data;
};

export const getSeriesRecommendationsFromTMDB = async (
  seriesID: number,
  pages: number
): Promise<TMDBMediaResponse<TMDBSeriesResponse>> => {
  const response = tmdbApi.get(
    `/movie/${seriesID}/recommendations?page=${pages}`
  );

  const data: TMDBMediaResponse<TMDBSeriesResponse> = (await response).data;

  return data;
};

export const getSeriesVideosID = async (
  seriesId: number | number[]
): Promise<string | string[]> => {
  if (typeof seriesId === "object") {
    const response = await Promise.allSettled(
      seriesId.map((id) =>
        tmdbApi.get(`/movie/${id}/videos`).then((videos) => videos.data.results)
      )
    );

    const successfulResponses = response.filter(
      (
        result
      ): result is PromiseFulfilledResult<TMDBVideoReferenceResponse[]> =>
        result.status === "fulfilled"
    );

    const trailerKeysArray = successfulResponses
      .map((series) => {
        const trailer = series.value.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );
        return trailer ? trailer.key : null;
      })
      .filter((key): key is string => key !== undefined);

    const trailerKeys = trailerKeysArray.slice(0, 5);

    return trailerKeys;
  } else {
    const response = await tmdbApi.get(`/tv/${seriesId}/videos`);

    const data: string = response.data.results
      .filter(
        (item: TMDBVideoReferenceResponse) =>
          item.site === "YouTube" && item.type === "Trailer"
      )
      .map((item: TMDBVideoReferenceResponse) => item.key)
      .slice(0, 1)
      .join(" ");

    return data;
  }
};

//
export const getSeriesTopRatedListFromTmdb = async (
  page?: number,
  queries?: string
): Promise<TMDBMediaResponse<TMDBSeriesResponse>> => {
  const response = await tmdbApi.get(`/tv/top_rated`, {
    params: {
      page: page,
      q: queries,
    },
  });

  const data = response.data;

  return data;
};

export const getSeriesCastFromTmdb = async (
  tvId: number
): Promise<TMDBCastResponse[] | []> => {
  const response = await tmdbApi.get(`/tv/${tvId}/aggregate_credits`);
  if (!response) return [];
  const data = response.data.cast.filter(
    (person: TMDBCastResponse) => person.known_for_department === "Acting"
  );
  return data;
};

export const getSeriesCrewFromTmdb = async (
  tvId: number
): Promise<TMDBCrewResponse[] | []> => {
  const response = await tmdbApi.get(`/tv/${tvId}/aggregate_credits`);
  if (!response) return [];
  const data = response.data.crew.filter(
    (person: TMDBCrewResponse) => person.known_for_department !== "Acting"
  );
  return data;
};

export const getSeriesAlternativeTitlesFromTmdb = async (
  tvId: number
): Promise<SeriesAlternativeResponse> => {
  const response = await tmdbApi.get(`/tv/${tvId}/alternative_titles`);

  return response.data;
};

export const getSeriesPrimaryContentRatingsFromTmdb = async (
  tvId: number
): Promise<string> => {
  const response = await tmdbApi.get(`/tv/${tvId}/content_ratings`);
  const data = response.data;
  const rate: TMDBContentRating = data.results.find(
    (rate: TMDBContentRating) => rate.iso_3166_1 === "US"
  );
  return rate?.rating.trim() ? rate.rating : "";
};

export const getSeriesAllContentRatingsFromTmdb = async (
  tvId: number
): Promise<TMDBContentRatingResponse> => {
  const response = await tmdbApi.get(`/tv/${tvId}/content_ratings`);
  const data = response.data;
  return data;
};

export const getSeriesExternalIdsFromTmdb = async (
  tvId: number
): Promise<TMDBExternalIdsResponse> => {
  const response = await tmdbApi.get(`/tv/${tvId}/external_ids`);
  const data = response.data;
  return data;
};

export const getSeriesImagesFromTmdb = async (
  tvId: number
): Promise<TMDBSeriesImagesResponse> => {
  const response = await tmdbApi.get(`/tv/${tvId}/images`);
  const data = response.data;
  return data;
};

export const GetSimilarSeriesById = async (
  seriesId: number
): Promise<TMDBSeriesResponse[]> => {
  const response = await tmdbApi.get(`/tv/${seriesId}/similar`);
  const data = response.data.results;
  return data;
};

export const getSeriesReviewsByIdFromTmdb = async (
  seriesId: number
): Promise<TMDBReviewsResponse[]> => {
  const response = await tmdbApi.get(`/tv/${seriesId}/reviews`);
  const data = response.data.results;
  return data;
};

export const getSeriesSeasonsFromTmdb = async (
  tvId: number
): Promise<SeriesAlternativeResponse> => {
  const response = await tmdbApi.get(`/tv/${tvId}/alternative_titles`);

  return response.data;
};

export const getSeasonEpisodesFromTMDB = async (
  series_id: number,
  season_number: number
): Promise<TMDBSeasoEpisodesResponse[]> => {
  const response = await tmdbApi.get(
    `/tv/${series_id}/season/${season_number}`
  );
  const data: TMDBSeasonEpisodesResponse = response.data;
  return data.episodes;
};
