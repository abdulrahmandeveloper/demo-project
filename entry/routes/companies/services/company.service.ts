import { tmdbApi } from "@/shared/lib/axios/axios";
import { CompanyDetailsResponse } from "../interfaces/company.interface";
import { PopularCompanyIds } from "../constants/companies.constants";
import { getMoviesTopRatedListFromTmdb } from "@/features/movie/services/tmdb.service";
import { getSeriesTopRatedListFromTmdb } from "@/features/series/services/tmdb.service";

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
  const moviesTopRatedResponse = await getMoviesTopRatedListFromTmdb();
  const seriesTopRatedResponse = await getSeriesTopRatedListFromTmdb();
  const moviesTopRatedTotalPages = moviesTopRatedResponse.total_pages;
  const seriesTopRatedTotalPages = seriesTopRatedResponse.total_pages;

  //creating an array by the length each total page
  const moviesTopRatedPagesArray: number[] = Array.from({
    length: moviesTopRatedTotalPages,
  });
  const seriesTopRatedPagesArray: number[] = Array.from({
    length: seriesTopRatedTotalPages,
  });

  const moviesResponse = moviesTopRatedPagesArray.map(async (number) => {
    const response = await getMoviesTopRatedListFromTmdb(number);
    return response.page;
  });

  const seriesResponse = seriesTopRatedPagesArray.map(async (number) => {
    const response = await getSeriesTopRatedListFromTmdb(number);
    return response.page;
  });
  console.log("movies response: ", moviesResponse);
  console.log("series response: ", seriesResponse);
};
