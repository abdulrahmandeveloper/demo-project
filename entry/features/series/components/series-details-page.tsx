"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  SeriesAlternativeTitles,
  TMDBSeriesResponse,
} from "../interfaces/tmdb.interface";
import { getSeriesByIDFromTMDB } from "@/shared/services/tmdb/tmdb.series.service";
import {
  getSeriesAllContentRatingsFromTmdb,
  getSeriesAlternativeTitlesFromTmdb,
  getSeriesCastFromTmdb,
  getSeriesCrewFromTmdb,
  getSeriesExternalIdsFromTmdb,
  getSeriesImagesFromTmdb,
} from "../services/series.service";
import {
  TMDBBackdropsData,
  TMDBCastResponse,
  TMDBContentRating,
  TMDBCrewResponse,
  TMDBExternalIdsResponse,
  TMDBLogosData,
  TMDBPostersData,
} from "@/shared/interfaces/tmdb/tmdb.interface";
import { Separator } from "@/shared/components/ui/separator";
import PersonInfoCard from "@/routes/people/components/person-info-card";
import {
  convertOriginalCounryName,
  translateCountryCodeToCountryName,
} from "@/shared/utils/code-converters";
import { ComboboxContainer } from "@/shared/components/custom-ui/containers/combobox-container";
import { BsAspectRatio } from "react-icons/bs";
import { seriesDetailsPageSections } from "../constants/series-details";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown } from "lucide-react";

import {
  generalInformationGroupsContainerClassname,
  generalInformationGroupsTitleContainerClassname,
  sectionHeadersClassname,
} from "@/shared/constants/styles-constants";
import { SeriesDetailsPagefilterSelectionGroup } from "@/shared/components/filter/series-details-page-filter-selection-group";
import { ExternalIdsList } from "@/shared/components/external-ids-list";
import { EmptyMessage } from "@/shared/components/empty-message";
import { SeriesDetailsImageCard } from "@/shared/components/card/media-gallery-images-card";
import MediaDetailsPageSkeleton from "@/shared/components/skeletons/media-details-skeleton";

