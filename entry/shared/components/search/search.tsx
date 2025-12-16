"use client";

import { Input } from "entry/shared/components/ui/input";
import { Button } from "entry/shared/components/ui/button";
import PosterCard from "entry/shared/components/card/poster-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "entry/shared/components/ui/popover";
import { Search } from "lucide-react";
import { QueryResultsResponseData } from "@/shared/interfaces/search.interface";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useSearchQueryData } from "@/shared/stores/searchQueryStore";
import { useRouter } from "next/navigation";

type TMDBSearchResults = QueryResultsResponseData;

type SearchComponentProps = {
  query: string;
  searchResult: TMDBSearchResults;
  hasResults: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mediaType: "movie" | "series" | "any";
};

const SearchComponent = ({
  searchResult,
  hasResults,
  open,
  setOpen,
  mediaType,
}: SearchComponentProps) => {
  //destructuring results
  const { movies, series } = searchResult;
  //taking query using zustand
  const query = useSearchQueryData((state) => state.query);
  const setQuery = useSearchQueryData((state) => state.setQuery);

  const router = useRouter();

  const handleQueryChange = (e: any) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search`);
      setOpen(false);
    }
  };

  const handleClick = () => {
    if (!query.trim()) return;
    router.push(`/search`);
    setOpen(false);
  };

  return (
    <div className="relative ">
      <Popover open={open}>
        <PopoverTrigger asChild>
          <div className="flex relative">
            <Input
              type="text"
              aria-label="Search"
              className=" w-25 focus-within:w-40 transition-all duration-300 ease-in-out shadow-sm origin-right ml-auto border-none bg-white dark:bg-white dark:text-black"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpen(true)}
              onKeyDown={handleQueryChange}
            />
            <Button
              size={"icon"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500  w-4 h-4 bg-transparent cursor-pointer"
              onClick={handleClick}
            >
              <Link href={"/search"} className="cursor-pointer">
                {" "}
                <Search
                  aria-hidden="true"
                  className="text-black cursor-pointer"
                />
              </Link>
            </Button>
          </div>
        </PopoverTrigger>
        {open ? (
          <PopoverContent
            forceMount
            onPointerDownOutside={(e) => {
              const target = e.target as Element;
              if (!target.closest('input[aria-label="Search"]')) {
                setOpen(false);
              } else {
                e.preventDefault();
              }
            }}
            className={`w-64 p-2 max-h-60 overflow-y-auto space-y-2 transition-opacity duration-500 ${
              query && open ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            sideOffset={8}
          >
            {!query ||
              (!hasResults && (
                <p className="text-sm text-center text-gray-500">
                  No results found
                </p>
              ))}

            {/* Movies */}
            {(mediaType === "movie" || mediaType === "any") &&
              movies &&
              movies.length > 0 && (
                <>
                  <h4 className="text-sm font-semibold mb-1">Movies</h4>
                  {movies.slice(0, 10).map((movie, key) => (
                    <Link href={`/movies/${movie.id}`} key={key}>
                      <div
                        key={movie.id}
                        className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer dark:hover:bg-gray-800"
                      >
                        {" "}
                        <PosterCard
                          src={movie.poster_path}
                          className="w-8 h-12"
                        ></PosterCard>
                        <p className="text-sm">{movie.title}</p>
                      </div>
                    </Link>
                  ))}
                </>
              )}

            {/* Series */}
            {(mediaType === "tv" || mediaType === "any") &&
              series &&
              series?.length > 0 && (
                <>
                  <h4 className="text-sm font-semibold mt-2 mb-1">Series</h4>
                  {series.slice(0, 10).map((series, key) => (
                    <Link href={`/series/${series.id}`} key={key}>
                      <div
                        key={series.id}
                        className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer dark:hover:bg-gray-800"
                      >
                        {" "}
                        <PosterCard
                          src={series.poster_path}
                          className="w-8 h-12 "
                        ></PosterCard>
                        <p className="text-sm ">{series.name}</p>
                      </div>
                    </Link>
                  ))}
                </>
              )}
          </PopoverContent>
        ) : null}
      </Popover>
    </div>
  );
};

export default SearchComponent;

/* series?  .series*/
