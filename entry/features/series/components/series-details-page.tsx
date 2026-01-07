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
  TMDBCastResponse,
  TMDBContentRating,
  TMDBCrewResponse,
  TMDBExternalIdsResponse,
  TMDBSeriesImagesResponse,
} from "@/shared/interfaces/tmdb/tmdb.interface";
import { Separator } from "@/shared/components/ui/separator";
import PersonInfoCard from "@/routes/people/components/person-info-card";

type SeriesDetailsPageProps = {
  seriesId: number;
};
const SeriesDetailsPage = ({ seriesId }: SeriesDetailsPageProps) => {
  const [series, setSeries] = useState<TMDBSeriesResponse>(
    {} as TMDBSeriesResponse
  );
  const [cast, setCast] = useState<TMDBCastResponse[]>([]);
  const [crew, setCrew] = useState<TMDBCrewResponse[]>([]);
  const [images, setImages] = useState<TMDBSeriesImagesResponse>();
  const [alternativeTitles, setAlternativeTitles] = useState<
    SeriesAlternativeTitles[]
  >([]);
  const [contentRating, setContent] = useState<TMDBContentRating[]>([]);
  const [externalIds, setExternalIds] = useState<TMDBExternalIdsResponse>();

  console.log(series);

  useEffect(() => {
    const fetchData = async () => {
      const seriesData = await getSeriesByIDFromTMDB(seriesId);
      const castData = await getSeriesCastFromTmdb(seriesId);
      const crewData = await getSeriesCrewFromTmdb(seriesId);
      const imagesData = await getSeriesImagesFromTmdb(seriesId);
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
      if (imagesData) {
        setImages(imagesData);
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
    };
    fetchData();
  }, [seriesId]);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  const generalInformationClassname = "text-xl  opacity-70";
  const sectionHeadersClassname = "my-4 text-2xl font-serif";

  return (
    <div>
      <div className="  overflow-x-auto w-9/10 mx-auto my-5">
        <div className="">
          <p className={sectionHeadersClassname}>General Information: </p>
          <div className="grid grid-cols-2  gap-2 bg-card p-4 rounded-lg">
            <p className={generalInformationClassname}>TMDB ID: {series.id}</p>
            <p className={generalInformationClassname}>
              Media Display Art Type: {series.type}
            </p>
            <p className="text-xl  opacity-70">
              Media Type: {series.media_type === "tv" ? "TV" : "Movie/Film"}
            </p>
            <p className="text-xl  opacity-70">
              Number of Seasons: {series.number_of_seasons}
            </p>
            <p className="text-xl   opacity-70">
              Number of Episodes: {series.number_of_episodes}
            </p>
            {series.next_episode_to_air?.air_date !== null && (
              <p className="text-xl opacity-70 ">
                Next Episode Air Details: {series.next_episode_to_air?.air_date}
              </p>
            )}
            {series.episode_run_time?.length > 0 && (
              <p className="text-xl opacity-70">
                Episode Length:{" "}
                {series.episode_run_time.map((number) => number)} Minutes
              </p>
            )}
            <p className="text-xl opacity-70 ">
              First Aired in: {series.first_air_date}
            </p>
            <p className="text-xl opacity-70 ">
              Last Media Aired in: {series.last_air_date}
            </p>
            <p className="text-xl opacity-70 ">
              Last Episode Aired in: {series.last_episode_to_air?.air_date}
            </p>
            <p className="text-xl opacity-70 ">
              In Production: {series.in_production ? "Yes" : "No"}
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

            <p className="text-xl opacity-70 ">
              TMDB Voters: {series.vote_count} votes
            </p>
            <p className="text-xl opacity-70 ">
              TMDB Voters Average: {series.vote_average}
            </p>
            <p className="text-xl opacity-70 ">
              TMDB Popularity: {series.popularity}
            </p>
            <p className="text-xl opacity-70 w-full flex gap-4">
              <h1 className="text-xl opacity-70">Other Names: </h1>
              {alternativeTitles.length > 0 ? (
                <div className="text-xl opacity-70">
                  {alternativeTitles?.map((name) => (
                    <h1 key={name.iso_3166_1 && name.title}>
                      {" "}
                      - {name.title},{" "}
                    </h1>
                  ))}
                </div>
              ) : (
                "Unknown"
              )}
            </p>
            <p className="text-xl opacity-70">
              IS Adultry: {series.adult ? "True" : "False"}
            </p>
            <p className="text-xl opacity-70">
              Genres:{" "}
              {series.genres?.length > 0
                ? series.genres?.map((genre) => genre.name)
                : "Unknown"}
            </p>
            <p className="text-xl opacity-70">
              Genres ID&apos;s:{" "}
              {series.genre_ids?.length > 0
                ? series.genre_ids?.map((genre) => genre)
                : "Unknown"}
            </p>
          </div>
        </div>
        <div className="my-5">
          <Separator />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="">
            <h1 className="my-2 text-2xl font-serif">Cast</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cast.map((cast) => {
                return (
                  <div className="" key={cast.id}>
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
          </div>
          <div className="">
            <h1 className="my-2 text-2xl font-serif">Crew</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crew.map((crew) => {
                return (
                  <div className="" key={crew.id}>
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
          </div>
        </div>
        <div className="my-5">
          <Separator />
        </div>
        <div className="">
          <h1 className={sectionHeadersClassname}>Gallery</h1>
          <div className="">
            <h1 className="my-2 text-xl font-sans font-semibold">Posters</h1>
            <div className="grid lg:grid-cols-6 gap-4 my-4">
              {images?.posters.map((poster) => {
                return (
                  <div className="" key={poster.iso_639_1}>
                    {poster.height}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="">
            <h1 className="my-2 text-xl font-sans font-semibold">Backdrops</h1>
            <div className="grid lg:grid-cols-6 gap-4 my-4">
              {images?.backdrops.map((backdrop) => {
                return (
                  <div className="" key={backdrop.iso_639_1}>
                    {backdrop.height}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="">
            <h1 className="my-2 text-xl font-sans font-semibold">Logos</h1>
            <div className="grid lg:grid-cols-6 gap-4 my-4">
              {images?.logos.map((logo) => {
                return (
                  <div className="" key={logo.iso_639_1}>
                    {logo.height}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsPage;
