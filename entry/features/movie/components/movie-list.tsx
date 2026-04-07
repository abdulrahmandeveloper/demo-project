"use client";

import { TMDBMovieResponse } from "entry/features/movie/interfaces/tmdb.interface";

import React, { useEffect, useState } from "react";
import { getMoviesTopRatedListFromTmdb } from "../services/tmdb.service";
import ListItemCard from "entry/shared/components/card/list-item-card";
import PaginationContainer from "entry/shared/components/custom-ui/containers/pagination-container";
import Filters from "@/shared/components/filter/filters";
import Link from "next/link";

const MoviesList = () => {
  const [list, setList] = useState<TMDBMovieResponse[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasFiltersSelected, setHasFiltersSelected] = useState<boolean>(false);
  const [refetchContent, setRefetchContent] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      if (hasFiltersSelected) return;

      const data = await getMoviesTopRatedListFromTmdb(currentPage);

      if (data) {
        setList(data.results);
        setPages(data.total_pages);
        setCurrentPage(data.page);
      }
    };

    fetchMovies();
  }, [currentPage, refetchContent, hasFiltersSelected]);

  return (
    <div className="w-3/4 mx-auto">
      <div className="p-8">
        <div className="flex  gap-28 items-center my-2 mr-auto">
          <h1 className="font-bold text-2xl">Discover Top Movies</h1>
          <div className="w-1/3">
            <Filters
              references={{
                setList,
                setPages,
                currentPage,
                setCurrentPage,
                setHasFiltersSelected,
                setRefetchContent,
                mediaType: "movie",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-5  mx-auto gap-3 py-5 px-1">
          {" "}
          {list.map((movie) => {
            return (
              <div className="" key={movie.id}>
                <Link href={`/movies/${movie.id}`}>
                  <ListItemCard list={movie} className={"rounded-lg"} />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="flex ml-auto justify-end py-3 px-12">
          <PaginationContainer
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
