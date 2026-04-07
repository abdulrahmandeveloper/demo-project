import React from "react";
import { TMDBSeasoEpisodesResponse } from "../interfaces/tmdb.interface";

type EpisodeListCardProps = {
  episode: TMDBSeasoEpisodesResponse;
  orientation: "grid" | "list";
};
const EpisodeListCard = ({ episode, orientation }: EpisodeListCardProps) => {
  return (
    <>
      {orientation === "grid" && (
        <div className="flex items-center flex-col bg-gray-800/40 rounded-lg lg:h-[250px] justify-between ">
          <div className="my-1 lg:h-[180px] w-full">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${episode.still_path}`}
              className="object-cover w-full h-full rounded-lg"
            ></img>
          </div>
          <div className="p-1 flex  items-center flex-col gap-1">
            <p className="mx-4 text-center">{episode.name}</p>{" "}
            <p className="opacity-50 mx-4">Duration: {episode.runtime} mins</p>
          </div>
        </div>
      )}
      {orientation === "list" && (
        <div className="flex gap-5 bg-gray-800/40 border border-white/70 rounded-lg p-2">
          <div className="w-1/8 h-[100px] ">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${episode.still_path}`}
              className="object-cover w-full h-full rounded-lg aspect-video"
            ></img>
          </div>
          <div className="border border-white/50"></div>
          <div className="flex items-center justify-between w-full mr-6">
            <p className="">{episode.name}</p>{" "}
            <p className="opacity-50">Duration: {episode.runtime} mins</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EpisodeListCard;
