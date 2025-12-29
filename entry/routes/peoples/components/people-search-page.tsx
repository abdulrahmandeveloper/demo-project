"use client";

import PeopleSearchFilters from "./people-search-filters";
import { useEffect, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Separator } from "@/shared/components/ui/separator";
import PersonInfoCard from "./person-info-card";
import PaginationContainer from "@/shared/components/custom-ui/containers/pagination-container";
import { getPeopleSearchResultsFromTMDB } from "../services/people.service";
import { TMDBPeopleData } from "../interfaces/people.interface";

const PeopleSearchPage = () => {
  const [queryContainer, setQueryContainer] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<TMDBPeopleData[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [queryParameters, setQueryParameters] = useState({
    gender: 0,
    department: "",
    nationality: "",
  });

  console.log("queryParameters: ", queryParameters);

  useEffect(() => {
    const fetchData = async () => {
      if (!queryContainer) return;
      setLoading(true);
      const data = await getPeopleSearchResultsFromTMDB(
        queryContainer,
        currentPage,
        queryParameters
      );

      if (!data) {
        return null;
      }
      setResults(data.results);
      setPages(data.total_pages ?? 1);
      setCurrentPage(data.page);
      setLoading(false);
      return data;
    };

    fetchData();
  }, [queryContainer, setQueryContainer, currentPage, queryParameters]);

  const hasResults: boolean = Boolean(results && results.length > 0);

  const handleSearchInput = (value: string) => {
    setQuery(value);
  };

  const handleSearchButtonClick = () => {
    setQueryContainer(query);
  };

  return (
    <div className=" w-9/10 mx-auto my-5">
      <div className="flex gap-5  ">
        <Input
          placeholder="Search for someone. ex Hans zim..."
          value={query}
          onChange={(e) => handleSearchInput(e.target.value)}
        />
        <Button className="cursor-pointer" onClick={handleSearchButtonClick}>
          <FaSearch className="h-4 w-4" />
          {loading ? "Searching..." : "Search"}
        </Button>
        <div className="">
          <PeopleSearchFilters
            queryParameters={queryParameters}
            setQueryParameters={setQueryParameters}
          />
        </div>{" "}
      </div>
      <Separator className="my-5" />

      <div className="">
        {hasResults && !loading && (
          <h1 className="font-semibold text-2xl">Results</h1>
        )}
        <div>
          {" "}
          {loading ? (
            <p className="text-2xl font-semibold mx-auto h-[50vh] flex items-center justify-center">
              Loading Search Results...
            </p>
          ) : hasResults && results?.length > 0 ? (
            <div className="my-5 grid lg:grid-cols-6 gap-4 mx-auto">
              {results?.map((person) => (
                <div key={person.id}>
                  <PersonInfoCard
                    containerClassName={""}
                    personImage={person.profile_path}
                    name={person.name}
                    originalName={person.original_name}
                    gender={person.gender}
                    role={person.known_for_department}
                    popular={person.popularity}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="opacity-60 mx-auto h-[50vh] flex items-center justify-center">
              No matching results for your search!
            </p>
          )}
        </div>
        {hasResults && !loading && (
          <PaginationContainer
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default PeopleSearchPage;
