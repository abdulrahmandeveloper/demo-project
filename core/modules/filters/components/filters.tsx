"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterSelection from "@/shared/components/custom-ui/containers/selection-container";
import {
  tmdbContentRatings,
  tmdbCountryCodes,
  tmdbRating,
  tmdbRuntimeFilters,
  tmdbTvGenres,
  tmdbYearsRange,
} from "@/shared/constants/tmdb.constants.ts";
import { getSeriesDiscoveryFromTMDB } from "@/modules/filters/services/filter.service";
import { Button } from "@/shared/components/ui/button";

type FiltersProps = {
  references: {
    setLists: Dispatch<SetStateAction<[]>>;
    setPages: Dispatch<SetStateAction<number>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    currentPage: number;
    setRefetchContent: Dispatch<SetStateAction<boolean>>;
    setHasFiltersSelected: Dispatch<SetStateAction<boolean>>;
  };
};

const Filters = ({ references }: FiltersProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [genre, setGenre] = useState<string>("");
  const [length, setLength] = useState<number | null>(null);
  const [popular, setPopular] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const isFilterSelected: boolean =
    !!selectedLanguage ||
    !!year ||
    (rating !== null && rating > 0) ||
    !!genre ||
    (length !== null && length > 0) ||
    !!popular ||
    !!age;

  const queryObject = {
    language: selectedLanguage,
    vote_average: rating,
    sort_by: popular,
    with_genres: genre,
    with_runtime: length,
    certification_country: "US",
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

  const {
    currentPage,
    setLists,
    setPages,
    setCurrentPage,
    setRefetchContent,
    setHasFiltersSelected,
  } = references;

  useEffect(() => {
    const fetchFilterData = async () => {
      if (!isFilterSelected) return;

      if (!queries || queries.length === 0) return;

      const data = await getSeriesDiscoveryFromTMDB(queries, currentPage);

      if (!data) return;
      setLists(data.results);
      setPages(data.total_pages);
      setCurrentPage(data.page);
      setHasFiltersSelected((prev) => !prev);
    };

    fetchFilterData();
  }, [queries, isFilterSelected, currentPage]);

  const handleRemoveFilters = () => {
    setSelectedLanguage("");
    setYear("");
    setRating(null);
    setGenre("");
    setLength(null);
    setPopular("");
    setAge("");
    setRefetchContent((prev) => !prev);
    setCurrentPage(1);
    setHasFiltersSelected(false);
  };

  return (
    <div className="">
      <div className="gap-5 flex">
        {queries && (
          <Button className="cursor-pointer" onClick={handleRemoveFilters}>
            Remove filters
          </Button>
        )}
        <FilterSelection
          placeHolder={"Language by"}
          values={tmdbCountryCodes}
          setValues={setSelectedLanguage}
        />
        <FilterSelection
          placeHolder={"Rating"}
          values={tmdbRating}
          setValues={setRating}
        />
        <FilterSelection
          placeHolder={"Popularity"}
          values={[
            { value: "popularity.desc", name: "Most popular" },
            { value: "popularity.asc", name: "Least popular" },
          ]}
          setValues={setPopular}
        />
        <FilterSelection
          placeHolder={"Genre"}
          values={tmdbTvGenres}
          setValues={setGenre}
        />
        <FilterSelection
          placeHolder={"year"}
          values={tmdbYearsRange}
          setValues={setYear}
        />
        <FilterSelection
          placeHolder={"Length"}
          values={tmdbRuntimeFilters}
          setValues={setLength}
        />
        <FilterSelection
          placeHolder={"Age"}
          values={tmdbContentRatings}
          setValues={setAge}
        />
      </div>
    </div>
  );
};

export default Filters;
