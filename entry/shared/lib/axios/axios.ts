import axios from "axios";

export const tmdbApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
  timeout: 5000,
});

export const youtubeApi = axios.create({
  baseURL: `https://www.youtube.com`,
});

export const newsApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_NEWS_API_BASE_URL}`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
  },
  timeout: 2500,
});
