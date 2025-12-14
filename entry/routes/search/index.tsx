"use client";

import { TMDBMovieResponse } from "@/features/movie/interfaces/tmdb.interface";
import { getMovieSearchResultsFromTMDB } from "@/features/movie/services/tmdb.service";
import { TMDBSeriesResponse } from "@/features/series/interfaces/tmdb.interface";
import { getSeriesSearchResultsFromTMDB } from "@/features/series/services/tmdb.service";
import Navbar from "@/shared/components/navigation/navbar";
import SearchComponent from "@/shared/components/search/search";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import { useSearchQueryData } from "@/shared/stores/searchQueryStore";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const query = useSearchQueryData((query) => query.query);
  const [movieList, setMovieList] = useState<TMDBMovieResponse[]>([]);
  const [seriesList, setSeriesList] = useState<TMDBSeriesResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const movieListData = await getMovieSearchResultsFromTMDB(query);
      const seriesListData = await getSeriesSearchResultsFromTMDB(query);

      if (movieListData) {
        setMovieList(movieListData.results);
      }
      if (seriesListData) {
        setSeriesList(seriesListData.results);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <div className="w-4/5 mx-auto my-10">
        <h1 className="font-bold text-3xl">Search Results:</h1>
      </div>
    </div>
  );
};

export default SearchPage;
// <SearchComponent />
