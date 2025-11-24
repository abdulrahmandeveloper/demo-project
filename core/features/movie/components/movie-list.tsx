"use client";

import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import React, { useEffect, useState } from "react";
import { getMoviesListFromTmdb } from "../services/tmdb.service";
import ListItemCard from "@/shared/components/card/list-item-card";

const MoviesList = () => {
  const [list, setList] = useState<TMDBMovieResponse[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasFiltersSelected, setHasFiltersSelected] = useState<boolean>(false);
  //const [refetchContent, setRefetchContent] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMoviesListFromTmdb();
      if (data) {
        setList(data.results);
        setPages(data.total_pages);
        setCurrentPage(data.page);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div className="w-3/4 mx-auto">
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <div className="p-8">
        <h1 className="font-bold text-2xl">Discover Movies</h1>
        <div className="grid grid-cols-5 w-19/20 mx-auto gap-3 py-5">
          {" "}
          {list.map((movie) => {
            return (
              <div className="" key={movie.id}>
                <ListItemCard list={movie} className={"rounded-lg"} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
