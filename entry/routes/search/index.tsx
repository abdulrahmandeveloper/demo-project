"use client";

import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { getMovieSearchResultsFromTMDB } from "@/features/movie/services/tmdb.service";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";
import { getSeriesSearchResultsFromTMDB } from "@/features/series/services/tmdb.service";
import ListItemCard from "@/shared/components/card/list-item-card";
import DropdownContainer from "@/shared/components/custom-ui/containers/dropdown-container";
import PaginationContainer from "@/shared/components/custom-ui/containers/pagination-container";
import Navbar from "@/shared/components/navigation/navbar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import { useSearchQueryData } from "@/shared/stores/searchQueryStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const query = useSearchQueryData((query) => query.query);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [movieList, setMovieList] = useState<TMDBMovieResponse[]>([]);
  const [seriesList, setSeriesList] = useState<TMDBSeriesResponse[]>([]);
  const [mediaType, setMediaType] = useState<"movie" | "series">("movie");
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log("movieList: ", movieList);
  console.log("seriesList: ", seriesList);
  console.log("inputValue: ", inputValue);
  console.log("searchValue: ", searchValue);
  console.log("currentPage: ", currentPage);

  useEffect(() => {
    if (query.trim()) {
      setInputValue(query);
      setSearchValue(query);
    }
  }, [query]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!inputValue) return;
      console.log("after query logic,media type: ", mediaType);

      if (mediaType === "movie") {
        const movieListData = await getMovieSearchResultsFromTMDB(searchValue);
        if (movieListData) {
          setMovieList(movieListData.results);
          setPages(movieListData.total_pages);
        }
      }

      if (mediaType === "series") {
        const seriesListData = await getSeriesSearchResultsFromTMDB(
          searchValue
        );

        if (seriesListData) {
          setSeriesList(seriesListData.results);
          setPages(seriesListData.total_pages);
        }
      }
    };

    fetchSearchResults();
  }, [mediaType, currentPage, searchValue]);

  const handleSearchClick = () => {
    if (!inputValue.trim()) return;
    setSearchValue(inputValue);
    setCurrentPage(1);
  };

  const handleMediaType = (value: "movie" | "series") => {
    setMediaType(value);
  };

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
  };

  const resultsList = mediaType === "movie" ? movieList : seriesList;

  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <div className="w-3/4 mx-auto my-10">
        <div className="w-9/10 mx-auto my-6  flex">
          {/**
           * input field for searching anything
           */}
          <Input
            value={inputValue}
            onChange={(e) => handleInputValueChange(e.target.value)}
            type="text"
            placeholder="Search..."
            className="py-5"
          />
          <Button
            onClick={handleSearchClick}
            className="mx-5 py-5 cursor-pointer"
          >
            Search
          </Button>
          <DropdownContainer
            placeholder={"Type"}
            label={"Media"}
            items={["movie", "series"]}
            triggerClassName={"py-5"}
            selectMedia={handleMediaType}
          />
        </div>
        <div className="">
          <h1 className="font-bold text-3xl">Search Results:</h1>
          <div className="grid grid-cols-5 gap-3 mx-auto py-5 px-1">
            {resultsList.length > 0 &&
              resultsList.map((item) => {
                if (mediaType === "movie") {
                  return (
                    <div key={item.id}>
                      <Link href={`/movies/${item.id}`}>
                        {" "}
                        <ListItemCard list={item} className={"rounded-lg"} />
                      </Link>
                    </div>
                  );
                } else if (mediaType === "series") {
                  return (
                    <div key={item.id}>
                      <Link href={`/series/${item.id}`}>
                        {" "}
                        <ListItemCard list={item} className={"rounded-lg"} />
                      </Link>
                    </div>
                  );
                }
              })}
          </div>
        </div>
        {resultsList.length > 0 && (
          <div className="">
            <PaginationContainer
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
