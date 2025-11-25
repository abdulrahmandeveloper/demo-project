"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import FilterSelection from "@/shared/components/custom-ui/containers/filter-selection-container";
import {
  tmdbTvContentRatings,
  tmdbTvGenres,
  tmdbTvRuntimeFilters,
  tmdbTvYearsRange,
} from "@/features/series/constants/tmdb.constants.ts";
import { getSeriesDiscoveryFromTMDB } from "@/modules/filters/services/filter.service";
import { Button } from "@/shared/components/ui/button";
import SearchComponent from "@/modules/search/components/search";
import { getSeriesSearchResultsFromTMDB } from "@/features/series/services/tmdb.service";
import { TMDBMediaResponse } from "@/shared/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";
import { getMoviesDiscoveryFromTmdb } from "@/features/movie/services/tmdb.service";
import {
  tmdbMovieContentRatings,
  tmdbMovieGenres,
  tmdbMovieRuntimeFilters,
  tmdbMovieYearsRange,
} from "@/features/movie/constants/tmdb.constants";
import {
  tmdbCountryCodes,
  tmdbRating,
} from "@/shared/constants/tmdb.constants";
import { log } from "console";

type FiltersProps<T> = {
  references: {
    setList: Dispatch<SetStateAction<T[]>>;
    setPages: Dispatch<SetStateAction<number>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    currentPage: number;
    setRefetchContent: Dispatch<SetStateAction<boolean>>;
    setHasFiltersSelected: Dispatch<SetStateAction<boolean>>;
    mediaType: "movie" | "tv";
  };
};

const Filters = ({ references }: FiltersProps<T>) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [length, setLength] = useState<number | null>(null);
  const [popular, setPopular] = useState<string>("");
  const [age, setAge] = useState<string>("");

  //search states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] =
    useState<TMDBMediaResponse<TMDBSeriesResponse> | null>(null);
  const [searchOpenModal, setSearchOpenModal] = useState<boolean>(false);
  const [searchHasResults, setSearchHasResults] = useState<boolean>(false);

  //destructuring references
  const {
    currentPage,
    setList,
    setPages,
    setCurrentPage,
    setRefetchContent,
    setHasFiltersSelected,
    mediaType,
  } = references;

  // determinig values objects
  const selectionOptions =
    mediaType === "tv"
      ? {
          tmdbCountryCodes: tmdbCountryCodes,
          tmdbRating: tmdbRating,
          tmdbGenre: tmdbTvGenres,
          tmdbRuntimeFilters: tmdbTvRuntimeFilters,
          tmdbYearsRange: tmdbTvYearsRange,
          tmdbContentRatings: tmdbTvContentRatings,
        }
      : {
          tmdbCountryCodes: tmdbCountryCodes,
          tmdbRating: tmdbRating,
          tmdbGenre: tmdbMovieGenres,
          tmdbRuntimeFilters: tmdbMovieRuntimeFilters,
          tmdbYearsRange: tmdbMovieYearsRange,
          tmdbContentRatings: tmdbMovieContentRatings,
        };

  const queryObject = {
    language: selectedLanguage,
    vote_average: rating,
    sort_by: popular,
    with_genres: genre,
    with_runtime: length,
    ...(age && { certification_country: "US" }),
    "certification.lte": age,
    first_air_date_year: year,
  };

  const queries = Object.entries(queryObject)
    .filter(
      ([, value]) => value !== undefined && value !== "" && value !== null
    )
    .map(([key, value]) =>
      key === "vote_average"
        ? rating
        : key === "with_runtime"
        ? length
        : key === "first_air_date_year"
        ? year
        : `${key}=${value}`
    )
    .join("&");

  console.log("queries in filter: ", queries);

  const queriesRef = useRef(queries ? queries : null);

  useEffect(() => {
    console.log("queries ref:", queriesRef.current);

    const fetchFilterData = async () => {
      if (queriesRef.current === null && (!queries || queries.length === 0)) {
        console.log("inside first if which will throw the user out.");

        //setRefetchContent(true);
        return;
      } else {
        let data;
        if (mediaType === "tv") {
          data = await getSeriesDiscoveryFromTMDB(queries, currentPage);
        } else if (mediaType === "movie") {
          console.log("inside movie discovery");

          data = await getMoviesDiscoveryFromTmdb(queries, currentPage);
        }

        if (!data) return;

        setList(data.results);
        setPages(data.total_pages);

        //check if queries have changed
        if (queriesRef.current !== queries) {
          setCurrentPage(1);
          queriesRef.current = queries;
        } else {
          setCurrentPage(data.page);
        }
      }
    };

    fetchFilterData();
  }, [queries, currentPage, setPages]);

  const handleRemoveFilters = () => {
    setSelectedLanguage("");
    setYear("");
    setRating(null);
    setGenre(null);
    setLength(null);
    setPopular("");
    setAge("");
    setRefetchContent(true);
    setCurrentPage(1);
    setHasFiltersSelected(false);
  };

  const handleSeachInput = async (value: string) => {
    if (!value) return;
    setSearchQuery(value);
    setSearchOpenModal(!!searchOpenModal);

    const data = await getSeriesSearchResultsFromTMDB(value);

    if (!data) {
      setSearchResults(null);
      return;
    }
    setSearchResults(data);
    const hasResults: boolean = data && data.results && data.results.length > 0;
    setSearchHasResults(hasResults);
  };

  return (
    <div className="">
      <div className="gap-5 flex mx-auto object-cover">
        <div className="">
          <SearchComponent
            query={searchQuery}
            searchResult={{ series: searchResults?.results || [] }}
            hasResults={searchHasResults}
            open={searchOpenModal}
            setOpen={setSearchOpenModal}
            onSearchInput={handleSeachInput}
          />
        </div>
        {queries.length > 1 && (
          <Button className="cursor-pointer" onClick={handleRemoveFilters}>
            Remove filters
          </Button>
        )}
        <FilterSelection
          placeHolder={"Language by"}
          values={selectionOptions.tmdbCountryCodes}
          value={selectedLanguage}
          setValues={setSelectedLanguage}
        />
        <FilterSelection
          placeHolder={"Rating"}
          values={selectionOptions?.tmdbRating}
          value={rating}
          setValues={setRating}
        />
        <FilterSelection
          placeHolder={"Popularity"}
          values={[
            { value: "popularity.desc", name: "Most popular" },
            { value: "popularity.asc", name: "Least popular" },
          ]}
          value={popular}
          setValues={setPopular}
        />
        <FilterSelection
          placeHolder={"Genre"}
          values={selectionOptions?.tmdbGenre}
          value={genre}
          setValues={setGenre}
        />
        <FilterSelection
          placeHolder={"year"}
          values={selectionOptions?.tmdbYearsRange}
          value={year}
          setValues={setYear}
        />
        <FilterSelection
          placeHolder={"Length"}
          values={selectionOptions?.tmdbRuntimeFilters}
          value={length}
          setValues={setLength}
        />
        <FilterSelection
          placeHolder={"Age"}
          values={selectionOptions?.tmdbContentRatings}
          value={age}
          setValues={setAge}
        />
      </div>
    </div>
  );
};

export default Filters;
