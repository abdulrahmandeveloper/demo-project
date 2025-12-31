"use client";
import React, { useEffect, useState } from "react";
import {
  getPersonDetailsFromTMDB,
  getPersonGalleryFromTMDB,
  getPersonMovieCreditsFromTMDB,
  getPersonTvCreditsFromTMDB,
} from "../services/people.service";
import {
  PersonDataFromTMDBResponse,
  PersonImageProfileResponse,
  PersonMovieCreditsResponse,
  PersonTvCreditsResponse,
} from "../interfaces/people.interface";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Button } from "@/shared/components/ui/button";
import PosterCard from "@/shared/components/card/poster-card";
import PersonPageSkeleton from "./skeletons/person-page-skeleton";
import { getSearchNewsResultsFromTMDB } from "@/shared/services/news.service";
import { NewsResponse } from "@/routes/news/interfaces/news.interface";
import NewsCard from "@/routes/news/components/news-card";
import { FaAlignRight, FaAngleRight } from "react-icons/fa";

type PersonPageProps = {
  id: string;
};

const PersonPage = ({ id }: PersonPageProps) => {
  const [personInformation, setPersonInformation] =
    useState<PersonDataFromTMDBResponse | null>(null);
  const [movieCredits, setMovieCredits] =
    useState<PersonMovieCreditsResponse>();
  const [seriesCredits, setSeriesCredits] = useState<PersonTvCreditsResponse>();
  const [imageGallery, setImageGallery] = useState<
    PersonImageProfileResponse[]
  >([]);
  const [selectedCredit, setSelectedCredit] = useState<"movie" | "series">(
    "movie"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [personRelatedNews, setPersonRelatedNews] = useState<NewsResponse[]>(
    []
  );

  console.log(personRelatedNews);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getPersonDetailsFromTMDB(id);
      if (data) {
        setPersonInformation(data);
      }
      const movieCreditsData = await getPersonMovieCreditsFromTMDB(id);
      if (movieCreditsData) {
        setMovieCredits(movieCreditsData);
      }
      const tvCreditsData = await getPersonTvCreditsFromTMDB(id);
      if (tvCreditsData) {
        setSeriesCredits(tvCreditsData);
      }
      const galleryData = await getPersonGalleryFromTMDB(id);
      if (galleryData) {
        setImageGallery(galleryData.profiles);
      }

      setLoading(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const newsData = await getSearchNewsResultsFromTMDB(
        personInformation?.name
      );
      if (newsData) {
        setPersonRelatedNews(newsData.articles);
      }
    };
    fetchData();
  }, [personInformation]);
  const gender =
    personInformation?.gender === 1
      ? "Female"
      : personInformation?.gender === 2
      ? "Male"
      : "Unknown";

  const handleMovieButtonClick = () => {
    setSelectedCredit("movie");
  };

  const handleSeriesButtonClick = () => {
    setSelectedCredit("series");
  };

  const DoesHaveMoreMovieCredits: boolean = movieCredits?.cast.length > 15;
  const DoesHaveMoreSeriesCredits: boolean = seriesCredits?.cast.length > 15;

  const DoesHaveMoreGalleries: boolean = imageGallery.length > 6;
  const DoesHaveMoreNews: boolean = personRelatedNews.length > 10;
  return (
    <div>
      {loading && <PersonPageSkeleton />}
      {!loading && (
        <div className="">
          <div className="w-4/5 mx-auto flex gap-8">
            <div className="rounded-lg p-5 m-6 w-1/4 lg:aspect-square">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${personInformation?.profile_path}`}
                className="rounded-lg "
              ></img>
            </div>
            <div className="justify-center flex flex-col gap-3">
              <div className="flex gap-4">
                <Badge className="opacity-70 text-lg font-semibold px-3">
                  Name{" "}
                </Badge>
                <p className="text-xl font-medium">{personInformation?.name}</p>
              </div>
              <div className="flex gap-4">
                <Badge
                  className="opacity-70 text-lg font-semibold px-3"
                  variant={"outline"}
                >
                  Also As{" "}
                </Badge>
                <p className="text-xl font-medium">
                  {personInformation?.also_known_as}
                </p>
              </div>
              <div className="flex gap-4">
                <Badge
                  className="opacity-70 text-lg font-semibold px-3"
                  variant={"outline"}
                >
                  Role
                </Badge>
                <p className="text-xl font-medium">
                  {personInformation?.known_for_department}
                </p>
              </div>{" "}
              <div className="flex gap-4">
                <Badge
                  className="opacity-70 text-lg font-semibold px-3"
                  variant={"outline"}
                >
                  Birthday{" "}
                </Badge>
                <p className="text-xl font-medium">
                  {personInformation?.birthday}
                </p>
              </div>{" "}
              {personInformation?.deathday && (
                <div className="flex gap-4">
                  <Badge
                    className="opacity-70 text-lg font-semibold text-white px-3"
                    variant={"secondary"}
                  >
                    Died in{" "}
                  </Badge>
                  <p className="text-xl font-medium">
                    {personInformation?.deathday}
                  </p>
                </div>
              )}
              <div className="flex gap-4">
                <Badge
                  className="opacity-70 text-lg font-semibold px-3"
                  variant={"outline"}
                >
                  Gender{" "}
                </Badge>
                <p className="text-xl font-sans font-medium">{gender}</p>
              </div>{" "}
              <div className="flex gap-4">
                <Badge
                  className="opacity-70 text-lg font-semibold px-3"
                  variant={"outline"}
                >
                  Tmdb Rating
                </Badge>
                <p className="text-xl font-medium">
                  {personInformation?.popularity}
                </p>
              </div>{" "}
              <div className="flex gap-4">
                <Badge
                  className="opacity-50 text-lg font-semibold text-black px-3"
                  variant={"default"}
                >
                  Nationality
                </Badge>
                <p className="text-xl font-medium ">
                  {personInformation?.place_of_birth}
                </p>
              </div>{" "}
            </div>
            <div className="ml-auto h-1/2  flex">hello</div>
          </div>
          <div className="grid grid-cols-3 my-5 gap-3 px-5 min-h-[500px]">
            <div className="relative w-4/5 mx-auto h-full  overflow-hidden ">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${imageGallery[2]?.file_path}`}
                className="object-cover h-full w-full opacity-50"
              ></img>
              <div className="absolute inset-0 bg-linear-to-r from-black via-95% to-transparent"></div>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="flex items-center justify-center font-bold font-serif text-2xl">
                Biography
              </h1>
              <Separator />
              <p className="font-sans font-light text-lg px-2 py-3">
                {personInformation?.biography}
              </p>
            </div>
            <div className="relative w-4/5 mx-auto ml-auto h-full overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${imageGallery[3]?.file_path}`}
                className=" h-full w-full object-cover opacity-50"
              ></img>
              <div className="absolute inset-0 bg-linear-to-l from-black via-95% to-transparent"></div>
            </div>
          </div>
          <Separator className="my-1" />
          <div className="flex flex-col gap-1 my-5">
            <div className=" flex justify-center gap-5">
              <Button
                className="cursor-pointer"
                variant={selectedCredit === "movie" ? "default" : "outline"}
                onClick={handleMovieButtonClick}
              >
                Movies
              </Button>
              <Button
                className="cursor-pointer"
                variant={selectedCredit === "series" ? "default" : "outline"}
                onClick={handleSeriesButtonClick}
              >
                Series
              </Button>
            </div>
            <div className="w-2/3 mx-auto -[600px] ">
              <Separator className="my-4" />{" "}
              <div className="grid lg:grid-cols-5 gap-4">
                {" "}
                {selectedCredit === "movie"
                  ? movieCredits?.cast.map((credit) => (
                      <div key={credit.id} className="">
                        <PosterCard
                          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${credit.poster_path}`}
                          linkPathTo={`/movies/${credit.id}`}
                        />
                        As {credit.character}
                      </div>
                    ))
                  : seriesCredits?.cast.map((credit) => (
                      <div key={credit.id}>
                        <PosterCard
                          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${credit.poster_path}`}
                          linkPathTo={`/movies/${credit.id}`}
                        />
                        As {credit.character}
                      </div>
                    ))}
              </div>
              <Button>Show More</Button>
            </div>
          </div>
          <Separator className="w-9/15 mx-auto" />
          <div className="my-5 w">
            <h1 className="my-5 font-bold font-sans mx-10 text-2xl">
              News And Stories
            </h1>
            <div className="grid lg:grid-cols-5 w-9/10 mx-auto gap-5">
              {personRelatedNews.slice(0, 10).map((article) => (
                <div key={article.url} className="min-h-[200px]">
                  <NewsCard
                    id={article.source.id}
                    sourceName={article.source.name}
                    authorName={article.author}
                    title={article.title}
                    description={article.description}
                    imagUrl={article.urlToImage}
                    publishDate={article.publishedAt}
                    url={article.url}
                    containerClassName={""}
                  />
                </div>
              ))}
            </div>
            <Button
              className="mx-auto flex my-4 cursor-pointer"
              variant={"outline"}
              size={"lg"}
            >
              See more news <FaAngleRight className="flex flex-col my-auto " />
            </Button>
          </div>
          <Separator className="w-9/15 mx-auto" />
          <div className="my-5">
            <h1 className="">Videos</h1>
          </div>
          <Separator className="w-9/15 mx-auto" />
          <div className="my-5 w-1/2 mx-auto flex gap-40">
            <h1 className="items-center justify- flex font-sans font-semibold text-2xl">
              Gallery
            </h1>
            <div className="grid grid-cols-3 gap-1">
              {imageGallery.slice(0, 6).map((image) => (
                <div key={image.file_path}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${image.file_path}`}
                    className="rounded object-cover"
                  ></img>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonPage;

/**
 * <div className="my-2 w-4/5 mx-auto grid grid-cols-2">
          <div className="my-2">
            <div className="flex ml-auto ">
              <Button>Movies</Button>
            </div>
            <div className="my-2 w-2/3 mx-auto">
              {" "}
              <Separator />
            </div>
            <div className="grid lg:grid-cols-3">
              {" "}
              {movieCredits?.cast.map((credit) => (
                <div key={credit.id}>
                  <PosterCard
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${credit.poster_path}`}
                    linkPathTo={`/movies/${credit.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="my-2">
            <div className="flex mr-auto ">
              <Button>Series</Button>
            </div>{" "}
            <div className="my-2 w-2/3 mx-auto">
              {" "}
              <Separator />
            </div>{" "}
            <div className="grid grid-cols-3">
              {tvCredits?.cast.map((credit) => (
                <div key={credit.id}>
                  <PosterCard
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${credit.poster_path}`}
                    linkPathTo={`/series/${credit.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
 */
