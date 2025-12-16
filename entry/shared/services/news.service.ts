import { newsApi } from "../lib/axios/axios";

export const getNewsHeadlineFromNewsApi = async (
  category: string,
  searchQuery: string
) => {
  const response = await newsApi.get(`/top-headlines`, {
    params: {
      category: category,
      q: searchQuery,
    },
  });

  return response.data.articles;
};

export const getEveryNewsFromNewsApi = async (
  searchQuery: string,
  sort?: string
) => {
  const response = await newsApi.get(`/everything`, {
    params: {
      q: searchQuery,
      sortBy: sort,
    },
  });
  console.log(response);

  return response.data.articles;
};
