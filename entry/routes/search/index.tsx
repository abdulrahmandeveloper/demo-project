"use client";

import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import {
  getMoviesDiscoveryFromTmdb,
  getMovieSearchResultsFromTMDB,
} from "@/features/movie/services/tmdb.service";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";
import { getSeriesSearchResultsFromTMDB } from "@/features/series/services/tmdb.service";
import ListItemCard from "@/shared/components/card/list-item-card";
import DropdownContainer from "@/shared/components/custom-ui/containers/dropdown-container";
import PaginationContainer from "@/shared/components/custom-ui/containers/pagination-container";
import Filters from "@/shared/components/filter/filters";
import Navbar from "@/shared/components/navigation/navbar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Spinner } from "@/shared/components/ui/spinner";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import { getSeriesDiscoveryFromTMDB } from "@/shared/services/tmdb/tmdb.series.service";
import { useSearchQueryData } from "@/shared/stores/searchQueryStore";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

const SearchPage = () => {
  const query = useSearchQueryData((query) => query.query);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [movieList, setMovieList] = useState<TMDBMovieResponse[]>([]);
  const [seriesList, setSeriesList] = useState<TMDBSeriesResponse[]>([]);
  const [mediaType, setMediaType] = useState<"movie" | "series">("movie");
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasFiltersSelected, setHasFiltersSelected] = useState<boolean>(false);

  useEffect(() => {
    if (query.trim()) {
      setInputValue(query);
      setSearchValue(query);
      setIsSearching(true);
    }
  }, []);

  useEffect(() => {
    if (hasFiltersSelected) return;
    const fetchSearchResults = async () => {
      if (!searchValue) {
        setIsSearching(false);
        return;
      }
      setLoading(true);

      try {
        if (mediaType === "movie") {
          const movieListData = await getMovieSearchResultsFromTMDB(
            searchValue,
            currentPage
          );
          if (movieListData) {
            //empty series data
            setSeriesList([]);
            //set new data
            setMovieList(movieListData.results);
            setPages(movieListData.total_pages);
          }
        }

        if (mediaType === "series") {
          const seriesListData = await getSeriesSearchResultsFromTMDB(
            searchValue,
            currentPage
          );

          if (seriesListData) {
            //empty movie data
            setMovieList([]);
            //set new data
            setSeriesList(seriesListData.results);
            setPages(seriesListData.total_pages);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [mediaType, currentPage, searchValue, hasFiltersSelected]);

  const handleSearchClick = () => {
    if (!inputValue.trim()) {
      toast.error("Please Write something in the search bar!", {
        action: {
          label: "OK",
          onClick: () => "void",
        },
      });
      return;
    }

    setSearchValue(inputValue);
    setCurrentPage(1);
    setIsSearching(true);
  };

  const handleMediaType = (value: "movie" | "series") => {
    setMediaType(value);
    setCurrentPage(1);
  };

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
  };

  const resultsList = mediaType === "movie" ? movieList : seriesList;
  const filterPropsList = mediaType === "movie" ? setMovieList : setSeriesList;
  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <div className="w-3/4 mx-auto my-10">
        <div className="w-9/10 mx-auto my-6  flex flex-col gap-5">
          <div className="flex">
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
            <Filters
              references={{
                setList: filterPropsList,
                setPages: setPages,
                setCurrentPage: setCurrentPage,
                currentPage: currentPage,
                setRefetchContent: setIsSearching,
                setHasFiltersSelected: setHasFiltersSelected,
                mediaType: mediaType,
                searchInput: false,
              }}
            />
          </div>
        </div>
        <div className="">
          <h1 className="font-bold text-3xl">{`Search Results for: ${searchValue}`}</h1>
          {loading === true ? (
            <div className="flex justify-center items-center h-[50vh] text-xl">
              <Spinner className="mx-4 " /> Searching for results...
            </div>
          ) : (
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
          )}
        </div>
        {loading === true ? null : resultsList.length > 0 ? (
          <div className="">
            <PaginationContainer
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : isSearching === true &&
          inputValue.length > 0 &&
          resultsList.length === 0 ? (
          <div className="flex flex-col gap-2 justify-center items-center h-[50vh]  text-2xl ">
            <p className="">{`Sorry! there is no results for your search: ${searchValue}`}</p>
            <p className="opacity-60 text-xl">
              {" "}
              Try different keywords or change the media type
            </p>
          </div>
        ) : (
          <p className="flex justify-center items-center h-[50vh] text-xl text-gray-500">
            Search for something to see the results
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
