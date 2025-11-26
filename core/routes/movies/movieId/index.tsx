"use client";

import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import { getMovieByIDFromTMDB } from "@/shared/services/tmdb/tmdb.movie.service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MoviePage = () => {
  const [movie, setMovie] = useState<TMDBMovieResponse>(
    {} as TMDBMovieResponse
  );
  console.log(movie.genre_ids);

  const params = useParams();

  const movieId = Number(params.movieId);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieByIDFromTMDB(movieId);

      if (!data) return;

      setMovie(data);
    };

    fetchMovie();
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
            <div className="flex  w-1/2 ">
              <div className="justify-center flex flex-col mx-10 mb-4/5 ">
                <div className="">
                  <div className="flex items-center gap-2 mb-5">
                    {" "}
                    <h1 className="text-4xl font-bold">{movie.title}</h1>{" "}
                    <p className="text-sm text-center mx-2 mt-5 bg-green-500 py-px px-0.5 text-black rounded-sm">
                      {movie.vote_average}
                    </p>{" "}
                  </div>
                  <p className="text-lg font-sm ">{movie.overview}</p>
                  <div className="flex gap-4 mt-10">
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
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <h1 className="">Trailer</h1>
                <div className="w-full h-[10vh] border-amber-300  border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