type SeriesDetailsPageProps = {
  seriesId: number;
};
const SeriesDetailsPage = ({ seriesId }: SeriesDetailsPageProps) => {
  const [series, setSeries] = useState<TMDBSeriesResponse>(
    {} as TMDBSeriesResponse
  );
  const [cast, setCast] = useState<TMDBCastResponse[]>([]);
  const [crew, setCrew] = useState<TMDBCrewResponse[]>([]);
  const [posters, setPosters] = useState<TMDBPostersData[]>([]);
  const [backdrops, setBackdrops] = useState<TMDBBackdropsData[]>([]);
  const [logos, setLogos] = useState<TMDBLogosData[]>([]);

  const [alternativeTitles, setAlternativeTitles] = useState<
    SeriesAlternativeTitles[]
  >([]);
  const [contentRating, setContent] = useState<TMDBContentRating[]>([]);
  const [externalIds, setExternalIds] = useState<TMDBExternalIdsResponse>();
  const [showCastSection, setShowCastSection] = useState<boolean>(true);
  const [showCrewSection, setShowCrewSection] = useState<boolean>(true);
  const [showPostersSection, setShowPostersSection] = useState<boolean>(true);
  const [showBackdropsSection, setShowBackdropsSection] =
    useState<boolean>(true);
  const [showLogosSection, setShowLogosSection] = useState<boolean>(true);

  //gallery section filter states
  //poster
  const [posterLanguageValue, setPosterLanguageValue] = useState<string | null>(
    null
  );
  const [postervotesValue, setPosterVotesValue] = useState<number | null>(null);
  const [posterRateValue, setPosterRateValue] = useState<number | null>(null);

  //backdrops
  const [backdropLanguageValue, setBackdropLanguageValue] = useState<
    string | null
  >(null);
  const [backdropvotesValue, setBackdropVotesValue] = useState<number | null>(
    null
  );
  const [backdropRateValue, setBackdropRateValue] = useState<number | null>(
    null
  );

  //logo
  const [logoLanguageValue, setlogoLanguageValue] = useState<string | null>(
    null
  );
  const [logoVoteValue, setlogoVotesValue] = useState<number | null>(null);
  const [logoRateValue, setlogoRateValue] = useState<number | null>(null);

  //loading state
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const postersData = await getSeriesImagesFromTmdb(
        seriesId,
        posterLanguageValue
      );

      if (postersData.posters.length > 0) {
        setPosters(postersData.posters);
      }
    };
    fetchData();
  }, [posterLanguageValue, seriesId]);

  useEffect(() => {
    const fetchData = async () => {
      const backdropsData = await getSeriesImagesFromTmdb(
        seriesId,
        backdropLanguageValue
      );
      if (backdropsData.posters.length > 0) {
        setBackdrops(backdropsData.backdrops);
      }
    };
    fetchData();
  }, [backdropLanguageValue, seriesId]);
  useEffect(() => {
    const fetchData = async () => {
      const logosData = await getSeriesImagesFromTmdb(
        seriesId,
        logoLanguageValue
      );
      if (logosData.posters.length > 0) {
        setLogos(logosData.logos);
      }
    };
    fetchData();
  }, [logoLanguageValue, seriesId]);
  useEffect(() => {
    const fetchData = async () => {
      const seriesData = await getSeriesByIDFromTMDB(seriesId);
      const castData = await getSeriesCastFromTmdb(seriesId);
      const crewData = await getSeriesCrewFromTmdb(seriesId);
      const contentRatingsData = await getSeriesAllContentRatingsFromTmdb(
        seriesId
      );
      const alternativeNamesData = await getSeriesAlternativeTitlesFromTmdb(
        seriesId
      );
      const externalIdsData = await getSeriesExternalIdsFromTmdb(seriesId);
      if (seriesData) {
        setSeries(seriesData);
      }
      if (castData) {
        setCast(castData);
      }
      if (crewData) {
        setCrew(crewData);
      }

      if (contentRatingsData) {
        setContent(contentRatingsData.results);
      }
      if (alternativeNamesData) {
        setAlternativeTitles(alternativeNamesData.results);
      }
      if (externalIdsData) {
        setExternalIds(externalIdsData);
      }
      setLoading(false);
    };
    fetchData();
  }, [seriesId]);

  //filtered gallery list
  /**
   * const logosFilteredList: TMDBLogosData[] | [] =
    images?.logos.length > 0 &&
    images?.logos.find((logo) => {
      if (
        logo.iso_639_1 === logoLanguageValue &&
        logo.vote_average === logoRateValue &&
        logo.vote_count === logoVoteValue
      ) {
        return logo;
      } else {
        return [];
      }
    });
   */
  const generalInformationClassname = "text-xl  opacity-70";

  const generalInformationGroupsContentContainerClassname = "w-19/20 mx-auto";

  const infoSectionTitleStyles = "text-xl opacity-70";
  return (
    <div className="w-9/10 mx-auto">
      {loading && <MediaDetailsPageSkeleton />}
      {!loading && (
        <div className="  overflow-x-auto w-9/10 mx-auto my-5">
          <div className="flex justify-between">
            <h1 className={sectionHeadersClassname}>Name: {series.name}</h1>
            <div className="flex items-center mx-5">
              <ComboboxContainer
                triggerTitle="Go to Section..."
                values={seriesDetailsPageSections}
                searchPlaceholder="Search Seactions.."
              />
            </div>
          </div>
          <div className="grid grid-cols-2  gap-2 bg-card p-4 rounded-lg">
            <div className={generalInformationGroupsContainerClassname}>
              <h1 className={generalInformationGroupsTitleContainerClassname}>
                Series Details
              </h1>
              <div className="my-2">
                <Separator />
              </div>
              <div
                className={generalInformationGroupsContentContainerClassname}
              >
                <p className={generalInformationClassname}>
                  Original series name: {series.original_name}
                </p>{" "}
                <p className={infoSectionTitleStyles}>
                  Original Languages in the Series:{" "}
                  {convertOriginalCounryName(series.original_language)}
                </p>
                <p className={infoSectionTitleStyles}>
                  IS Adultry: {series.adult ? "True" : "False"}
                </p>
                <p className={infoSectionTitleStyles}>
                  Genres:{" "}
                  {series.genres?.length > 0
                    ? series.genres?.map((genre) => genre.name)
                    : "Unknown"}
                </p>
                <p className={generalInformationClassname}>
                  Media Type: {series.media_type === "tv" ? "TV" : "Unknown"}
                </p>
                <div className="text-xl opacity-70 w-full ">
                  <Accordion type="single" collapsible className="w-full my-0">
                    <AccordionItem value={"alternative_names"}>
                      <AccordionTrigger className="text-xl hover:no-underline lg:mr-5 cursor-pointer">
                        Other Names:
                      </AccordionTrigger>
                      <AccordionContent>
                        {alternativeTitles.length > 0 ? (
                          <div className="text-xl opacity-70">
                            {alternativeTitles?.map((name, index) => (
                              <h1 key={index}> - {name.title}, </h1>
                            ))}
                          </div>
                        ) : (
                          "Unknown"
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className={`${infoSectionTitleStyles} overflow-hidden`}>
                  <Accordion type="single" collapsible className="w-full my-0">
                    <AccordionItem value={"alternative_names"}>
                      <AccordionTrigger className="text-xl hover:no-underline lg:mr-5 cursor-pointer my-0">
                        Other Spoken Languages in the Series:{" "}
                      </AccordionTrigger>
                      <AccordionContent>
                        {series.spoken_languages?.map(
                          (language, index) =>
                            `- ${language.english_name}${
                              series.spoken_languages.length - 1 > index
                                ? ","
                                : ""
                            }`
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <p className={generalInformationClassname}>
                  Series Slogan:{" "}
                  <p className="font-serif ">&quot; {series.tagline} &quot;</p>
                </p>
              </div>
            </div>
            <div className={generalInformationGroupsContainerClassname}>
              <h1 className={generalInformationGroupsTitleContainerClassname}>
                Airing Info
              </h1>
              <div className="my-2">
                <Separator />
              </div>
              <div
                className={generalInformationGroupsContentContainerClassname}
              >
                {series.next_episode_to_air?.air_date !== null && (
                  <p className={infoSectionTitleStyles}>
                    Next Episode Air Details:{" "}
                    {series.next_episode_to_air?.air_date}
                  </p>
                )}
                <p className={infoSectionTitleStyles}>
                  First Aired in: {series.first_air_date}
                </p>
                <p className={infoSectionTitleStyles}>
                  Last Media Aired in: {series.last_air_date}
                </p>
                <p className={infoSectionTitleStyles}>
                  Last Episode Aired in: {series.last_episode_to_air?.air_date}
                </p>
                {series.episode_run_time?.length > 0 && (
                  <p className="text-xl opacity-70">
                    Episode Length:{" "}
                    {series.episode_run_time.map((number) => number)} Minutes
                  </p>
                )}
              </div>
            </div>
            <div className={generalInformationGroupsContainerClassname}>
              <h1 className={generalInformationGroupsTitleContainerClassname}>
                TMDB Data
              </h1>
              <div className="my-2">
                <Separator />
              </div>
              <div
                className={generalInformationGroupsContentContainerClassname}
              >
                <p className={generalInformationClassname}>
                  TMDB ID: {series.id}
                </p>
                <p className={generalInformationClassname}>
                  TMDB Series Genres ID:{" "}
                  {series.genre_ids?.map(
                    (id, index) =>
                      `${id}${series.genre_ids.length - 1 > index ? "," : ""}`
                  )}
                </p>
                <p className={infoSectionTitleStyles}>
                  TMDB Voters: {series.vote_count} votes
                </p>
                <p className={infoSectionTitleStyles}>
                  TMDB Voters Average: {series.vote_average}
                </p>
                <p className={infoSectionTitleStyles}>
                  TMDB Popularity: {series.popularity}
                </p>
              </div>
            </div>
            <div className={generalInformationGroupsContainerClassname}>
              <h1 className={generalInformationGroupsTitleContainerClassname}>
                Production Details
              </h1>
              <div className="my-2">
                <Separator />
              </div>
              <div
                className={generalInformationGroupsContentContainerClassname}
              >
                <p className={infoSectionTitleStyles}>
                  In Production: {series.in_production ? "Yes" : "No"}
                </p>
                <p className={generalInformationClassname}>
                  Media Display Art Type: {series.type}
                </p>
                <p className={generalInformationClassname}>
                  Number of Seasons: {series.number_of_seasons}
                </p>
                <p className={generalInformationClassname}>
                  Number of Episodes: {series.number_of_episodes}
                </p>
                <p className={infoSectionTitleStyles}>
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
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="" id="cast">
              <div className="flex justify-between items-center my-2">
                <h1 className="my-2 text-2xl font-serif">Cast</h1>
                <Button
                  variant={"outline"}
                  onClick={() => setShowCastSection(!showCastSection)}
                >
                  <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200" />{" "}
                  {showCastSection ? "Collapse" : "Open"}
                </Button>
              </div>
              {showCastSection && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cast.map((cast, index) => {
                    return (
                      <div className="" key={index}>
                        <PersonInfoCard
                          containerClassName={""}
                          personImage={cast.profile_path}
                          name={cast.name}
                          id={cast.id}
                          originalName={cast.original_name}
                          gender={cast.gender}
                          role={cast.known_for_department}
                          popular={cast.popularity}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="" id="crew">
              <div className="flex justify-between items-center my-2">
                <h1 className="my-2 text-2xl font-serif">Crew</h1>
                <Button
                  variant={"outline"}
                  onClick={() => setShowCrewSection(!showCrewSection)}
                >
                  {" "}
                  <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200" />{" "}
                  {showCrewSection ? "Collapse" : "Open"}
                </Button>
              </div>{" "}
              {showCrewSection && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {crew.map((crew, index) => {
                    return (
                      <div className="" key={index}>
                        <PersonInfoCard
                          containerClassName={""}
                          personImage={crew.profile_path}
                          name={crew.name}
                          id={crew.id}
                          originalName={crew.original_name}
                          gender={crew.gender}
                          role={crew.known_for_department}
                          popular={crew.popularity}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="my-5" id="gallery">
            <h1 className={sectionHeadersClassname}>Gallery</h1>
            <div className="w-9/10 mx-auto">
              <div className="" id="posters">
                <div className="grid grid-cols-3 gap-5">
                  {" "}
                  <h1 className="my-2 text-xl font-sans font-semibold">
                    Posters
                  </h1>
                  <div className="flex justify-center">
                    <SeriesDetailsPagefilterSelectionGroup
                      firstFilter={{
                        value: posterLanguageValue,
                        setvalues: setPosterLanguageValue,
                      }}
                      secondFilter={{
                        value: postervotesValue,
                        setvalues: setPosterVotesValue,
                      }}
                      thirdFilter={{
                        value: posterRateValue,
                        setvalues: setPosterRateValue,
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    {" "}
                    <Button
                      variant={"outline"}
                      onClick={() => setShowPostersSection(!showPostersSection)}
                      className="w-1/"
                    >
                      <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200 my-auto" />{" "}
                      {showPostersSection ? "Collapse" : "Open"}
                    </Button>
                  </div>
                </div>
                {showPostersSection && (
                  <div className="grid lg:grid-cols-7 gap-5 my-4">
                    {posters.map((poster, index) => {
                      return (
                        <div className="" key={index}>
                          <SeriesDetailsImageCard image={poster} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="my-2">
                <Separator />
              </div>
              <div className="" id="backdrops">
                <div className="grid grid-cols-3 gap-5">
                  {" "}
                  <h1 className="my-2 text-xl font-sans font-semibold">
                    Backdrops
                  </h1>
                  <div className="flex justify-center">
                    <SeriesDetailsPagefilterSelectionGroup
                      firstFilter={{
                        value: backdropLanguageValue,
                        setvalues: setBackdropLanguageValue,
                      }}
                      secondFilter={{
                        value: backdropvotesValue,
                        setvalues: setBackdropVotesValue,
                      }}
                      thirdFilter={{
                        value: backdropRateValue,
                        setvalues: setBackdropRateValue,
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    {" "}
                    <Button
                      variant={"outline"}
                      onClick={() =>
                        setShowBackdropsSection(!showBackdropsSection)
                      }
                    >
                      <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200" />{" "}
                      {showBackdropsSection ? "Collapse" : "Open"}
                    </Button>
                  </div>
                </div>{" "}
                {showBackdropsSection && (
                  <div className="grid lg:grid-cols-7 gap-5 my-4">
                    {backdrops.map((backdrop, index) => {
                      if (backdrop.iso_639_1 !== backdropLanguageValue) {
                        return (
                          <div className="" key={index}>
                            <SeriesDetailsImageCard image={backdrop} />
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
              <div className="my-2">
                <Separator />
              </div>
              <div className="" id="logos">
                <div className="grid grid-cols-3 gap-5">
                  {" "}
                  <h1 className="my-2 text-xl font-sans font-semibold">
                    Logos
                  </h1>
                  <div className="flex justify-center">
                    <SeriesDetailsPagefilterSelectionGroup
                      firstFilter={{
                        value: logoLanguageValue,
                        setvalues: setlogoLanguageValue,
                      }}
                      secondFilter={{
                        value: logoVoteValue,
                        setvalues: setlogoVotesValue,
                      }}
                      thirdFilter={{
                        value: logoRateValue,
                        setvalues: setlogoRateValue,
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    {" "}
                    <Button
                      variant={"outline"}
                      onClick={() => setShowLogosSection(!showLogosSection)}
                    >
                      <ChevronDown className="shrink-0 translate-y-0.5 transition-transform duration-200" />{" "}
                      {showLogosSection ? "Collapse" : "Open"}
                    </Button>
                  </div>
                </div>{" "}
                {showLogosSection && logos.length > 0 && (
                  <div className="grid lg:grid-cols-7 gap-5 my-4">
                    {logos?.map((logo, index) => {
                      return (
                        <div className="" key={index}>
                          <SeriesDetailsImageCard image={logo} />
                        </div>
                      );
                    })}
                  </div>
                )}
                {showLogosSection && logos.length < 1 && <EmptyMessage />}
              </div>
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="my-5" id="external_ids">
            <h1 className={sectionHeadersClassname}>External ID&apos;s</h1>
            <div className="grid grid-cols-3 gap-8 w-8/10 mx-auto">
              <ExternalIdsList list={externalIds ?? null} />
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="my-5" id="content_rating">
            <h1 className={sectionHeadersClassname}>
              Series Content Rating&apos;s{" "}
            </h1>
            <div className="grid grid-cols-6 gap-5">
              {contentRating.map((rate, index) => (
                <div key={index} className="bg-gray-900 rounded-lg px-4 py-2">
                  <h2 className="flex my-2 gap-1">
                    <p className="opacity-60">Country System: </p>
                    {"    "}
                    {convertOriginalCounryName(rate.iso_3166_1)}
                  </h2>
                  <div className="my-1">
                    <Separator />
                  </div>
                  <h4 className="flex my-2 gap-2 ">
                    {" "}
                    <p className="opacity-60">Rating: </p>
                    {rate.rating}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeriesDetailsPage;
