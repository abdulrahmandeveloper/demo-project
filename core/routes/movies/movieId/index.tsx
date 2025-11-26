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
      <div className="dark:text-white text-5xl ">{movie.title}</div>
    </div>
  );
};

export default MoviePage;
