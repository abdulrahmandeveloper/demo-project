import { tmdbApi } from "@/shared/lib/axios/axios";
import {
  PersonDataFromTMDBResponse,
  PeopleSarchQueryParameters,
  TMDBPeopleResponse,
  TMDBPeopleTrendingResponse,
  PersonGalleryResponse,
  PersonMovieCreditsResponse,
  PersonTvCreditsResponse,
} from "../interfaces/people.interface";

export const getPopularPeopleFromTMDB =
  async (): Promise<TMDBPeopleResponse> => {
    const response = await tmdbApi.get("/person/popular");
    return response.data;
  };

export const getTrendingPeopleFromTMDB =
  async (): Promise<TMDBPeopleTrendingResponse> => {
    const response = await tmdbApi.get("trending/person/day");
    return response.data;
  };

export const getLatestPersonFromTmdb =
  async (): Promise<PersonDataFromTMDBResponse> => {
    const response = await tmdbApi.get("/person/latest");
    return response.data;
  };

export const getPeopleSearchResultsFromTMDB = async (
  query: string,
  page?: number,
  parameters?: PeopleSarchQueryParameters
): Promise<TMDBPeopleResponse> => {
  const response = await tmdbApi.get("/search/person", {
    params: {
      query: query,
      page: page,
      gender: parameters?.gender,
      known_for_department: parameters?.department,
      nationality: parameters?.nationality,
    },
  });

  return response.data;
};

export const getPersonDetailsFromTMDB = async (
  id: string
): Promise<PersonDataFromTMDBResponse> => {
  const response = await tmdbApi.get(`/person/${id}`);

  return response.data;
};

export const getPersonMovieCreditsFromTMDB = async (
  id: string
): Promise<PersonMovieCreditsResponse> => {
  const response = await tmdbApi.get(`/person/${id}/movie_credits`);

  return response.data;
};

export const getPersonTvCreditsFromTMDB = async (
  id: string
): Promise<PersonTvCreditsResponse> => {
  const response = await tmdbApi.get(`/person/${id}/tv_credits`);

  return response.data;
};

export const getPersonGalleryFromTMDB = async (
  id: string
): Promise<PersonGalleryResponse> => {
  const response = await tmdbApi.get(`/person/${id}/images`);

  return response.data;
};
