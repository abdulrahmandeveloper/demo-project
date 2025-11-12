"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import "react-icons";
import { ModeToggle } from "@/shared/lib/utils/theme/theme-toggler";
import { useEffect, useState } from "react";
import { getSearchResultFromTMDB } from "@/shared/services/tmdb/tmdb.service";
import SearchComponent from "./search";
import { queryResultsResponseData } from "@/shared/interfaces/search";

type NavbarProps = {
  logoPath: string;
  links: { name: string; path: string }[];
  search: boolean;
  className?: string;
};

// for blurness backdrop-blur-sm

const Navbar = ({ logoPath, links, search, className }: NavbarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<queryResultsResponseData>({
    movies: [],
    serieses: [],
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleSearchData = async () => {
    const data = await getSearchResultFromTMDB(query);

    if (!data) {
      return null;
    }
    setResults(data);
    return data;
  };

  const handleSearchInput = (e) => {
    if (!e) {
      setOpen(false);
      return;
    }
    setOpen(!!e);
    setQuery(e);
    handleSearchData();
  };

  const hasResults =
    results &&
    ((results.movies && results.movies.length > 0) ||
      (results.serieses && results.serieses.length > 0));

  useEffect(() => {});
  return (
    <div className="grid grid-cols-3 bg-transparent hover:backdrop-blur-md transition-all duration-300 ease-in-out shadow-sm h-16">
      <div className="flex items-center justify-center">
        {" "}
        <Image
          src={logoPath}
          alt="logo"
          className="rounded-3xl "
          width={50}
          height={50}
        />
      </div>
      <div
        className={`   flex  gap-28 items-center justify-center  ${className}`}
      >
        <div className="flex gap-5 items-center  w-[550]  justify-between">
          {links.map((link) => (
            <Link
              className="text-white opacity-50 hover:opacity-100 font-bold "
              key={link.name}
              href={link.path}
            >
              {link.name}
            </Link>
          ))}

          {search && (
            <SearchComponent
              query={query}
              results={results}
              hasResults={hasResults}
              open={open}
              setOpen={setOpen}
              handleSearchInput={handleSearchInput}
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
