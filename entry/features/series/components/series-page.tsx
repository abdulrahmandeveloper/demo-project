"use client";

import CastCard from "@/shared/components/card/cast-card";
import PosterCard from "@/shared/components/card/poster-card";
import ReviewCard from "@/shared/components/card/review-card";
import { Button } from "@/shared/components/ui/button";
import { countryNameCodes } from "@/shared/constants/tmdb.constants";
import {
  Genres,
  TMDBCastResponse,
  TMDBReviewsResponse,
} from "@/shared/interfaces/tmdb/tmdb.interface";
import {
  SeriesAlternativeTitles,
  TMDBSeasoEpisodesResponse,
  TMDBSeriesResponse,
} from "entry/features/series/interfaces/tmdb.interface";
import {
  getSeriesAlternativeTitlesFromTmdb,
  getSeriesCastFromTmdb,
  getSeriesPrimaryContentRatingsFromTmdb,
  getSeriesReviewsByIdFromTmdb,
  getSeriesVideosID,
  GetSimilarSeriesById,
  getSeasonEpisodesFromTMDB,
} from "@/features/series/services/series.service";
import { FaArrowRight } from "react-icons/fa6";
import { getSeriesByIDFromTMDB } from "entry/shared/services/tmdb/tmdb.series.service";
import {
  convertOriginalCounryName,
  translateCountryCodeToCountryName,
} from "@/shared/utils/code-converters";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import NetworksCard from "./networks-card";
import CompanyCard from "@/routes/companies/components/company-card";
import { Separator } from "@/shared/components/ui/separator";
import { SeasonResponse } from "@/shared/interfaces/tmdb/tmdb.series.interface";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { IoGridOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import EpisodeListCard from "./episode-list-card";

const SeriesPage = () => {
  const [series, setSeries] = useState<TMDBSeriesResponse>(
    {} as TMDBSeriesResponse
  );
  const [seriesTrailerUrl, setSeriesTrailerUrl] = useState<
    string | string[] | null
  >(null);
  const [casts, setCasts] = useState<TMDBCastResponse[] | []>([]);
  const [similarSeries, setSimilarSeries] = useState<TMDBSeriesResponse[]>([]);
  const [reviews, setReviews] = useState<TMDBReviewsResponse[]>([]);
  const [alternativeTitles, setAlternativeTitles] = useState<
    SeriesAlternativeTitles[]
  >([]);
  const [rating, setRating] = useState<string>("");
  const [seasons, setSeasons] = useState<SeasonResponse[]>([]);
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<
    number | null
  >(null);
  const [isSeasonListVisisble, setIsSeasonListVisisble] =
    useState<boolean>(true);
  const [episodes, setEpisodes] = useState<TMDBSeasoEpisodesResponse[]>([]);
  const [selectedEpisodeDisplayStyle, setSelectedEpisodeDisplayStyle] =
    useState<"grid" | "list">("list");

  const params = useParams();
  const router = useRouter();
  const seriesId = Number(params.seriesId);

  const seriesLanguage = convertOriginalCounryName(series.original_language);

  useEffect(() => {
    const fetchData = async () => {
      const episodesData = await getSeasonEpisodesFromTMDB(
        seriesId,
        selectedSeasonNumber
      );
      if (episodesData) {
        setEpisodes(episodesData);
      }
    };
    fetchData();
  }, [seriesId, selectedSeasonNumber]);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getSeriesByIDFromTMDB(seriesId);
      const castsData = await getSeriesCastFromTmdb(seriesId);
      const similarSeriesData = await GetSimilarSeriesById(seriesId);
      const reviewsData = await getSeriesReviewsByIdFromTmdb(seriesId);
      const alternativeData = await getSeriesAlternativeTitlesFromTmdb(
        seriesId
      );
      const ratingData = await getSeriesPrimaryContentRatingsFromTmdb(seriesId);

      if (!data) return;
      setSeasons(data.seasons);
      if (castsData) {
        setCasts(castsData);
      } else setCasts([]);

      setSeries(data);
      setSimilarSeries(similarSeriesData);
      setReviews(reviewsData);
      setAlternativeTitles(alternativeData.results);
      setRating(ratingData);
    };

    fetchMovie();
  }, [seriesId]);

  useEffect(() => {
    const fetchYoutubeUrl = async () => {
      const data = await getSeriesVideosID(seriesId);
      if (!data) return;

      setSeriesTrailerUrl(data);
    };
    fetchYoutubeUrl();
  }, [seriesId]);

  const officialSeasons = seasons.filter(
    (season) => season.season_number !== 0
  );
  const specialSeasons = seasons.filter((season) => season.season_number === 0);

  const handleSelectedSeasonNumber = (value: number) => {
    setSelectedSeasonNumber(value);
  };
  return (
    <div className="">
      <div className="dark:text-white ">
        <div className="  ">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${series.backdrop_path}`}
            alt={series.name}
            className="absolute top-0 -z-50 opacity-75 h-[30vh] w-full object-cover object-center "
          />
          <div className="h- mt-28 grid grid-cols-3 m-5">
            <div className="p-20 ">
              {" "}
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${series.poster_path}`}
                alt={series.name}
                className=" h-full w-full ml-10 rounded-lg shadow-lg    top-0 object-cover"
              />
            </div>

            <div className="justify-center flex flex-col p-10 w-full gap-1 max-h-1/2 my-auto">
              <div className="flex items-center  ">
                {" "}
                <h1 className="text-4xl font-bold">{series.name}</h1>{" "}
              </div>{" "}
              <div className="flex gap-1 py-1 px-2 mx-2 justify-">
                {" "}
                <p className="text-sm text-center  bg-green-500  text-black rounded-sm px-2 py-1">
                  {series.vote_average}
                </p>{" "}
                <p className="text-sm text-center  bg-green-500  text-black rounded-sm px-2 py-1">
                  {rating}
                </p>{" "}
              </div>
              <p className="text-lg font-sm ">{series.overview}</p>
              <div className="flex gap-4 mt-10 mb-2">
                <p className="text-3xl text-center flex my-auto"> Genres:</p>
                {series?.genres?.map((genre: Genres, index: number) => (
                  <div className="flex items-center justify-center" key={index}>
                    <p className="text-sm flex gap-4   mt-auto items-end border border-white py-0.5 px-1 opacity-60 rounded-md">
                      {genre.name}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xl opacity-85">
                From:{" "}
                {series.origin_country?.map((code) =>
                  countryNameCodes[code] ? `${countryNameCodes[code]}, ` : code
                )}
              </p>{" "}
              <p className="text-xl opacity-85">
                Produced in:{" "}
                {series.production_countries?.map(
                  (country) => `${country.name}, `
                )}
              </p>
              <div className="">
                {" "}
                {seriesLanguage ? (
                  <p className="text-xl opacity-85 gap-1 grid">
                    Language:{" "}
                    {translateCountryCodeToCountryName(seriesLanguage)}
                  </p>
                ) : null}
              </div>
              <p className="text-xl opacity-70 ">
                Aired in: {series.first_air_date}
              </p>
              <p className="text-xl opacity-70 ">Status: {series.status}</p>
            </div>
            <div className="flex flex-col justify-center w-full m-10">
              <h1 className="text-3xl ml-5">Trailer</h1>
              <div className=" h-[25vh]">
                <iframe
                  className=" border-amber-300   border w-8/10 mx-auto my-5  aspect-video"
                  src={`${process.env.NEXT_PUBLIC_YOUTUBE_API}/${seriesTrailerUrl}`}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="w-9/10 mx-auto my-5 flex gap-2">
          <div className="w-1/3 gap-4 flex flex-col items-center justify-center">
            <p className="text-xl  opacity-90">
              Number of Seasons: {series.number_of_seasons}
            </p>
            <p className="text-xl   opacity-90">
              Number of Episodes: {series.number_of_episodes}
            </p>
            <p className="text-xl opacity-70">
              TMDB Popularity: {series.popularity}
            </p>
            <p className="text-xl opacity-70 ">
              Created by:{" "}
              {series.created_by?.length > 0
                ? series.created_by?.map((creator) => (
                    <Link
                      key={creator.id}
                      href={`/discover/people/${creator.id}`}
                      className="hover:underline hover:text-blue-200"
                    >
                      {creator.name},
                    </Link>
                  ))
                : "Unknown"}
            </p>
          </div>
          <div className="w-2/3 flex flex-col justify-center">
            <div className="text-xl opacity-85 flex items-center gap-2">
              <p className="w-36">Produced By: </p>
              <div className="flex gap-4 w-full">
                {series.production_companies?.map((company) => (
                  <Link
                    href={`/discover/companies/${company.id}`}
                    className="hover:underline hover:text-blue-200 h-[120px]"
                    key={company.id}
                  >
                    <CompanyCard
                      headerClassnames="h-[100px]"
                      company={company}
                      isSearchCard={true}
                      containerClassname="w-[180px] h-[120px]"
                    />
                  </Link>
                ))}
              </div>
            </div>{" "}
            <div className="text-xl opacity-85 flex gap-2 my-2">
              <p className="flex items-center w-36">Networks: </p>
              <div className="flex overflow- flex-nowrap items-center overflow-x-auto gap-3 m-4 w-full h-[150px]">
                {" "}
                {series.networks?.map((network) => (
                  <div key={network.id}>
                    <NetworksCard
                      conatainerClassname="w-[180px] h-[120px] scale-2/3"
                      name={network.name}
                      logo={network.logo_path ?? "/images/avatar-image.jpg"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-9/10 mx-auto my-4">
          <Separator />
        </div>
        <div className="w-9/10 mx-auto ">
          <div className=" w-full overflow-hidden">
            <p className="text-xl font-bold mb-4">Cast: </p>
            <div className="flex gap-5 scroll-mx-1">
              {casts.slice(0, 9).map((cast, key) => (
                <Link
                  href={`/discover/people/${cast.id}`}
                  className=""
                  key={key}
                >
                  <CastCard
                    name={cast.name}
                    playedAs={cast.character}
                    profilePath={cast.profile_path}
                    className={"flex flex-col items-center"}
                  />
                </Link>
              ))}
              <div className="flex items-center mx-5 justify-center">
                <Button
                  className=""
                  onClick={() => router.push(`/series/details/${seriesId}`)}
                >
                  Discover More Details <FaArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[18vh] flex items-center justify-center">
          <h1 className="font-bold text-4xl text-center">{series.tagline}</h1>
        </div>
        <div className="w-9/10 flex flex-col justify-center my-5 rounded-lg mx-auto">
          <h1 className="my-3 text-3xl font-semibold">Seasons</h1>
          <div className="bg-card rounded-xl p-5">
            <div className="my-5">
              <h1 className="text-xl font-serif my-2">Official</h1>
              <div className=" mx-3 bg-outline  bg-black/20 border border-white/50 rounded-lg px-4 py-1 my-4">
                {officialSeasons.map((season) => (
                  <div key={season.id} className="my-5">
                    <div className="flex justify-between ">
                      <div className="flex">
                        <p className="font-bold">{season.season_number}</p>
                        <div className=" border mx-2 border-white/50" />
                        <p className="">{season.name}</p>
                      </div>
                      <div className="">
                        <p className="">Published In: {season.air_date}</p>
                      </div>
                      <div className="flex gap-1">
                        <p className="">{season.episode_count} Episodes</p>
                        <div className="items-center justify-center flex border border-amber-100 rounded-lg mx-2">
                          {selectedSeasonNumber === season.season_number &&
                          isSeasonListVisisble ? (
                            <GoChevronUp
                              className="cursor-pointer h-full w- size-6  "
                              onClick={() => {
                                if (
                                  selectedSeasonNumber === season.season_number
                                ) {
                                  setIsSeasonListVisisble(
                                    !isSeasonListVisisble
                                  );
                                }
                                handleSelectedSeasonNumber(
                                  season.season_number
                                );
                              }}
                            />
                          ) : (
                            <GoChevronDown
                              className="cursor-pointer h-full w- size-6  "
                              onClick={() => {
                                console.log("clicked");

                                if (
                                  selectedSeasonNumber === season.season_number
                                ) {
                                  setIsSeasonListVisisble(
                                    !isSeasonListVisisble
                                  );
                                }
                                handleSelectedSeasonNumber(
                                  season.season_number
                                );
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedSeasonNumber === season.season_number &&
                      isSeasonListVisisble === true && (
                        <div>
                          <div className="my-2">
                            <Separator></Separator>
                          </div>
                          <div className="flex gap-5 justify-center">
                            <Button
                              variant={
                                selectedEpisodeDisplayStyle === "grid"
                                  ? "default"
                                  : "outline"
                              }
                              className="px-5 py-2 "
                              onClick={() =>
                                setSelectedEpisodeDisplayStyle("grid")
                              }
                            >
                              <IoGridOutline /> Grid
                            </Button>
                            <Button
                              variant={
                                selectedEpisodeDisplayStyle === "list"
                                  ? "default"
                                  : "outline"
                              }
                              className="px-5 py-2 "
                              onClick={() =>
                                setSelectedEpisodeDisplayStyle("list")
                              }
                            >
                              <CiBoxList /> List
                            </Button>
                          </div>
                          <div
                            className={
                              selectedEpisodeDisplayStyle === "grid"
                                ? "grid grid-cols-4 gap-4 my-5 w-5/6 mx-auto"
                                : "flex flex-col gap-4 my-5 w-5/6 mx-auto"
                            }
                          >
                            {episodes.map((episode) => (
                              <div key={episode.id}>
                                <Link
                                  href={`/series/${seriesId}/season/${season.season_number}`}
                                >
                                  <EpisodeListCard
                                    episode={episode}
                                    orientation={
                                      selectedEpisodeDisplayStyle === "grid"
                                        ? "grid"
                                        : "list"
                                    }
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
            {specialSeasons.length > 0 && (
              <>
                {" "}
                <div className="my-2">
                  <Separator></Separator>
                </div>
                <div className="my-5">
                  <h1 className="text-xl font-serif my-2">Specials</h1>
                  <div className="my-1 mx-3 bg-outline ">
                    {specialSeasons.map((season) => (
                      <div
                        key={season.id}
                        className=" bg-black/20 border border-white/50 rounded-lg p-4  my-5"
                      >
                        <div className="flex justify-between">
                          <div className="flex">
                            <p className="font-bold">{season.season_number}</p>
                            <div className=" border mx-2 border-white/50" />
                            <p className="">{season.name}</p>
                          </div>
                          <div className="">
                            <p className="">Published In: {season.air_date}</p>
                          </div>
                          <div className=" flex gap-1">
                            <p className="">{season.episode_count} Episodes</p>
                            <div className="items-center justify-center flex border border-amber-100 rounded-lg mx-2">
                              {selectedSeasonNumber === season.season_number &&
                              isSeasonListVisisble ? (
                                <GoChevronUp
                                  className="cursor-pointer h-full w- size-6  "
                                  onClick={() => {
                                    if (
                                      selectedSeasonNumber ===
                                      season.season_number
                                    ) {
                                      setIsSeasonListVisisble(
                                        !isSeasonListVisisble
                                      );
                                    }
                                    handleSelectedSeasonNumber(
                                      season.season_number
                                    );
                                  }}
                                />
                              ) : (
                                <GoChevronDown
                                  className="cursor-pointer h-full w- size-6  "
                                  onClick={() => {
                                    console.log("clicked");

                                    if (
                                      selectedSeasonNumber ===
                                      season.season_number
                                    ) {
                                      setIsSeasonListVisisble(
                                        !isSeasonListVisisble
                                      );
                                    }
                                    handleSelectedSeasonNumber(
                                      season.season_number
                                    );
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        {selectedSeasonNumber === season.season_number &&
                          isSeasonListVisisble && (
                            <div>
                              <div className="my-2">
                                <Separator></Separator>
                              </div>
                              <div className="flex gap-5 justify-center">
                                <Button
                                  variant={
                                    selectedEpisodeDisplayStyle === "grid"
                                      ? "default"
                                      : "outline"
                                  }
                                  className="px-5 py-2 "
                                  onClick={() =>
                                    setSelectedEpisodeDisplayStyle("grid")
                                  }
                                >
                                  <IoGridOutline /> Grid
                                </Button>
                                <Button
                                  variant={
                                    selectedEpisodeDisplayStyle === "list"
                                      ? "default"
                                      : "outline"
                                  }
                                  className="px-5 py-2 "
                                  onClick={() =>
                                    setSelectedEpisodeDisplayStyle("list")
                                  }
                                >
                                  <CiBoxList /> List
                                </Button>
                              </div>
                              <div
                                className={
                                  selectedEpisodeDisplayStyle === "grid"
                                    ? "grid grid-cols-4 gap-4 my-5 w-5/6 mx-auto"
                                    : "flex flex-col gap-4 my-5 w-5/6 mx-auto"
                                }
                              >
                                {" "}
                                {episodes.map((episode) => (
                                  <div key={episode.id}>
                                    <EpisodeListCard
                                      episode={episode}
                                      orientation={
                                        selectedEpisodeDisplayStyle === "grid"
                                          ? "grid"
                                          : "list"
                                      }
                                    />{" "}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-9/10 mx-auto my-4">
          <Separator />
        </div>
        <div className="flex flex-col w-9/10 mx-auto my-8">
          <h1 className="font-medium text-3xl mb-5">Reviews</h1>
          <div className="flex w-full overflow-x-auto gap-4">
            {" "}
            {reviews.length > 0 ? (
              reviews.map((review, key) => (
                <div key={key}>
                  {" "}
                  <ReviewCard
                    review={review}
                    className={"flex gap-5 w-full  min-w-[150px] min-h-[250px]"}
                  />
                </div>
              ))
            ) : (
              <p className="flex  opacity-50 text-2xl h-[10vh] items-center mx-auto">
                No reviews to show!
              </p>
            )}
          </div>
        </div>
        <div className="w-4/5 mx-auto my-2">
          {" "}
          <h1 className="font-medium text-2xl my-4">Similar Series: </h1>
          <div className="flex flex-nowrap gap-3 overflow-x-auto w-full">
            {" "}
            {similarSeries.map((series: TMDBSeriesResponse, index) => (
              <div key={index} className="min-w-[200px] max-w-[300px]  ">
                {" "}
                <PosterCard
                  linkPathTo={`/series/${series.id}`}
                  src={`${series.poster_path}`}
                  className="rounded-lg  w-[200px] h-[300px] text-sm"
                />
                <h1 className="flex text-center justify-center opacity-70 text-sm mt-2">
                  {series.name}
                </h1>
                <p className="justify-center flex opacity-45 text-sm">
                  {series.first_air_date + " | " + series.vote_average}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesPage;
