"use client";

import CastCard from "@/shared/components/card/cast-card";
import PosterCard from "@/shared/components/card/poster-card";
import ReviewCard from "@/shared/components/card/review-card";
import VideoProviderCard from "@/shared/components/card/video-provider-card";
import VideoPlayer from "@/shared/components/video-player";
import { countryNameCodes } from "@/shared/constants/tmdb.constants";
import {
  Genres,
  TMDBCastResponse,
  TMDBReviewsResponse,
} from "@/shared/interfaces/tmdb/tmdb.interface";
import { TMDBSeriesResponse } from "entry/features/series/interfaces/tmdb.interface";
import {
  getMovieReviewsByIdFromTmdb,
  getSeriesCastFromTmdb,
  getSeriesReviewsByIdFromTmdb,
  getSeriesVideosID,
  GetSimilarMoviesById,
  GetSimilarSeriesById,
} from "entry/features/series/services/tmdb.service";
import Navbar from "entry/shared/components/navigation/navbar";
import { navbarLinks } from "entry/shared/constants/navbar-links.constants";
import { getSeriesByIDFromTMDB } from "entry/shared/services/tmdb/tmdb.series.service";
import { DetectOriginalCounryName } from "entry/shared/utils/language-selector";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  const params = useParams();

  const seriesId = Number(params.seriesId);

  const seriesLanguage = DetectOriginalCounryName(series.original_language);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getSeriesByIDFromTMDB(seriesId);
      const castsData = await getSeriesCastFromTmdb(seriesId);
      const similarSeriesData = await GetSimilarSeriesById(seriesId);
      const reviewsData = await getSeriesReviewsByIdFromTmdb(seriesId);

      if (!data) return;
      if (castsData) {
        setCasts(castsData);
      } else setCasts([]);

      setSeries(data);
      setSimilarSeries(similarSeriesData);
      setReviews(reviewsData);
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
                    <p className="">
                      From:{" "}
                      {series.origin_country?.map(
                        (code) => countryNameCodes[code] ?? code
                      )}
                    </p>
                    {seriesLanguage ? (
                      <p className="text-xl opacity-85 gap-1 grid">
                        Language: {seriesLanguage}
                      </p>
                    ) : null}
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
        <div className="m-20 w-3/4">
          <p className="text-xl font-bold mb-4">Cast: </p>
          <div className="flex gap-5">
            {casts.map((cast, key) => (
              <div className="" key={key}>
                <CastCard
                  name={cast.name}
                  playedAs={cast.character}
                  profilePath={cast.profile_path}
                  className={"flex flex-col items-center"}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="h-[18vh] flex items-center justify-center">
          <h1 className="font-bold text-4xl text-center">{series.tagline}</h1>
        </div>
        <div className="w-9/10 flex flex-col justify-center my-5 rounded-lg mx-auto">
          <VideoPlayer
            containerClassName={
              "lg:w-[1024px] lg:h-[576px] mx-auto aspect-video overflow-hidden bg-neutral-900 flex justify-center items-center"
            }
          />
          <VideoProviderCard className="text-sm" />
        </div>
        <div className="flex flex-col w-9/10 mx-auto my-8">
          <h1 className="font-medium text-2xl mb-5">Reviews</h1>
          <div className="flex w-full overflow-x-auto gap-4">
            {" "}
            {reviews.length > 0 ? (
              reviews.map((review, key) => (
                <div key={key}>
                  {" "}
                  <ReviewCard
                    review={review}
                    className={"flex gap-5 w-full  min-w-[150px]"}
                  />
                </div>
              ))
            ) : (
              <p>No reviews to show!</p>
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
                <Link href={`/series/${series.id}`}>
                  {" "}
                  <PosterCard
                    src={`${series.poster_path}`}
                    className="rounded-lg  w-[200px] h-[300px] text-sm"
                  />
                </Link>
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
