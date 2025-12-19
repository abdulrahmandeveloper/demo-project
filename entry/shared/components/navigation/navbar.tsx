"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import "react-icons";
import { ModeToggle } from "entry/shared/utils/theme/theme-toggler";
import { useEffect, useState } from "react";
import { getSearchResultFromTMDB } from "entry/shared/services/tmdb/tmdb.service";
import SearchComponent from "@/shared/components/search/search";
import { QueryResultsResponseData } from "@/shared/interfaces/search.interface";
import { NavbarLinks } from "@/shared/interfaces/navigation.interface";

type NavbarProps = {
  logoPath: string;
  links: NavbarLinks[];
  search: boolean;
  className?: string;
};

const Navbar = ({ logoPath, links, search, className }: NavbarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<QueryResultsResponseData>({
    movies: [],
    series: [],
  });
  const [open, setOpen] = useState<boolean>(false);
  console.log(results);

  const handleSearchData = async () => {
    const data = await getSearchResultFromTMDB(query);

    if (!data) {
      return null;
    }
    setResults(data);
    return data;
  };

  const handleSearchInput = (e: string) => {
    if (!e) {
      setOpen(false);
      return;
    }
    setOpen(!!e);
    setQuery(e);
    handleSearchData();
  };

  const hasResults: boolean = Boolean(
    (results.movies && results.movies.length > 0) ||
      (results.series && results.series.length > 0)
  );

  useEffect(() => {});

  return (
    <div className="grid grid-cols-3 bg-transparent/95 backdrop-blur-xs hover:backdrop-blur-lg transition-all duration-300  shadow-sm h-16">
      <div className="flex items-center justify-center">
        {" "}
        <Link href={"/"}>
          {" "}
          <Image
            src={logoPath}
            alt="logo"
            className="rounded-2xl h-10 w-10"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div
        className={`   flex  gap-28 items-center justify-center  ${className}`}
      >
        <div className="flex gap-5 items-center  w-[550]  justify-between">
          {links.map((link, key) => {
            if ("element" in link) {
              return <div key={key}>{link.element}</div>;
            }

            return (
              <Link
                key={link.name}
                href={link.path}
                className="text-white opacity-50 hover:opacity-100 font-bold cursor-pointer"
              >
                {link.name}
              </Link>
            );
          })}

          {search && (
            <SearchComponent
              query={query}
              searchResult={results}
              hasResults={hasResults}
              open={open}
              setOpen={setOpen}
              mediaType="any"
            />
          )}
        </div>
      </div>
      <div className="flex justify-end m-auto gap-5">
        <ModeToggle />
        <User color="white" className=" cursor-pointer m-auto size-9" />
      </div>
    </div>
  );
};

export default Navbar;
