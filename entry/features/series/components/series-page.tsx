"use client";

import { Genres } from "@/shared/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "entry/features/series/interfaces/tmdb.interface";
import { getSeriesVideosID } from "entry/features/series/services/tmdb.service";
import Navbar from "entry/shared/components/navigation/navbar";
import { navbarLinks } from "entry/shared/constants/navbar-links.constants";
import { getSeriesByIDFromTMDB } from "entry/shared/services/tmdb/tmdb.series.service";
import { DetectOriginalCounryName } from "entry/shared/utils/language-selector";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SeriesPage = () => {
  const [series, setSeries] = useState<TMDBSeriesResponse>(
    {} as TMDBSeriesResponse
  );
  const [seriesTrailerUrl, setSeriesTrailerUrl] = useState<
    string | string[] | null
  >(null);

  const params = useParams();

  const seriesId = Number(params.seriesId);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getSeriesByIDFromTMDB(seriesId);

      if (!data) return;

      setSeries(data);
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
  }, []);

  return (
    <div className="">
      <div className="">
        <Navbar
          logoPath={"/images/istar-logo.png"}
          links={navbarLinks}
          search={true}
        />
      </div>
      <div className="dark:text-white text-5xl ">
        <div className="h-[50vh] ">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${series.backdrop_path}`}
            alt={series.name}
            className="absolute top-0 -z-50 opacity-75 h-[30vh] w-full object-cover object-center "
          />
          <div className="flex h-[55vh] mt-28 ">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${series.poster_path}`}
              alt={series.name}
              className=" h-full ml-10 rounded-lg shadow-lg    top-0"
            />
            <div className="flex   ">
              <div className="justify-center flex flex-col ml-10 mb-4/5 w-full ">
                <div className=" h-[30vh] ">
                  <div className="flex items-center gap-2 mb-5">
                    {" "}
                    <h1 className="text-4xl font-bold">{series.name}</h1>{" "}
                    <p className="text-sm text-center mx-2 mt-5 bg-green-500 py-px px-0.5 text-black rounded-sm">
                      {series.vote_average}
                    </p>{" "}
                  </div>
                  <p className="text-lg font-sm ">{series.overview}</p>
                  <div className="flex gap-4 mt-10 mb-2">
                    <p className="text-3xl text-center flex my-auto">
                      {" "}
                      Genres:
                    </p>
                    {series?.genres?.map((genre: Genres, index: number) => (
                      <div
                        className="flex items-center justify-center"
                        key={index}
                      >
                        <p className="text-sm flex gap-4   mt-auto items-end border border-white py-0.5 px-1 opacity-60 rounded-md">
                          {genre.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="text-xl opacity-85 gap-1 grid">
                    <p className="">From: {series.origin_country}</p>
                    <p className="">
                      Language:{" "}
                      {DetectOriginalCounryName(series.original_language)}
                    </p>
                  </div>
                  <p className="text-xl opacity-70 my-8">
                    Aired in: {series.first_air_date}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center w-full ml-5">
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
        </div>
      </div>
    </div>
  );
};

export default SeriesPage;
