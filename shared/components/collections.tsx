"use client";
import React, { useEffect, useState } from "react";
import CardDisplay from "./card/card-display";
import { getCollectionFromTMDB } from "../services/tmdb/tmdb";

const Collections = () => {
  const [collectsions, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollectionFromTMDB();
      setCollections(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="">
        <CardDisplay size="sm" limit={1} />
      </div>
      <div className=""></div>
    </div>
  );
};

export default Collections;
