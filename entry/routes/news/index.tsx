"use client";

import NewsCard from "@/routes/news/components/news-card";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import {
  getEveryNewsFromNewsApi,
  getNewsHeadlineFromNewsApi,
} from "@/shared/services/news.service";
import React, { useEffect, useState } from "react";
import { NewsFilters, NewsResponse } from "./interfaces/news.interface";
import { SelectSeparator } from "@/shared/components/ui/select";
import NewsCardSkeleton from "./components/news-card-skeleton";
import FilterSelection from "@/shared/components/custom-ui/containers/filter-selection-container";
import NewsFilter from "./components/news-filter";

const NewsPage = () => {
  const [headlineNews, setHeadlineNews] = useState<NewsResponse[]>([]);
  const [movieNews, setMovieNews] = useState<NewsResponse[]>([]);
  const [seriesNews, setSeriesNews] = useState<NewsResponse[]>([]);
  const [trendingNews, setTrendingNews] = useState<NewsResponse[]>([]);
  const [latestNews, setLatesNews] = useState<NewsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [headlinesFilters, setHeadlinesFilters] = useState<NewsFilters>({
    publisher: "",
    boxOffice: "",
    country: "",
    date: "",
  });
  const [trendingFilters, setTrendingFilters] = useState<NewsFilters>({
    publisher: "",
    boxOffice: "",
    country: "",
    date: "",
  });
  const [latestFilters, setLatestFilters] = useState<NewsFilters>({
    publisher: "",
    boxOffice: "",
    country: "",
    date: "",
  });

  console.log(headlinesFilters);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const headlinesData = await getNewsHeadlineFromNewsApi(
        "entertainment",
        "movie",
        headlinesFilters
      );
      const moviesNewsData = await getEveryNewsFromNewsApi("movie");
      const seriesNewsData = await getEveryNewsFromNewsApi("tv");
      const trendingNewsData = await getEveryNewsFromNewsApi(
        "cinema",
        "popularity",
        trendingFilters
      );
      const latestNewsData = await getEveryNewsFromNewsApi(
        "cinema",
        "publishedAt",
        latestFilters
      );

      if (headlinesData) {
        setHeadlineNews(headlinesData);
      }
      if (moviesNewsData) {
        setMovieNews(moviesNewsData);
      }
      if (seriesNewsData) {
        setSeriesNews(seriesNewsData);
      }
      if (trendingNewsData) {
        setTrendingNews(trendingNewsData);
      }
      if (latestNewsData) {
        setLatesNews(latestNewsData);
      }
      setLoading(false);
    };

    fetchNews();
  }, [headlinesFilters, latestFilters, trendingFilters]);
  return (
    <div className="w-9/10 mx-auto">
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <h1 className="flex items-center justify-center text-4xl font-extrabold my-5">
        Explore The Cinema
      </h1>
      <div>
        <NewsFilter
          placeHolder="Breaking News!"
          value={headlinesFilters}
          setterValue={setHeadlinesFilters}
        />

        <div className="flex gap-5 w-4/5 mx-auto my-5">
          {" "}
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <NewsCardSkeleton
                  key={index}
                  containerClassName="max-w-md min-h-[520px] max-h-[600px]"
                />
              ))
            : headlineNews.slice(0, 3)?.map((news: NewsResponse, index) => (
                <div key={index} className="">
                  <NewsCard
                    id={news.source.id ?? news.title}
                    sourceName={news.source.name}
                    authorName={news.author}
                    title={news.title}
                    description={news.description}
                    imagUrl={news.urlToImage}
                    publishDate={news.publishedAt}
                    url={news.url}
                    containerClassName="max-w-md min-h-[520px] max-h-[600px]"
                  />
                </div>
              ))}
        </div>
      </div>
      <SelectSeparator className="my-4" />
      <div className="grid grid-cols-2">
        <div className="">
          <h1 className="font-bold text-xl my-1">News From Movies Universe</h1>
          <div className="grid lg:grid-cols-2 gap-5 w-9/10 max-h-[1000px] overflow-y-auto mx-auto my-5 pr-4">
            {" "}
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <NewsCardSkeleton
                    key={index}
                    containerClassName="max-w-md min-h-[400px]  max-h-[600px]"
                  />
                ))
              : movieNews?.map((news: NewsResponse, index) => (
                  <div key={index} className="">
                    <NewsCard
                      id={news.source.id ?? news.title}
                      sourceName={news.source.name}
                      authorName={news.author}
                      title={news.title}
                      description={news.description}
                      imagUrl={news.urlToImage}
                      publishDate={news.publishedAt}
                      url={news.url}
                      containerClassName="max-w-md min-h-[400px]  max-h-[600px]"
                    />
                  </div>
                ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-bold text-xl my-1">News From Series Universe</h1>
          <div className="grid lg:grid-cols-2 gap-5 w-9/10 max-h-[1000px] overflow-y-auto mx-auto my-5 pr-4">
            {" "}
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <NewsCardSkeleton
                    key={index}
                    containerClassName="max-w-md min-h-[400px]  max-h-[600px]"
                  />
                ))
              : seriesNews?.map((news: NewsResponse, index) => (
                  <div key={index} className="">
                    <NewsCard
                      id={news.source.id ?? news.title}
                      sourceName={news.source.name}
                      authorName={news.author}
                      title={news.title}
                      description={news.description}
                      imagUrl={news.urlToImage}
                      publishDate={news.publishedAt}
                      url={news.url}
                      containerClassName="max-w-md min-h-[400px]  max-h-[600px]"
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
      <SelectSeparator className="my-4" />
      <div className="">
        <NewsFilter
          placeHolder="Trending"
          excludeFilter="Country"
          value={trendingFilters}
          setterValue={setTrendingFilters}
        />
        <div className="flex gap-5 w-4/5 mx-auto my-5 overflow-x-auto">
          {" "}
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <NewsCardSkeleton
                  key={index}
                  containerClassName="max-w-md min-h-[400px]  max-h-[600px]"
                />
              ))
            : trendingNews?.map((news: NewsResponse, index) => (
                <div key={index} className="">
                  <NewsCard
                    id={news.source.id ?? news.title}
                    sourceName={news.source.name}
                    authorName={news.author}
                    title={news.title}
                    description={news.description}
                    imagUrl={news.urlToImage}
                    publishDate={news.publishedAt}
                    url={news.url}
                    containerClassName="max-w-md min-h-[400px]  max-h-[600px]"
                  />
                </div>
              ))}
        </div>
      </div>
      <SelectSeparator className="my-4" />
      <div className="">
        <NewsFilter
          placeHolder="Latest From The Cinema"
          excludeFilter="Country"
          value={latestFilters}
          setterValue={setLatestFilters}
        />

        <div className="flex gap-5 w-4/5 mx-auto my-5 overflow-x-auto">
          {" "}
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <NewsCardSkeleton
                  key={index}
                  containerClassName="max-w-md min-h-[400px]  max-h-[600px]"
                />
              ))
            : latestNews?.map((news: NewsResponse, index) => (
                <div key={index} className="">
                  <NewsCard
                    id={news.source.id ?? news.title}
                    sourceName={news.source.name}
                    authorName={news.author}
                    title={news.title}
                    description={news.description}
                    imagUrl={news.urlToImage}
                    publishDate={news.publishedAt}
                    url={news.url}
                    containerClassName="max-w-md min-h-[400px]  max-h-[600px]"
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
