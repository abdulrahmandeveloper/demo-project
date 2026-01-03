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
  console.log("moviesTopRatedPagesArray: ", moviesTopRatedPagesArray);
  console.log("seriesTopRatedPagesArray: ", seriesTopRatedPagesArray);

  console.log("moviesResponse: ", moviesResponse);
  console.log("series response: ", seriesResponse);
};
