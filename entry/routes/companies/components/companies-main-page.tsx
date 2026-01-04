"use client";

import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { useEffect, useState } from "react";
import {
  getPopularCompaniesListFromTMDB,
  getTopCompaniesFromTMDB,
} from "../services/company.service";
import { CompanyDetailsResponse } from "../interfaces/company.interface";
import CompanyCard from "./company-card";
import { getSearchNewsResultsFromTMDB } from "@/shared/services/news.service";
import {
  NewsResponse,
  NewsSearchResultsResponse,
} from "@/routes/news/interfaces/news.interface";
import NewsCard from "@/routes/news/components/news-card";
import { useRouter } from "next/navigation";

const CompaniesMainPage = () => {
  const [popularCompanies, setPopularCompanies] = useState<
    CompanyDetailsResponse[]
  >([]);
  const [topCompanies, setTopCompanies] = useState();
  const [newsCompanies, setNewsCompanies] = useState<NewsResponse[]>([]);
  const [videosCompanies, setVideosCompanies] = useState();

  const newsVisisbleLength = 18;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const popularData = await getPopularCompaniesListFromTMDB();

      if (popularData) {
        setPopularCompanies(popularData);
      }
      await getTopCompaniesFromTMDB();

      /**
       * const topCompaniesData = await getTopCompaniesFromTMDB()

      if (topCompaniesData) {
        
      }
       */
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const newsData = await getSearchNewsResultsFromTMDB("cinema companies");
      if (newsData) {
        setNewsCompanies(newsData.articles);
      }
    };
    fetchData();
  }, []);
  const headersClassNames = "font-sans text-xl font-semibold my-2";
  return (
    <div className="w-9/10 mx-auto">
      <div className="my-5">
        <div className=" grid grid-cols-3">
          <div className=""></div>
          <div className="">
            <h1
              className={`${headersClassNames} flex justify-center text-center my-2`}
            >
              Popular Film & TV Production Companies
            </h1>
            <Separator className="my-4" />
          </div>
          <div className="flex justify-end">
            <Button
              className="mr-5 cursor-pointer hover:bg-card hover:text-white"
              onClick={() => router.push(`/discover/companies/search`)}
            >
              Search Companies
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {popularCompanies
            .slice(0, 18)
            .map((company: CompanyDetailsResponse) => (
              <div key={company.id}>
                <CompanyCard company={company} />
              </div>
            ))}
        </div>
      </div>
      <Separator className="my-3" />
      <div className="my-5">
        <h1 className={`${headersClassNames}`}>Top Companies</h1>
      </div>
      <Separator className="my-3" />
      <div className="my-5">
        <h1 className={`${headersClassNames}`}>History-proof Companies</h1>
      </div>
      <Separator className="my-3" />
      <div className="my-5">
        <h1 className={`${headersClassNames} my-2`}>News From Companies</h1>
        <div className="grid grid-cols-6 gap-4">
          {newsCompanies.slice(0, newsVisisbleLength).map((news) => (
            <div key={news.url}>
              <NewsCard
                id={news.source.id ?? 1}
                sourceName={news.source.name}
                authorName={news.author}
                title={news.title}
                description={news.description}
                imagUrl={news.urlToImage}
                publishDate={news.publishedAt}
                url={news.url}
                containerClassName={""}
              />
            </div>
          ))}
        </div>
      </div>
      <Separator className="my-3" />

      <div className="my-5">
        <h1 className={`${headersClassNames}`}>Videos Of Companies</h1>
      </div>
    </div>
  );
};

export default CompaniesMainPage;
