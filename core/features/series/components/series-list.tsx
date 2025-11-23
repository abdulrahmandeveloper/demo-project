"use client";

import { getSeriesListFromTmdb } from "@/features/series/services/tmdb.service";
import ListCard from "@/shared/components/card/list-item-card";
import Filters from "@/modules/filters/components/filters";
import Navbar from "@/shared/components/navigation/navbar";
import Pagination from "@/shared/components/custom-ui/containers/pagination-container";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import { useEffect, useState } from "react";

const SeriesList = () => {
  const [lists, setLists] = useState<[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const handleListsRequest = async () => {
      const listsData = await getSeriesListFromTmdb(currentPage);

      if (!listsData) {
        return;
      }
      setLists(listsData.results);
      setCurrentPage(listsData.page);
      setPages(listsData.total_pages);
    };

    handleListsRequest();
  }, [currentPage]);

  return (
    <div className="">
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={true}
      />
      <div className="my-6">
        <div className="w-3/4 mx-auto ">
          <div className="flex ">
            <label htmlFor="" className="font-bold text-2xl">
              Series
            </label>
            <div className="w-2/3 ml-auto">
              <Filters references={{ setLists, setPages, setCurrentPage }} />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-8 py-5">
            {lists.length > 0 &&
              lists.map((list, index) => (
                <div key={index}>
                  <ListCard list={list} className="rounded-lg " />
                </div>
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
