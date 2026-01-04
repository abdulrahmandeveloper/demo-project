import { tmdbApi } from "@/shared/lib/axios/axios";
import {
  CompanyDetailsResponse,
  CompanysSearchResultsFromTMDBResponse,
} from "../interfaces/company.interface";
import { PopularCompanyIds } from "../constants/companies.constants";

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
