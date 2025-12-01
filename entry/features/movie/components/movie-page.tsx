"use client";

import CastCard from "@/shared/components/card/cast-card";
import { TMDBCastResponse } from "@/shared/interfaces/tmdb.interface";
import { TMDBMovieResponse } from "entry/features/movie/interfaces/tmdb.interface";
import { getMoviesVideosID } from "entry/features/movie/services/tmdb.service";
import Navbar from "entry/shared/components/navigation/navbar";
import { navbarLinks } from "entry/shared/constants/navbar-links.constants";
import {
  getMovieByIdCredits,
  getMovieByIDFromTMDB,
} from "entry/shared/services/tmdb/tmdb.movie.service";
import { DetectOriginalCounryName } from "entry/shared/utils/language-selector";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MoviePage = () => {
  const [movie, setMovie] = useState<TMDBMovieResponse>(
    {} as TMDBMovieResponse
  );
  const [movieTrailerUrl, setMovieTrailerUrl] = useState<
    string | string[] | null
  >(null);
  const [casts, setCasts] = useState<TMDBCastResponse[] | null>();

  const params = useParams();

  const movieId = Number(params.movieId);

  const movieLanguage = DetectOriginalCounryName(movie.original_language);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieByIDFromTMDB(movieId);
      const casts = await getMovieByIdCredits(movieId);

      if (!data) return;
      if (!casts) return;
      console.log(data);

      setMovie(data);
      setCasts(casts);
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchYoutubeUrl = async () => {
      const data = await getMoviesVideosID(movieId);
      if (!data) return;

      setMovieTrailerUrl(data);
    };
    fetchYoutubeUrl();
  }, [movieId]);

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
            src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute top-0 -z-50 opacity-75 h-[30vh] w-full object-cover object-center "
          />
          <div className="flex h-[55vh] mt-28 ">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${movie.poster_path}`}
              alt={movie.title}
              className=" h-full ml-10 rounded-lg shadow-lg    top-0"
            />
            <div className="flex   ">
              <div className="justify-center flex flex-col ml-10 mb-4/5 w-full ">
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
                    <p className="text-3xl text-center flex my-auto">
                      {" "}
                      Genres:
                    </p>
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
                      From: {movie.origin_country?.map((country) => country)}
                    </p>
                    {movieLanguage ? (
                      <p className="text-xl opacity-85 gap-1 grid">
                        Language: {movieLanguage}
                      </p>
                    ) : null}
                  </div>

                  <p className="text-xl opacity-70 my-8">
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
          </div>
        </div>
      </div>
      <div className="">
        <div className="m-20 w-2/3">
          <p className="text-lg font-bold mb-4">Cast:</p>
          <div className=" flex gap-5 ">
            {casts?.map((cast, key) => (
              <div key={key} className="">
                <CastCard
                  name={cast.name}
                  playedAs={cast.character}
                  profilePath={cast.profile_path}
                  className={"h-full flex flex-col  items-center"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
