"use client";

import { getMovieReccomendationsPosters } from "@/shared/services/tmdb/movies";
import Image from "next/image";
import { useEffect, useState } from "react";

/* type carDisplayProps = {
  posterURL: string;
}; */

const CardDisplay = () => {
  const [posters, setPosters] = useState([]);
  console.log("usestate posters: ", posters[0]);

  const handleGetPosters = async () => {
    const data = await getMovieReccomendationsPosters();
    console.log("client :", data);

    setPosters(data);
  };
  useEffect(() => {
    handleGetPosters();
  }, []);

  return (
    <div className="flex items-center justify-center h-[40vh] gap-10 ">
      {posters.map((movie) => {
        console.log("map: ", movie);

        return (
          <div key={movie.id} className="w-[10%]">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/original/${movie.poster_path}`}
              alt="poster"
              className="bg-[#2c3440] w-[400px] h-64"
              width={10}
              height={10}
            ></Image>
          </div>
        );
      })}
    </div>
  );
};

export default CardDisplay;
