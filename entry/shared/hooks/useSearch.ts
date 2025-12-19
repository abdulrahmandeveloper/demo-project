import { useEffect, useState } from "react";
import { QueryResultsResponseData } from "../interfaces/search.interface";
import { getSearchResultFromTMDB } from "../services/tmdb/tmdb.service";

export const useSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [delayedSearchQuery, setDelayedSearchQuery] = useState<string>("");
  const [results, setResults] = useState<QueryResultsResponseData>({
    movies: [],
    series: [],
  });
  const [open, setOpen] = useState<boolean>(false);
  console.log(results);

  useEffect(() => {
    if (!query) return;
    const timer = setTimeout(() => {
      setDelayedSearchQuery(query);
    }, 800);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!delayedSearchQuery) return;

    const handleSearchData = async () => {
      const data = await getSearchResultFromTMDB(delayedSearchQuery);

      if (!data) {
        return null;
      }
      setResults(data);
      return data;
    };
    handleSearchData();
  }, [delayedSearchQuery]);

  const handleSearchInput = (value: string) => {
    if (!value) {
      setOpen(false);
      return;
    }
    setOpen(!!value);
    setQuery(value);
  };

  const hasResults: boolean = Boolean(
    (results.movies && results.movies.length > 0) ||
      (results.series && results.series.length > 0)
  );

  return { query, results, open, setOpen, handleSearchInput, hasResults };
};
