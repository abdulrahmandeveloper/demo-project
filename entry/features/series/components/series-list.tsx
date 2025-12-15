"use client";

import { getSeriesListFromTmdb } from "entry/features/series/services/tmdb.service";
import ListItemCard from "entry/shared/components/card/list-item-card";
import Filters from "@/shared/components/filter/filters";
import Navbar from "entry/shared/components/navigation/navbar";
import Pagination from "entry/shared/components/custom-ui/containers/pagination-container";
import { navbarLinks } from "entry/shared/constants/navbar-links.constants";
import { useEffect, useState } from "react";
import { TMDBSeriesResponse } from "../interfaces/tmdb.interface";
import Link from "next/link";

const SeriesList = () => {
  const [list, setList] = useState<TMDBSeriesResponse[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasFiltersSelected, setHasFiltersSelected] = useState<boolean>(false);
  const [refetchContent, setRefetchContent] = useState<boolean>(true);

  useEffect(() => {
    const handleListsRequest = async () => {
      const listsData = await getSeriesListFromTmdb(currentPage);

      if (!listsData) {
        return;
      }
      if (!hasFiltersSelected) {
        setList(listsData.results);
        setCurrentPage(listsData.page);
        setPages(listsData.total_pages);
      }
    };

    handleListsRequest();
  }, [currentPage, refetchContent]);

  return (
    <div className="">
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <div className="p-8">
        <div className="w-3/4 mx-auto ">
          <div className="flex ">
            <label htmlFor="" className="font-bold text-2xl">
              Discover Top Series
            </label>
            <div className="w-2/3 ml-auto">
              <div className="">
                <Filters
                  references={{
                    setList,
                    setPages,
                    setCurrentPage,
                    currentPage,
                    setRefetchContent,
                    setHasFiltersSelected,
                    mediaType: "series",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3 py-5 w-19/20 mx-auto">
            {list.length > 0 &&
              list.map((series, index) => (
                <Link key={index} href={`/series/${series.id}`}>
                  <ListItemCard list={series} className="rounded-lg " />
                </Link>
              ))}
          </div>{" "}
          <div className=" flex   justify-end">
            <Pagination
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesList;
