"use client";

import React, { useEffect, useState } from "react";
import {
  getAlsoKnownAsCompanyByIdFromTMDB,
  getCompanyByIdFromTMDB,
  getCompanyLogosByIdFromTMDB,
  getCompanyMovieCreditsByIdFromTMDB,
  getCompanySeriesCreditsByIdFromTMDB,
} from "../services/company.service";
import {
  AlternativeCompanyName,
  CompanyDetailsResponse,
  CompanyLogosFromTMDB,
} from "../interfaces/company.interface";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/shared/components/ui/badge";
import { FiExternalLink } from "react-icons/fi";
import { Separator } from "@/shared/components/ui/separator";
import { getSearchNewsResultsFromTMDB } from "@/shared/services/news.service";
import { NewsResponse } from "@/routes/news/interfaces/news.interface";
import NewsCard from "@/routes/news/components/news-card";
import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";
import PosterCard from "@/shared/components/card/poster-card";

const CompanyPage = ({ id }: { id: number }) => {
  const [company, setCompany] = useState<CompanyDetailsResponse>({
    description: "",
    headquarters: "",
    homepage: "",
    id: 1,
    logo_path: "",
    name: "",
    origin_country: "",
    parent_company: { id: 1, name: "", logo_path: "" },
  });
  const [companyAlternativeNames, setCompanyAlternativeNames] = useState<
    AlternativeCompanyName[] | null
  >(null);
  const [logos, setLogos] = useState<CompanyLogosFromTMDB[] | null>(null);
  const [logosType, setLogosType] = useState<".png" | ".svg">(".svg");
  const [selectedLogoType, setSelectedLogoType] = useState<".png" | ".svg">(
    ".svg"
  );
  const [companyNews, setCompanyNews] = useState<NewsResponse[]>([]);

  //states for company credits
  const [movieCredits, setMovieCredits] = useState<TMDBMovieResponse[]>();
  const [seriesCredit, setSeriesCredit] = useState<TMDBSeriesResponse[]>([]);

  console.log(id);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getCompanyMovieCreditsByIdFromTMDB(
        company?.id ?? 1
      );

      if (movieData.results.length > 0) {
        setMovieCredits(movieData.results);
      }

      const seriesData = await getCompanySeriesCreditsByIdFromTMDB(
        company?.id ?? 1
      );
      if (seriesData.results.length > 0) {
        setSeriesCredit(seriesData.results);
      }
    };
    fetchData();
  }, [company?.id]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getCompanyByIdFromTMDB(id);
      if (responseData) {
        setCompany(responseData);
      }
      const alternativeData = await getAlsoKnownAsCompanyByIdFromTMDB(id);
      if (alternativeData.results.length > 0) {
        setCompanyAlternativeNames(alternativeData.results);
      }
      const logoData = await getCompanyLogosByIdFromTMDB(id);
      if (logoData.logos) {
        setLogos(logoData.logos);
      }
      const newsData = await getSearchNewsResultsFromTMDB(company.name);
      console.log(newsData);

      if (newsData) {
        setCompanyNews(newsData.articles);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const newsData = await getSearchNewsResultsFromTMDB(
        company.name ?? "unknown"
      );
      console.log(newsData);

      if (newsData.status === "ok") {
        setCompanyNews(newsData.articles);
      }
    };
    fetchData();
  }, [company?.name]);

  const handleLogoTypesButtonClick = (type: ".svg" | ".png") => {
    setLogosType(type);
    setSelectedLogoType(type);
  };

  const headSectionsClassName = "font-semibold font-sans text-2xl  my-4";
  const headerClassnames = "font-semibold font-sans text-lg mx-10 flex";

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4 h-screen">
        <div className="m-10 p-4 border rounded-[20px] border-white/10">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${company?.logo_path}`}
            alt={company?.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="p-1 flex flex-col gap-4 my-auto justify-between w-full">
          <div className="flex flex-col gap-2">
            <div className={headerClassnames}>
              <section className="mx-3">Name:</section>{" "}
              <Badge variant={"outline"}>{company?.name ?? "unknown"}</Badge>
            </div>
            {companyAlternativeNames !== null && (
              <div className={headerClassnames}>
                <section className="mx-3">Also Named As:</section>
                <div className=" flex gap-2">
                  {companyAlternativeNames?.map((name) => (
                    <h2 key={name.name}>
                      <Badge variant={"outline"} className="font- text-sm">
                        {name.name}
                      </Badge>
                      ,
                    </h2>
                  ))}
                </div>
              </div>
            )}
            <div className={headerClassnames}>
              <section className="mx-3">HeadQuarter:</section>{" "}
              <Badge variant={"outline"}>{company?.headquarters}</Badge>
            </div>
            <div className={headerClassnames}>
              <section className="mx-3">Parent Company:</section>{" "}
              {company.parent_company?.name.trim()
                ? company.parent_company?.name
                : "unknown"}
            </div>
            <div className={headerClassnames}>
              <section className="mx-3">From Country:</section>{" "}
              {company?.origin_country}
            </div>
          </div>
          <div className="flex mx-5 my-10  justify-around h-full items-end">
            <Button
              className="cursor-pointer text-[15px]"
              onClick={() => router.push(company?.homepage ?? "")}
            >
              Visit {company?.name} Homepage <FiExternalLink />
            </Button>
          </div>
        </div>
      </div>
      <div className="my-5 mx-auto w-9/10">
        <h1 className={`${headSectionsClassName} flex justify-center`}>
          Discover {company?.name} Media
        </h1>
        <div className="">
          <h1 className="my-3 font-sans font-semibold text-xl  ">Movies</h1>
          <div className="my-5 w-9/10 mx-auto">
            <Separator />
          </div>
          <div className="grid grid-cols-6 gap-4 mx-auto w-9/10">
            {movieCredits?.map((movie) => (
              <div key={movie.id}>
                <PosterCard
                  src={movie.poster_path}
                  linkPathTo={`/movies/${movie.id}`}
                />
                <div className="flex flex-col justify-center text-center my-2 opacity-60">
                  <p className="">{movie.title}</p>
                  <div className="">{movie.vote_average}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="my-3 font-sans font-semibold text-xl w-9/10 ">
            Series
          </h1>
          <div className="my-5 w-9/10 mx-auto">
            <Separator />
          </div>
          <div className="grid grid-cols-6 gap-4 mx-auto w-9/10">
            {seriesCredit?.map((series) => (
              <div key={series.id}>
                <PosterCard
                  src={series.poster_path}
                  linkPathTo={`/series/${series.id}`}
                />
                <div className="flex flex-col justify-center text-center my-2 opacity-60">
                  <p className="">{series.name}</p>
                  <div className="">{series.vote_average}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <div className="my-5 mx-auto w-9/10">
        <h1 className={`${headSectionsClassName} flex justify-center my-4`}>
          {company?.name} Logo&apos;s
        </h1>
        <div className="gap-5  flex justify-center my-3">
          <Button
            variant={selectedLogoType === ".png" ? "default" : "outline"}
            className={`px-5 py-2 cursor-pointer `}
            onClick={() => handleLogoTypesButtonClick(".png")}
            value={".png"}
          >
            PNG
          </Button>
          <Button
            variant={selectedLogoType === ".svg" ? "default" : "outline"}
            className={`px-5 py-2 cursor-pointer `}
            onClick={() => handleLogoTypesButtonClick(".svg")}
            value={".svg"}
          >
            SVG
          </Button>
        </div>
        {logos !== null ? (
          <div className="grid grid-cols-4 gap-6">
            {logos.map((logo) => {
              // logic for filtering .png extentions - as recommended by tmdb to use .svg other than .png
              if (logo.file_type !== logosType) return;
              return (
                <div
                  className="border border-white/10 rounded-lg p-4 bg-white/15"
                  key={logo.id}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${logo.file_path}`}
                    className="rounded object-cover"
                  ></img>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="flex items-center justify-center h-[30vh] opacity-65 font-sans  text-lg">
            Sorry, there is no {company?.name} logo&apos;s to share
          </p>
        )}
      </div>
      <Separator />
      <div className="my-5 w-9/10 mx-auto">
        <h1 className={`${headSectionsClassName} `}>
          News From {company?.name}
        </h1>
        <div className="w-9/10 mx-auto my-4">
          <Separator />
        </div>
        <div className="w-9/10 mx-auto grid grid-cols-5 gap-4">
          {companyNews.slice(0, 15).map((news) => (
            <div key={news.url}>
              <NewsCard
                id={news.source.id}
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
    </div>
  );
};

export default CompanyPage;
