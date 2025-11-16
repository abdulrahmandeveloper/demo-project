"ise client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterSelection from "./filter-selection";
import {
  tmdbContentRatings,
  tmdbCountryCodes,
  tmdbRating,
  tmdbRuntimeFilters,
  tmdbTvGenres,
  tmdbYearsRange,
} from "@/shared/lib/utils/constants/tmdb.constants.ts";
import { getSeriesDiscoveryFromTMDB } from "@/series/services/tmdb.service";

type FiltersProps = {
  references: {
    setLists: Dispatch<SetStateAction<[]>>;
    setPages: Dispatch<SetStateAction<number>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
  };
};

const Filters = ({ references }: FiltersProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [year, setYear] = useState();
  const [rating, setRating] = useState();
  const [genre, setGenre] = useState();
  const [length, setLength] = useState();
  const [popular, setPopular] = useState();
  const [age, setAge] = useState();

  console.log(age);

  const queryObject = {
    language: selectedLanguage,
    vote_average: rating,
    sort_by: popular,
    with_genres: genre,
    with_runtime: length,

    certification_country: "US",
    "certification.lte": age,
  };

  const queries = Object.entries(queryObject)
    .filter(
      ([_, value]) => value !== undefined && value !== "" && value !== null
    )
    .map(([key, value]) =>
      key === "vote_average"
        ? rating
        : key === "with_runtime"
        ? length
        : key === "first_air_dat"
        ? year
        : `${key}=${value}`
    )
    .join("&");

  useEffect(() => {
    const fetchFilterData = async () => {
      const data = await getSeriesDiscoveryFromTMDB(queries);

      console.log(data.results);

      if (!data) return;
      references.setLists(data.results);
      references.setPages(data.total_pages);
      references.setCurrentPage(data.page);
    };

    fetchFilterData();
  }, [selectedLanguage, year, rating, genre, length, popular, age]);

  return (
    <div className="">
      <div className="gap-5 flex">
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
