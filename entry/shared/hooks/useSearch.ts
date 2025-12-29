import { useEffect, useState } from "react";
import { QueryResultsResponseData } from "../interfaces/search.interface";
import { getSearchResultFromTMDB } from "../services/tmdb/tmdb.service";
import { useSearchQueryData } from "../stores/searchQueryStore";
import { getPeopleSearchResultsFromTMDB } from "@/routes/peoples/services/people.service";

export const useSearch = (contentType: "people" | "tv") => {
  const query = useSearchQueryData((state) => state.query);
  const setQuery = useSearchQueryData((state) => state.setQuery);
  const [delayedSearchQuery, setDelayedSearchQuery] = useState<string>("");
  const [results, setResults] = useState<QueryResultsResponseData>({
    movies: [],
    series: [],
    people: [],
  });
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    const timer = setTimeout(() => {
      setLoading(true);

      setDelayedSearchQuery(query);
    }, 800);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!delayedSearchQuery) return;

    const handleSearchData = async () => {
      if (contentType === "people") {
        const data = await getPeopleSearchResultsFromTMDB(delayedSearchQuery);

        if (!data) {
          return null;
        }
        setResults({ people: data.results });
        setLoading(false);
        return data;
      } else {
        const data = await getSearchResultFromTMDB(delayedSearchQuery);

        if (!data) {
          return null;
        }
        setResults(data);
        setLoading(false);
        return data;
      }
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
      (results.series && results.series.length > 0) ||
      (results.people && results.people.length > 0)
  );

  return {
    query,
    setQuery,
    results,
    open,
    setOpen,
    handleSearchInput,
    loading,
    hasResults,
  };
};
