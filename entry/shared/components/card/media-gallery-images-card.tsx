import { TMDBLogosData } from "@/shared/interfaces/tmdb/tmdb.interface";
import { translateCountryCodeToCountryName } from "@/shared/utils/code-converters";
import { BsAspectRatio } from "react-icons/bs";

type SeriesDetailsImageCardProps = {
  image: TMDBLogosData;
};

export const SeriesDetailsImageCard = ({
  image,
}: SeriesDetailsImageCardProps) => {
  return (
    <div className="min-h-[150px] min-w-[100px]">
      <div>
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${image.file_path}`}
          className="w-full h-full rounded-lg object-cover"
        ></img>
      </div>
      <div className="opacity-50 text-sm p-2">
        <div className="flex justify-between items-center mx-1 my-0.5 ">
          <p className="">
            {translateCountryCodeToCountryName(image.iso_639_1)}
          </p>
          <p className="flex  items-center justify-center">
            <BsAspectRatio className="mx-2" /> {image.width} - {image.height}
          </p>
        </div>

        <div className="flex justify-between mx-2">
          <p className="">{image.vote_count} votes</p>
          <p className="">{image.vote_average} avg</p>
        </div>
      </div>
    </div>
  );
};
