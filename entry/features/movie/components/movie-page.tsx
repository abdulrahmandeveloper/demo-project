"use client";

import CastCard from "@/shared/components/card/cast-card";
import KeywordsCard from "@/shared/components/card/keywords-card";
import PosterCard from "@/shared/components/card/poster-card";
import ReviewCard from "@/shared/components/card/review-card";
import VideoProviderCard from "@/shared/components/card/video-provider-card";
import TooltipContainer from "@/shared/components/custom-ui/containers/tooltip-container";
import { Button } from "@/shared/components/ui/button";
import VideoPlayer from "@/shared/components/video-player";
import { countryNameCodes } from "@/shared/constants/tmdb.constants";
import {
  Keywords,
  TMDBCastResponse,
  TMDBCompanyInfo,
  TMDBReviewsResponse,
} from "@/shared/interfaces/tmdb/tmdb.interface";
import { TMDBMovieResponse } from "entry/features/movie/interfaces/tmdb.interface";
import {
  GetSimilarMoviesById,
  getMovieReviewsByIdFromTmdb,
  getMoviesVideosID,
} from "entry/features/movie/services/tmdb.service";

import {
  getMovieByIdCredits,
  getMovieByIDFromTMDB,
  getMovieByIdKeywordsFromTMDB,
} from "entry/shared/services/tmdb/tmdb.movie.service";
import { translateCountryCodeToCountryName } from "@/shared/utils/code-converters";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Separator } from "@/shared/components/ui/separator";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

