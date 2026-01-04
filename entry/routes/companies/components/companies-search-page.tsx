"use client";

import FilterSelection from "@/shared/components/custom-ui/containers/filter-selection-container";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { SetStateAction, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import {
  CompaniesRankingMetric,
  popularityMetric,
} from "../constants/companies.constants";
import { COUNTRY_FILTERS } from "@/routes/news/constants/news.constants";
import { tmdbApi } from "@/shared/lib/axios/axios";
import { getCompaniesSearchResultsFromTMDB } from "../services/company.service";
import { CompanySearchResultsFromTMDBResponse } from "../interfaces/company.interface";
import { Accordion } from "@/shared/components/ui/accordion";
import { Spinner } from "@/shared/components/ui/spinner";
import { Separator } from "@/shared/components/ui/separator";
import CompanyCard from "./company-card";
import PaginationContainer from "@/shared/components/custom-ui/containers/pagination-container";
import { toast } from "sonner";

const CompaniesSearchPage = () => {
  //search specific state
  const [query, setQuery] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [results, setResults] = useState<
    CompanySearchResultsFromTMDBResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  //pagination states
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log("query: ", query);
  console.log("value: ", value);

  console.log("results: ", results);

  //filter specific state
  const [popularCompanies, setPopularCompanies] = useState();
  const [companiesByCountry, setCompaniesByCountry] = useState();
  const [companiesByVoteRank, setCompaniesByVoteRank] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setLoading(true);
      const queryResponse = await getCompaniesSearchResultsFromTMDB(
        value,
        currentPage
      );

      if (queryResponse.results) {
        setResults(queryResponse.results);
        setTotalPages(queryResponse.total_pages);
        setCurrentPage(queryResponse.page);
      }
      setLoading(false);
    };

    fetchData();
  }, [value, currentPage]);

  const handleInputValueChange = (query: string) => {
    console.log(query);

    setQuery(query);
  };

  const handleSearchButtonClick = (query: string) => {
    console.log(query);
    if (query.trim().length < 1) {
      toast.error("Search Input Cannot Be Empty!");
      return;
    }
    setValue(query);
  };

  return (
    <div className="w-9/10 mx-auto">
      <div className="flex w-full my-10">
        <div className="w-3/5 flex gap-5">
          <Input
            placeholder="Search for a company..."
            type="search"
            value={query}
            onChange={(e) => handleInputValueChange(e.target.value)}
            disabled={loading}
          />
          <Button
            onClick={() => handleSearchButtonClick(query)}
            className="cursor-pointer"
            variant={"outline"}
            disabled={loading}
          >
            <IoIosSearch />
            Search
          </Button>
        </div>
        <div className="flex mx-auto gap-5">
          <FilterSelection
            placeHolder={"Popular"}
            values={popularityMetric}
            value={popularCompanies}
            setValues={setPopularCompanies}
          />
          <FilterSelection
            placeHolder={"Country"}
            values={COUNTRY_FILTERS}
            value={companiesByCountry}
            setValues={setCompaniesByCountry}
          />
          <FilterSelection
            placeHolder={"Rank"}
            values={CompaniesRankingMetric}
            value={companiesByVoteRank}
            setValues={setCompaniesByVoteRank}
          />
        </div>
      </div>
      <div className="">
        {loading && (
          <p className="h-[50vh] opacity-70 font-semibold text-2xl font-sans flex items-center justify-center">
            <Spinner className="mx-3 text-2xl font-semibold" /> Loading...
          </p>
        )}
        {results.length > 0 && loading === false ? (
          <div className="my-5">
            <h1 className="my-2 text-3xl font-bold font-sans ml-5">Results</h1>
            <div className=" mx-5 my-5">
              <Separator />
            </div>
            <div className="grid grid-cols-5 gap-4">
              {results.map((company) => (
                <div key={company.id}>
                  <CompanyCard company={company} isSearchCard={true} />
                </div>
              ))}
            </div>
          </div>
        ) : loading === false && value.length === 0 && results.length == 0 ? (
          <div>
            <p className="flex items-center justify-center h-[50vh] opacity-50 text-xl font-semibold font-serif">
              Write something in the input field to start exploring!
            </p>
          </div>
        ) : (
          loading === false &&
          value.length > 0 &&
          results.length === 0 && (
            <div>
              <p className="text-2xl font-serif h-[50vh] opacity-60 flex items-center justify-center">
                No Search Results Match Your Query!
              </p>
            </div>
          )
        )}
      </div>
      <div className="w-2/3 mx-auto my-5">
        <Separator />
      </div>
      {results.length > 0 && (
        <div className="my-5">
          <PaginationContainer
            pages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default CompaniesSearchPage;
