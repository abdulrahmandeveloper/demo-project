"use client";

import React, { useEffect, useState } from "react";
import {
  getLatestPersonFromTmdb,
  getPopularPeopleFromTMDB,
  getTrendingPeopleFromTMDB,
} from "../services/people.service";
import {
  PersonDataFromTMDBResponse,
  TMDBPeopleData,
  TMDBTrendingPersonResponse,
} from "../interfaces/people.interface";
import PersonInfoCard from "./person-info-card";
import { Separator } from "@/shared/components/ui/separator";
import { Button } from "@/shared/components/ui/button";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import { IoMdRefresh } from "react-icons/io";
import PeopleMainPageSkeleton from "./skeletons/people-main-page-skeleton";

const PeoplesMainPage = () => {
  const [popularPeoples, setPopularPeoples] = useState<TMDBPeopleData[]>([]);
  const [trendingrPeoples, setTrendingPeoples] = useState<
    TMDBTrendingPersonResponse[]
  >([]);
  const [newestPerson, setNewestPerson] =
    useState<PersonDataFromTMDBResponse>();
  const [refreshNewestPerson, setRefreshNewestPerson] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const popularPeoplesData = await getPopularPeopleFromTMDB();
      const trendingPeoplesData = await getTrendingPeopleFromTMDB();

      if (popularPeoplesData) {
        setPopularPeoples(popularPeoplesData.results);
      }
      if (trendingPeoplesData) {
        setTrendingPeoples(trendingPeoplesData.results);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const latestPersonData = await getLatestPersonFromTmdb();

      if (latestPersonData) {
        setNewestPerson(latestPersonData);
      }
    };
    fetchData();
  }, [refreshNewestPerson]);

  const handleRefreshClick = () => {
    setRefreshNewestPerson(!refreshNewestPerson);
  };

  const titlesClassNames = "font-bold text-2xl mb-3";
  return (
    <>
      {loading && <PeopleMainPageSkeleton />}
      {!loading && popularPeoples.length > 0 && (
        <div className="w-9/10 mx-auto my-5">
          <div className="my-4">
            <h1 className={titlesClassNames}>
              Popular people In The Industry!
            </h1>
            <div className="flex overflow-auto gap-4">
              {popularPeoples.slice(0, 6).map((person) => (
                <div key={person.id}>
                  <PersonInfoCard
                    containerClassName={""}
                    personImage={person.profile_path}
                    name={person.name}
                    originalName={person.original_name}
                    gender={person.gender}
                    role={person.known_for_department}
                    popular={person.popularity}
                    knownFor={person.known_for}
                    id={person.id}
                  />
                </div>
              ))}
              <div className="flex items-center ">
                <Button className="bg-transparent dark:text-white opacity-80 hover:bg-accent cursor-pointer hover:underline-offset-8">
                  <Link
                    href={`/discover/people/search`}
                    className="flex items-center"
                  >
                    {" "}
                    View More <FaAngleRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-3" />

          <div className="my-4">
            <h1 className={titlesClassNames}>People Of The Day</h1>
            <div className="grid grid-cols-6 gap-4">
              {trendingrPeoples.slice(0, 11).map((person) => (
                <div key={person.id}>
                  <PersonInfoCard
                    containerClassName={""}
                    personImage={person.profile_path}
                    name={person.name}
                    id={person.id}
                    originalName={person.original_name}
                    gender={person.gender}
                    role={person.known_for_department}
                    popular={person.popularity}
                  />
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-3" />

          <div className="">
            <h1 className={titlesClassNames}>Newest Peoples!</h1>
            <div className="flex  bg-card justify-center border rounded-lg w-9/10 mx-auto py-5">
              <div className="flex gap-5 items-center mx-auto">
                <h2 className="">Name: {newestPerson?.name}</h2>
                <h2 className="">
                  Working In: {newestPerson?.known_for_department}
                </h2>
              </div>{" "}
              <Button
                className=" cursor-pointer mr-5"
                size={"sm"}
                onClick={handleRefreshClick}
              >
                <IoMdRefresh />
                Refresh
              </Button>
            </div>
          </div>
          <Separator className="my-3" />

          <div className="">
            <h1 className={titlesClassNames}>Interviews</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default PeoplesMainPage;

//flex overflow-x-auto  gap-4 my-4
