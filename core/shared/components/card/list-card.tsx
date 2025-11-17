"use client";

import { TMDBSerieResponse } from "@/series/interfaces/tmdb";
import { getGenresFromTmdb } from "@/shared/services/tmdb/tmdb.service";
import { useEffect, useState } from "react";

type ListCardProps = {
  list: TMDBSerieResponse;
  className: string;
};

const ListCard = ({ list, className }: ListCardProps) => {
  const [genres, setGenres] = useState<string[]>();

  useEffect(() => {
    const selectGenres = async () => {
      const data = await getGenresFromTmdb();
      if (!data) return null;

      const genresList: string[] = [];

      for (let i = 0; i < list.genre_ids.length; i++) {
        data.genres.map((genre) => {
          if (genre.id === list.genre_ids[i]) {
            genresList.push(genre.name);
          }
        });
      }

      setGenres(genresList);
    };
    selectGenres();
  }, []);

  return (
    <div className=" ">
      <div className="relative p-2 group">
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${list.poster_path}`}
          alt={list.original_title}
          className={`${className}  aspect-[2/3] overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg shadow-inner group-hover:shadow-white/50`}
        />
        <div className="absolute cursor-pointer inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/75 hover:rounded-lg">
          <div className="flex flex-col items-center gap-1 rounded-lg px-3 py-2">
            {genres?.map((genre, index) => (
              <p className="text-lg" key={index}>
                {genre}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-2 mt-4">
        <h2 className="text-lg font-bold text-center ">{list.name}</h2>
        <p>{list.vote_average}</p>
      </div>
    </div>
  );
};

export default ListCard;
