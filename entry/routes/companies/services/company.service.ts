import { tmdbApi } from "@/shared/lib/axios/axios";
import { CompanyDetailsResponse } from "../interfaces/company.interface";
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
  console.log("raw response: ", response);

  console.log("getTopCompaniesFromTMDB: ", await response.json());
};
