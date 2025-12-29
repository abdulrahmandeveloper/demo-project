"use client";

import { useSearch } from "@/shared/hooks/useSearch";
import PeopleSearchFilters from "./people-search-filters";
import { useEffect, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Separator } from "@/shared/components/ui/separator";
import PersonInfoCard from "./person-info-card";
import PaginationContainer from "@/shared/components/custom-ui/containers/pagination-container";
import { getPeopleSearchResultsFromTMDB } from "../services/people.service";

const PeopleSearchPage = () => {
  const { query, setQuery, results, handleSearchInput, loading, hasResults } =
    useSearch("people");
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const handlePaginationData = async () => {
      const data = await getPeopleSearchResultsFromTMDB(query, currentPage);
      if (!data) {
        return null;
      }

      return data;
    };

    handlePaginationData();
  }, []);

  return (
    <div className=" w-9/10 mx-auto my-5">
      <div className="flex gap-5  ">
        <Input
          placeholder="Search for someone. ex Hans zim..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="cursor-pointer">
          <FaSearch className="h-4 w-4" />
          Search
        </Button>
        <div className="">
          <PeopleSearchFilters />
        </div>{" "}
      </div>
      <Separator className="my-5" />

      <div className="">
        <h1 className="font-semibold text-2xl">Results</h1>
        <div>
          {" "}
          {loading && <>Loading</>}
          {hasResults && results?.people?.results.length > 0 ? (
            <div className="my-5 grid grid-cols-5 gap-4">
              {results.people?.results.map((person) => (
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
        {hasResults && (
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
