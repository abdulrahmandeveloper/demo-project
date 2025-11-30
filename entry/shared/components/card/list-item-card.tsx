"use client";

import { TMDBMovieResponse } from "entry/features/movie/interfaces/tmdb.interface";
import { TMDBSeriesResponse } from "entry/features/series/interfaces/tmdb.interface";
import { getGenresFromTmdb } from "entry/shared/services/tmdb/tmdb.service";
import { useEffect, useState } from "react";

type ListTypes = TMDBMovieResponse | TMDBSeriesResponse;

type ListItemCardProps<T extends ListTypes> = {
  list: T;
  className: string;
};

const ListItemCard = <T extends ListTypes>({
  list,
  className,
}: ListItemCardProps<T>) => {
  const [genres, setGenres] = useState<string[]>();
  const dataList = listTypeIndicator(list);

  const title = dataList.name ? dataList.name : dataList.title;

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
    <div className="p-1">
      <div className="relative  group w-full px-[3px] py-[4.85px]">
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${list.poster_path}`}
          alt={
            dataList.original_name
              ? dataList.original_name
              : dataList.original_title
          }
          className={`${className}  aspect-2/3 overflow-hidden transition-all duration-300 group-hover:scale-[1.025] group-hover:shadow-lg shadow-inner group-hover:shadow-white/50 `}
        />

        <div className="absolute cursor-pointer inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/75 hover:rounded-lg ">
          <div className="flex flex-col items-center gap-1 rounded-lg ">
            {genres?.map((genre, index) => (
              <p className="text-lg" key={index}>
                {genre}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-2 mt-4">
        <h2 className="text-lg font-bold text-center ">
          {list.name ? list.name : title}
        </h2>
        <p>{list.vote_average}</p>
      </div>
    </div>
  );
};

export default ListItemCard;

const listTypeIndicator = (list: ListTypes): any => {
  if ("original_title" in list) {
    return list as TMDBMovieResponse;
  } else if ("first_air_date" in list) {
    return list as TMDBSeriesResponse;
  }
};
