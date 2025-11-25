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
import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";

type FiltersProps<T extends TMDBMovieResponse | TMDBSeriesResponse> = {
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

const Filters = <T extends TMDBMovieResponse | TMDBSeriesResponse>({
  references,
}: FiltersProps<T>) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [length, setLength] = useState<number | null>(null);
  const [popular, setPopular] = useState<string>("");
  const [age, setAge] = useState<string>("");

  //search states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TMDBMediaResponse<
    TMDBSeriesResponse | TMDBMovieResponse
  > | null>(null);
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

  const queryObject: Record<string, string | number> = {};

  if (selectedLanguage) queryObject.language = selectedLanguage;
  if (year) queryObject.year = year;
  if (rating) queryObject["vote_average.gte"] = rating;
  if (genre) queryObject.with_genres = genre;
  if (length) queryObject.with_runtime = length;
  if (popular) queryObject.sort_by = popular;
  if (age) {
    queryObject["certification_country"] = "US";
    queryObject["certification.lte"] = age;
  }

  const queries = Object.entries(queryObject)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const queriesRef = useRef(queries ? queries : null);

  useEffect(() => {
    const fetchFilterData = async () => {
      if (!queries || queries.length === 0) {
        setHasFiltersSelected(false);
        setRefetchContent(true);
        return;
      } else {
        setHasFiltersSelected(true);
        let data;
        if (mediaType === "tv") {
          data = await getSeriesDiscoveryFromTMDB(queries, currentPage);
        } else if (mediaType === "movie") {
          data = await getMoviesDiscoveryFromTmdb(queries, currentPage);
        }

        if (!data) return;

        if (mediaType === "movie") {
          setList(data.results as TMDBMovieResponse[] as T[]);
        } else if (mediaType === "tv") {
          setList(data.results as TMDBSeriesResponse[] as T[]);
        }

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
  }, [queries, currentPage, mediaType]);

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
            searchResult={{
              series: searchResults?.results as TMDBSeriesResponse[] | [],
              movies: searchResults?.results as TMDBMovieResponse[] | [],
            }}
            hasResults={searchHasResults}
            open={searchOpenModal}
            setOpen={setSearchOpenModal}
            onSearchInput={handleSeachInput}
            mediaType={mediaType}
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
