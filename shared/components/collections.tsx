"use client";

import React, { useEffect, useState } from "react";
import { getCollectionFromTMDB } from "@/shared/services/tmdb/tmdb.service";
import { collectionParts, collectionRespose } from "@/shared/interfaces/tmdb";
import PosterCard from "@/shared/components/card/poster-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

const ShowCollectionPartsPoster = ({ parts }: { parts: collectionParts[] }) => {
  if (!Array.isArray(parts) || parts.length === 0) {
    return <p>No Parts Posters to show</p>;
  }

  return (
    <div className="relative flex items-center justify-end">
      <div className="flex items-center justify-end gap-0 relative">
        {parts.map((part, index) => {
          if (!part.poster_path) return null;
          return (
            <div
              key={index}
              className={`relative transition-transform duration-700 ease-in-out hover:scale-125 hover:z-10 hover:w-28 ${
                index === 0 ? "" : "-ml-12"
              }`}
            >
              <div className="hover:w-28">
                <Tooltip>
                  <TooltipTrigger>
                    <PosterCard
                      src={part.poster_path}
                      className="w-28 h-44 rounded-md shadow-lg  hover:cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <h2 className="text-lg">{part.title}</h2>
                    <p className="">
                      {part.original_language === "en"
                        ? "English"
                        : part.original_language}{" "}
                    </p>
                    <p className="">Type: {part.media_type}</p>
                    <p>Rating: {part.vote_average}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Collections = () => {
  const [collections, setCollections] = useState<collectionRespose[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollectionFromTMDB();
      setCollections(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-3/5 mx-auto space-y-6 pb-6">
      {collections.map((collection, index) =>
        collection.id ? (
          <div key={index} className="w-full">
            <div className="my-3 flex items-center justify-between ">
              <div className="flex gap-4">
                <img
                  alt={collection.name}
                  src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}${collection.poster_path}`}
                  className="w-28 h-44 rounded-md shadow-md object-cover"
                />
                <div className="pt-4">
                  <h2 className="text-white opacity-90 text-lg">
                    {collection.name}
                  </h2>
                  <p className="text-neutral-500">
                    {collection.original_language}
                  </p>
                </div>
              </div>

              <div className="w-[70%]">
                <div className="flex-1 flex justify-end overflow-hidden py-6 relative">
                  <ShowCollectionPartsPoster parts={collection.parts} />
                </div>
              </div>
            </div>

            <div className="border border-white opacity-25 mt-2"></div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Collections;
