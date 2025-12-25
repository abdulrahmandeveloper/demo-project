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
