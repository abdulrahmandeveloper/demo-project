"use client";

import React, { useEffect, useState } from "react";
import { getCollectionFromTMDB } from "../services/tmdb/tmdb";
import { collectionParts, collectionRespose } from "../interfaces/tmdb";
import PosterCard from "./card/poster-card";

const ShowCollectionPartsPoster = ({ part }: { part: collectionParts[] }) => {
  console.log("part: ", typeof part);

  if (part.length === 0 || !Array.isArray(part)) {
    return <p className="">No Parts Posters to show</p>;
  }
  console.log("part: ", part);

  return (
    <>
      {part.length > 0 &&
        part.map((part, index) => {
          console.log(typeof part);
          if (part.poster_path === undefined || !part.poster_path) {
            return (
              <p className="" key={index}>
                No Parts Posters to show
              </p>
            );
          }
          return (
            <div className="" key={index}>
              <PosterCard src={part.poster_path} />
            </div>
          );
        })}
    </>
  );
};

const Collections = () => {
  const [collectsions, setCollections] = useState<collectionRespose[]>([]);

  console.log("client collections: ", collectsions);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollectionFromTMDB();
      setCollections(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-3/5 mx-auto">
      {collectsions.map((collection, index) => {
        return (
          <div className="" key={index}>
            {collection.id ? (
              <>
                <div className="my-3 flex">
                  <img
                    alt=""
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}${collection.poster_path}`}
                    className="size-16"
                  ></img>
                  <div className="flex size-48  flex-row gap-2">
                    {" "}
                    <ShowCollectionPartsPoster part={collection?.parts} />
                  </div>
                </div>
                <div className="">
                  <h2 className="text-white opacity-90 text-lg">
                    {collection.name}
                  </h2>
                  <p className="text-neutral-500">
                    {collection.original_language}
                  </p>
                  <div className="">
                    {collection?.parts?.[index]?.name || ""}
                  </div>
                </div>
                <div className="border border-white opacity-25 m-1"></div>{" "}
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Collections;
