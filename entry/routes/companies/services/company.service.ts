import { tmdbApi } from "@/shared/lib/axios/axios";
import {
  AlternativeNamesOfCompaniesFromTMDBResponse,
  CompanyDetailsResponse,
  CompanyLogosFromTMDBResponse,
  CompanysSearchResultsFromTMDBResponse,
} from "../interfaces/company.interface";
import { PopularCompanyIds } from "../constants/companies.constants";
import { TMDBMediaResponse } from "@/shared/interfaces/tmdb/tmdb.interface";
import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";

export const getPopularCompaniesListFromTMDB = async (
  company_id?: number
): Promise<CompanyDetailsResponse[]> => {
  const list: CompanyDetailsResponse[] = [];
  PopularCompanyIds.map(async (id) => {
    const response = await tmdbApi.get(`/company/${id}`);
    const data = response.data;
    if (data) {
      list.push(data);
    }
  });

  return list;
};

export const getTopCompaniesFromTMDB = async () => {
  const response = await fetch(`/api/tmdb/companies/top-rated`);

  return await response.json();
};

export const getCompaniesSearchResultsFromTMDB = async (
  query: string,
  page?: number
): Promise<CompanysSearchResultsFromTMDBResponse> => {
  const response = await tmdbApi.get(`search/company`, {
    params: {
      query: query,
      page: page,
    },
  });

  return await response.data;
};

export const getCompanyByIdFromTMDB = async (
  id: number
): Promise<CompanyDetailsResponse> => {
  const response = await tmdbApi.get(`/company/${id}`);
  return response.data;
};

export const getAlsoKnownAsCompanyByIdFromTMDB = async (
  id: number
): Promise<AlternativeNamesOfCompaniesFromTMDBResponse> => {
  const response = await tmdbApi.get(`/company/${id}/alternative_names`);
  return response.data;
};

export const getCompanyLogosByIdFromTMDB = async (
  id: number
): Promise<CompanyLogosFromTMDBResponse> => {
  const response = await tmdbApi.get(`/company/${id}/images`);

  return response.data;
};

export const getCompanyMovieCreditsByIdFromTMDB = async (
  id: number
): Promise<TMDBMediaResponse<TMDBMovieResponse>> => {
  const response = await tmdbApi.get(`/discover/movie?with_companies=${id}`);

  return response.data;
};

export const getCompanySeriesCreditsByIdFromTMDB = async (
  id: number
): Promise<TMDBMediaResponse<TMDBSeriesResponse>> => {
  const response = await tmdbApi.get(`/discover/tv?with_companies=${id}`);

  return response.data;
};
