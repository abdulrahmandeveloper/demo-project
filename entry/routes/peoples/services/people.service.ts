import { tmdbApi } from "@/shared/lib/axios/axios";
import {
  LatestPersonFromTMDBResponse,
  TMDBPeopleResponse,
  TMDBPeopleTrendingResponse,
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
  async (): Promise<LatestPersonFromTMDBResponse> => {
    const response = await tmdbApi.get("/person/latest");
    return response.data;
  };

export const getPeopleSearchResultsFromTMDB = async (
  query: string,
  page?: number,
  parameters?: { gender: number; department: string; nationality: string }
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
  console.log(response.data.results);

  return response.data;
};
