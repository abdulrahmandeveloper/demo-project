"use client";

import { getMovieReccomendationsPosters } from "@/shared/services/tmdb/movies";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

type carDisplayProps = {
  showOverlay?: boolean;
  size: "sm" | "md" | "lg";
  limit?: number;
};

const CardDisplay = ({ showOverlay, size, limit = 6 }: carDisplayProps) => {
  const [posters, setPosters] = useState<[]>([]);
  const [limitNumber, setLimitNumber] = useState<number>(0);

  const handleGetPosters = async (limit: number) => {
    const data = await getMovieReccomendationsPosters(limit);
    console.log("client :", data);

    setPosters(data);
  };
  useEffect(() => {
    setLimitNumber(limit);
    handleGetPosters(limitNumber);
  }, [limitNumber]);

  return (
    <div
      className={`flex items-center justify-center ${
        size === "lg" ? "h-[40vh]" : size === "md" ? "h-[30vh]" : "h-[20vh]"
      } gap-4 `}
    >
      {posters.map((movie) => {
        console.log("map: ", movie);

        return (
          <div
            key={movie.id}
            className="w-[10%] relative group border border-transparent overflow-hidden rounded-md transition-all duration-300 hover:border-[#00E054] hover:shadow-[0_0_10px_#00E054] hover:cursor-pointer "
          >
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/original${movie.poster_path}`}
              alt="poster"
              className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-90"
              width={10}
              height={10}
            ></img>
            {showOverlay && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col items-center gap-1 bg-black/60 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1 text-green-400 text-3xl">
                    <Eye className="size-14" />
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-3xl">
                    {movie.vote_count}
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-3xl">
                    <AiFillHeart className="size-14" />
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-3xl">
                    {movie.popularity}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardDisplay;
