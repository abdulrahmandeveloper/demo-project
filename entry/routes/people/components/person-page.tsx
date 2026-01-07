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
  PersonMovieAsCastResponse,
  PersonMovieAsCrewResponse,
  PersonMovieCreditsResponse,
  PersonTVAsCastResponse,
  PersonTVAsCrewResponse,
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
import {
  FaAlignRight,
  FaAngleRight,
  FaArrowDown,
  FaArrowRight,
} from "react-icons/fa";
import {
  BsArrowRightSquare,
  BsArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { useRouter } from "next/navigation";

type PersonPageProps = {
  id: number;
};

const ValidDepartments: Record<string, string> = {
  Acting: "Actor",
  Directing: "Director",
  Writing: "Writer",
  Production: "Producer",
  Camera: "Cameraman",
  Editing: "Editor",
  Sound: "Sound designer",
  Art: "Artist",
  CostumeMakeUp: "Costume & Make-Up",
  VisualEffects: "Visual Effects",
  Lighting: "Lighter",
  Creator: "Creator",
  Crew: "Crew",
};

const PersonPage = ({ id }: PersonPageProps) => {
  const [personInformation, setPersonInformation] =
    useState<PersonDataFromTMDBResponse | null>(null);
  const [movieCredits, setMovieCredits] =
    useState<PersonMovieCreditsResponse | null>(null);
  const [seriesCredits, setSeriesCredits] =
    useState<PersonTvCreditsResponse | null>(null);
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
  const [movieCastCredit, setMovieCastCredit] = useState<
    PersonMovieAsCastResponse[]
  >([]);
  const [movieCrewCredit, setMovieCrewCredit] = useState<
    PersonMovieAsCrewResponse[]
  >([]);
  const [seriesCastCredit, setSeriesCastCredit] = useState<
    PersonTVAsCastResponse[]
  >([]);
  const [seriesCrewCredit, setSeriesCrewCredit] = useState<
    PersonTVAsCrewResponse[]
  >([]);
  const [role, setRole] = useState<"cast" | "crew">("cast");
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  //for videos section
  const [videos, setVideos] = useState();

  //for progressive disclosure
  const [visibleCount, setVissibleCount] = useState<number>(15);
  const incrementalSizeValue: number = 10;

  const router = useRouter();

  //useeffect for videos
  useEffect(() => {
    const fetchData = () => {};
    fetchData();
  }, []);

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
        setMovieCastCredit(movieCreditsData.cast);
        setMovieCrewCredit(movieCreditsData.crew);
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
      setLoading(true);

      try {
        const tvCreditsData = await getPersonTvCreditsFromTMDB(id);
        setSeriesCredits(tvCreditsData);

        if (tvCreditsData) {
          setSeriesCastCredit(tvCreditsData.cast);
          setSeriesCrewCredit(tvCreditsData.crew);
        }
      } catch (e) {
        console.error("error fetching series: ", e);
      }

      setLoading(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!personInformation?.name.trim()) return;
      const newsData = await getSearchNewsResultsFromTMDB(
        personInformation?.name
      );
      if (newsData) {
        setPersonRelatedNews(newsData.articles);
      }
    };
    fetchData();
  }, [personInformation]);

  useEffect(() => {
    //roles did in departments
    const departments = extractPersonCreditsDepartment(
      movieCredits,
      seriesCredits
    );

    setDepartments(departments);
  }, [movieCredits, seriesCredits]);

  //determinig gender
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

  const handleMoviesCastButtonClick = () => {
    setRole("cast");
  };

  const handleMoviesCrewButtonClick = () => {
    setRole("crew");
  };

  const handleSeriesCastButtonClick = () => {
    setRole("cast");
  };

  const handleSeriesCrewButtonClick = () => {
    setRole("crew");
  };

  const DoesHaveMoreGalleries: boolean = imageGallery.length > 8;
  const DoesHaveMoreNews: boolean = personRelatedNews.length > 10;

  // credits list  logic
  const movieCreditsList =
    selectedCredit === "movie" && role === "cast"
      ? (movieCastCredit as PersonMovieAsCastResponse[])
      : (movieCrewCredit.filter(
          (movie) => movie.department === selectedDepartment
        ) as PersonMovieAsCrewResponse[]);
  const SeriesCreditsList =
    selectedCredit === "series" && role === "cast"
      ? seriesCastCredit
      : seriesCrewCredit.filter(
          (series) => series.department === selectedDepartment
        );

  const DoesHaveMoreMovieCredits: boolean =
    role === "cast"
      ? movieCreditsList.length > 10
      : movieCreditsList.length > 10;
  const DoesHaveMoreSeriesCredits: boolean =
    role === "cast"
      ? SeriesCreditsList.length > 10
      : SeriesCreditsList.length > 10;

  const handleSelectedDepartmentButtonClick = (value: string) => {
    setSelectedDepartment(value);
    if (value === "Acting") {
      setRole("cast");
    } else if (value !== "Acting") {
      setRole("crew");
    }
  };

  const handleShowMoreProgressiveCreditsList = (
    lengthOfSelectedCredit: number
  ) => {
    setVissibleCount((prev) =>
      Math.min(prev + incrementalSizeValue, lengthOfSelectedCredit)
    );
  };

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
            <div className=" bg-card my-2 border border-white/50 px-10 py-4 flex rounded-2xl gap-5  mx-auto justify-center">
              {departments.length > 0 &&
                departments.map((department) => (
                  <div key={department}>
                    <Button
                      className="cursor-pointer"
                      variant={
                        selectedDepartment === department
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        handleSelectedDepartmentButtonClick(department)
                      }
                    >
                      AS {ValidDepartments[department]}
                    </Button>
                  </div>
                ))}
            </div>
            <div className="w-4/5 mx-auto my-2">
              <Separator />
            </div>
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
            <div className="w-2/3 mx-auto flex justify-between">
              <div className="flex gap-5">
                {selectedDepartment === "Acting" && (
                  <Button
                    variant={role === "cast" ? "default" : "outline"}
                    onClick={() =>
                      selectedCredit === "movie"
                        ? handleMoviesCastButtonClick()
                        : handleSeriesCastButtonClick()
                    }
                    className="cursor-pointer"
                  >
                    In Cast
                  </Button>
                )}
                {selectedDepartment !== "Acting" && (
                  <Button
                    variant={role === "crew" ? "default" : "outline"}
                    onClick={() =>
                      selectedCredit === "series"
                        ? handleSeriesCrewButtonClick()
                        : handleMoviesCrewButtonClick()
                    }
                    className="cursor-pointer"
                  >
                    In Crew
                  </Button>
                )}
              </div>
              <div className="">
                <Button
                  variant={"secondary"}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/discover/people/${personInformation?.id}/details`
                    )
                  }
                >
                  See All Details <BsArrowRightSquare />
                </Button>
              </div>
            </div>
            <div className=" w-2/3 mx-auto -[600px] ">
              <Separator className="my-4" />{" "}
              <div className="relative">
                <div className="  grid lg:grid-cols-5 gap-4">
                  {" "}
                  {selectedCredit === "movie"
                    ? movieCreditsList.slice(0, visibleCount).map((credit) => (
                        <div key={credit.id} className="">
                          <PosterCard
                            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${credit.poster_path}`}
                            linkPathTo={`/movies/${credit.id}`}
                          />
                          As {credit.character ?? credit.department}
                        </div>
                      ))
                    : SeriesCreditsList?.slice(0, visibleCount).map(
                        (credit) => (
                          <div key={credit.id}>
                            <PosterCard
                              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${credit.poster_path}`}
                              linkPathTo={`/series/${credit.id}`}
                            />
                            As {credit.department ?? credit.character}
                          </div>
                        )
                      )}
                  {/**
                   * gradient overlay
                   */}
                  {selectedCredit === "movie"
                    ? visibleCount < movieCreditsList.length && (
                        <div className="absolute right-0 bottom-0 left-0 h-3/6 bg-linear-to-t from-black via-black/95 to-transparent pointer-events-none rounded-lg"></div>
                      )
                    : visibleCount < SeriesCreditsList.length && (
                        <div className="absolute right-0 bottom-0 left-0 h-3/6 bg-linear-to-t from-black via-black/95 to-transparent pointer-events-none rounded-lg"></div>
                      )}{" "}
                </div>
                {/**
                 * logic for showing more button
                 */}
                {
                  <div className="absolute bottom-0 w-full h-1/10">
                    {selectedCredit === "movie"
                      ? DoesHaveMoreMovieCredits &&
                        visibleCount < movieCreditsList.length && (
                          <Button
                            className="cursor-pointer  w-40 h-10 flex mx-auto bottom-0"
                            onClick={() =>
                              handleShowMoreProgressiveCreditsList(
                                movieCreditsList.length
                              )
                            }
                          >
                            Show More <FaArrowDown />
                          </Button>
                        )
                      : selectedCredit === "series" &&
                        DoesHaveMoreSeriesCredits &&
                        visibleCount < SeriesCreditsList.length && (
                          <Button
                            className="mx-auto flex mt-5 cursor-pointer"
                            onClick={() =>
                              handleShowMoreProgressiveCreditsList(
                                SeriesCreditsList.length
                              )
                            }
                          >
                            Show More <FaArrowDown />
                          </Button>
                        )}
                  </div>
                }
              </div>
              {/**
               * logic to show number of  remaining credits to show
               */}
              {selectedCredit === "movie" ? (
                <HandleShowingMoreCreditsInfo
                  creditType={"movie"}
                  visibleCount={visibleCount}
                  movieList={movieCreditsList}
                  seriesList={SeriesCreditsList}
                />
              ) : (
                <HandleShowingMoreCreditsInfo
                  creditType={"series"}
                  visibleCount={visibleCount}
                  movieList={movieCreditsList}
                  seriesList={SeriesCreditsList}
                />
              )}
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
            {DoesHaveMoreNews && (
              <Button
                className="mx-auto flex my-4 cursor-pointer"
                variant={"outline"}
                size={"lg"}
              >
                See more news{" "}
                <FaAngleRight className="flex flex-col my-auto " />
              </Button>
            )}
          </div>
          <Separator className="w-9/15 mx-auto" />
          <div className="my-5 flex">
            <h1 className="flex mx-10 font-sans text-2xl font-semibold">
              Videos And Contents
            </h1>
          </div>
          <Separator className="w-9/15 mx-auto" />
          <div className="my-5 w-2/3 mx-auto flex gap-40">
            <h1 className="items-center justify- flex font-sans font-semibold text-2xl">
              Gallery
            </h1>
            <div className=" relative grid grid-cols-4 gap-1">
              {imageGallery.slice(0, 8).map((image) => (
                <div key={image.file_path}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${image.file_path}`}
                    className="rounded object-cover"
                  ></img>
                </div>
              ))}
              {DoesHaveMoreGalleries && (
                <>
                  <div className="absolute h-full flex flex-col items-center justify-center top-0 right-0 w-3/4 mx-auto my-auto bg-linear-to-l from-black via-5% to-transparent"></div>
                  <div className="absolute h-full flex flex-col items-center justify-center top-0 right-0 w-1/4 mx-auto my-auto ">
                    <Button
                      className="font-sans text-lg cursor-pointer  text-white/80 px-3 py-2"
                      variant={"secondary"}
                    >
                      Show All <FaArrowRight />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonPage;

function extractPersonCreditsDepartment(
  movieCredits: PersonMovieCreditsResponse,
  seriesCredits: PersonTvCreditsResponse
): string[] {
  const departments = [];
  if (
    (movieCredits?.cast?.length ?? -1) > 0 ||
    (seriesCredits?.cast?.length ?? -1) > 0
  ) {
    departments.push("Acting");
  }
  for (let i = 0; i < movieCredits?.crew?.length; i++) {
    const dep = movieCredits.crew[i].department;
    if (!departments.includes(dep)) {
      departments.push(movieCredits.crew[i].department);
    }
  }

  for (let i = 0; i < seriesCredits?.crew?.length; i++) {
    const dep = seriesCredits.crew[i].department;
    if (!departments.includes(dep)) {
      departments.push(seriesCredits.crew[i]?.department);
    }
  }

  return departments;
}

function HandleShowingMoreCreditsInfo({
  creditType,
  visibleCount,
  movieList,
  seriesList,
}: {
  creditType: "movie" | "series";
  visibleCount: number;
  movieList: any[];
  seriesList: any[];
}) {
  const remainingCredits =
    creditType === "movie"
      ? movieList.length - visibleCount
      : seriesList.length - visibleCount;
  const totalCredits =
    creditType === "movie" ? movieList.length : seriesList.length;
  const isShowingMoreInfo =
    creditType === "movie"
      ? visibleCount < movieList.length
      : visibleCount < seriesList.length;

  return (
    <div className="flex mx-auto w-full my-3">
      {isShowingMoreInfo && (
        <p className="flex mx-auto font-sans text-sm opacity-50">
          Show {remainingCredits} More of {totalCredits} {creditType}s
        </p>
      )}
    </div>
  );
}
