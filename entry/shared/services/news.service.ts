import {
  NewsFilters,
  SortOptions,
} from "@/routes/news/interfaces/news.interface";
import { newsApi } from "../lib/axios/axios";

export const getNewsHeadlineFromNewsApi = async (
  category: string,
  searchQuery: string,
  responseSize?: number,
  language: string = "en",
  filters?: NewsFilters
) => {
  const params: Record<string, string> = {
    category: category,
    q: searchQuery,
    language: language,
    pageSize: responseSize ? responseSize.toString() : "",
  };

  if (filters) {
    if (filters.publisher) {
      params.sources = filters.publisher;
    } else if (filters.country) {
      params.country = filters.country;
    } else if (filters.boxOffice) {
      params.q = `${filters.boxOffice}`;
    } else if (filters.date) {
      params.from = new Date(filters.date).toISOString();
    }
  }

  const response = await newsApi.get(`/top-headlines`, {
    params,
  });

  return response.data.articles;
};

export const getEveryNewsFromNewsApi = async (
  searchQuery: string,
  responseSize?: number,
  language: string = "en",
  sort?: SortOptions,
  filters?: NewsFilters
) => {
  console.log("searchQuery: ", searchQuery);

  const params: Record<string, string> = {
    q: searchQuery,
    language: language,
    sortBy: sort,
  };

  if (filters) {
    if (filters.publisher) {
      params.sources = filters.publisher;
    } else if (filters.boxOffice) {
      params.q = `${filters.boxOffice}`;
    } else if (filters.date) {
      params.from = new Date(filters.date).toISOString();
    }
  }

  if (responseSize) {
    params.pageSize = responseSize ? responseSize.toString() : "";
  }

  console.log("params: ", params);

  const response = await newsApi.get(`/everything`, {
    params,
  });

  const data = response.data;
  console.log("service data: ", data);

  return data.articles;
};