const MoviePage = () => {
  const [movie, setMovie] = useState<TMDBMovieResponse>(
    {} as TMDBMovieResponse
  );
  const [movieTrailerUrl, setMovieTrailerUrl] = useState<
    string | string[] | null
  >(null);
  const [casts, setCasts] = useState<TMDBCastResponse[] | null>();
  const [keywords, setKeywords] = useState<Keywords[]>();
  const [similarMovies, setSimilarMovies] = useState<TMDBMovieResponse[]>([]);
  const [reviews, setReviews] = useState<TMDBReviewsResponse[]>([]);

  //loading state
  const [loading, setLoading] = useState<boolean>(true);
  const displayedKeywords = keywords
    ?.slice(0, 4)
    .map((keyword) => keyword.name);

  const params = useParams();

  const movieId = Number(params.movieId);

  const movieLanguage = translateCountryCodeToCountryName(
    movie.original_language
  );

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieByIDFromTMDB(movieId);
      const casts = await getMovieByIdCredits(movieId);
      const keywords = await getMovieByIdKeywordsFromTMDB(movieId);
      const similarMovies = await GetSimilarMoviesById(movieId);
      const reviews = await getMovieReviewsByIdFromTmdb(movieId);

      if (!data) return;

      setMovie(data);
      setCasts(casts);
      setKeywords(keywords.keywords);
      setSimilarMovies(similarMovies);
      setReviews(reviews);
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchYoutubeUrl = async () => {
      const data = await getMoviesVideosID(movieId);
      if (!data) return;

      setMovieTrailerUrl(data);
      setLoading(false);
    };
    fetchYoutubeUrl();
  }, [movieId]);

  return (
    <div className="w-9/10 mx-auto">
      {loading && <></>}
      {!loading && (
        <div className="">
          {" "}
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute top-0 -z-50 opacity-75 h-[30vh] w-full object-cover object-center "
          />
          <div className="  grid grid-cols-3  text-5xl">
            <div className=" flex flex-col  items-center justify-center ">
              <div className="p-14 flex justify-center items-center">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div className="flex flex-row flex-wrap  gap-2 items-center mx-4 text-sm opacity-70 text-center">
                <KeywordsCard text={displayedKeywords as string[]} />
                <TooltipContainer
                  content={
                    keywords
                      ?.slice(4)
                      .map((item) => item.name) as unknown as string
                  }
                  className={
                    "flex  w-1/4 gap-3 text-center flex-wrap justify-center dark:bg-black dark:text-white "
                  }
                  trigger={
                    <Button
                      size={"sm"}
                      className=" p-2 m-0 border-0 hover:text-black  text-white!"
                      variant={"ghost"}
                    >
                      More...
                    </Button>
                  }
                />
              </div>
            </div>
            <div className="justify-center flex flex-col mb-4/5 w-full ">
              <div className=" h-[30vh] ">
                <div className="flex items-center gap-2 mb-5">
                  {" "}
                  <h1 className="text-4xl font-bold">{movie.title}</h1>{" "}
                  <p className="text-sm text-center mx-2 mt-5 bg-green-500 py-px px-0.5 text-black rounded-sm">
                    {movie.vote_average}
                  </p>{" "}
                </div>
                <p className="text-lg font-sm ">{movie.overview}</p>
                <div className="flex gap-4 mt-10 mb-2">
                  <p className="text-3xl text-center flex my-auto"> Genres:</p>
                  {movie?.genres?.map((genre, index) => (
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
                    {movie.origin_country?.map((code, index) =>
                      showOriginCountryiesNames(
                        movie.origin_country.length,
                        code,
                        index
                      )
                    )}
                  </p>
                  {movieLanguage ? (
                    <p className="text-xl opacity-85 gap-1 grid">
                      Language: {movieLanguage}
                    </p>
                  ) : null}
                </div>
                <p className="text-xl opacity-70">
                  Release year: {movie.release_date}
                </p>
                <div className="">{}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full ml-5">
              <h1 className="text-3xl ml-5">Trailer</h1>
              <div className=" h-[25vh]">
                <iframe
                  className=" border-amber-300   border w-8/10 mx-auto my-5  aspect-video"
                  src={`${process.env.NEXT_PUBLIC_YOUTUBE_API}/${movieTrailerUrl}`}
                ></iframe>
              </div>
            </div>
          </div>
          <div className=" my-16 flex gap-4">
            <div className="w-1/3 gap-4 flex flex-col items-center justify-center text-xl  opacity-90">
              {movie.belongs_to_collection?.name.trim() && (
                <p className="">
                  Collection: {movie.belongs_to_collection?.name}
                </p>
              )}
              <p className="">Budget: {movie.budget}</p>
              <p className="">Revenue: {movie.revenue}</p>
              <p className="">TMDB Popularity: {movie.popularity}</p>
            </div>
            <div className="w-2/3 flex flex-col justify-center">
              <div className="text-xl opacity-85 flex items-center gap-2">
                <p className="w-36">Produced By: </p>
                <div className="flex gap-4 w-full">
                  {movie.production_companies?.map((company) => (
                    <Link
                      href={`/discover/companies/${company.id}`}
                      className="hover:underline hover:text-blue-200 "
                      key={company.id}
                    >
                      <ProductionCompaniesCard company={company} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="my-5">
            <Separator />
          </div>
          <div className="w-2/3 ">
            <p className="text-lg font-bold mb-4">Cast:</p>
            <ScrollArea>
              <div className=" flex gap-5 ">
                {casts?.map((cast, key) => (
                  <Link
                    href={`/discover/people/${cast.id}`}
                    key={key}
                    className="text-center"
                  >
                    <CastCard
                      name={cast.name}
                      playedAs={cast.character}
                      profilePath={cast.profile_path}
                      className={"h-full flex flex-col  items-center "}
                    />
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="h-[18vh] flex items-center justify-center">
            <h1 className="font-bold text-4xl text-center">{movie.tagline}</h1>
          </div>
          <div className="w-9/10 flex flex-col justify-center my-5 rounded-lg mx-auto">
            <VideoPlayer
              containerClassName={
                "lg:w-[1024px] lg:h-[576px] mx-auto aspect-video overflow-hidden bg-neutral-900 flex justify-center items-center"
              }
            />
            <VideoProviderCard />
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
                      className={
                        "flex gap-5 w-full  min-w-[150px] min-h-[250px]"
                      }
                    />
                  </div>
                ))
              ) : (
                <p>No reviews to show!</p>
              )}
            </div>
          </div>
          {similarMovies.length > 0 && (
            <div className="w-4/5 mx-auto my-2 py-2">
              {" "}
              <h1 className="font-medium text-2xl my-4">Similar movies: </h1>
              <div className="flex flex-nowrap gap-3 overflow-x-auto w-full">
                {" "}
                {similarMovies.map((movie: TMDBMovieResponse, index) => (
                  <div
                    key={index}
                    className="min-w-[200px] max-w-[300px]  min-h-[300px]"
                  >
                    {" "}
                    <PosterCard
                      linkPathTo={`/movies/${movie.id}`}
                      src={`${movie.poster_path}`}
                      className="rounded-lg  w-[200px] h-[300px]"
                    />
                    <h1 className="flex text-center justify-center opacity-70 mt-2">
                      {movie.title}
                    </h1>
                    <p className="justify-center flex opacity-45">
                      {movie.release_date + " | " + movie.vote_average}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviePage;

export const showOriginCountryiesNames = (
  originalCountriesLength: number,
  code: string,
  currentIndex: number = 0
): string => {
  const countryName = countryNameCodes[code]
    ? `${countryNameCodes[code]}${
        currentIndex + 1 < originalCountriesLength ? " , " : ""
      }`
    : code;
  return countryName;
};

interface ProductionCompaniesCardProps {
  company: TMDBCompanyInfo;
}

const ProductionCompaniesCard = ({ company }: ProductionCompaniesCardProps) => {
  console.log(company.name);

  return (
    <div className="bg-card p-4 rounded-lg border-gray-500/50 border h-[180px] w-[260px] flex-col flex justify-between">
      <div className="mt-1 h-[120px] ">
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${company.logo_path}`}
          className="object-cover  w-full h-full"
          alt=""
        />
      </div>
      <div className="mt-2">
        <h1 className="text-center w-full text-lg">{company.name}</h1>
      </div>
    </div>
  );
};
