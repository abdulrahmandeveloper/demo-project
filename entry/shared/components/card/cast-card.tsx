import React from "react";

type CastCardProps = {
  name: string;
  playedAs: string;
  profilePath: string;
  className: string;
};
const CastCard = ({
  name,
  playedAs,
  profilePath,
  className,
}: CastCardProps) => {
  return (
    <div className={`${className} `}>
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${profilePath}`}
        alt={name}
        className={`w-24 object-cover h-24 rounded-full `}
      />
      <p className=" text-center text-base">{name}</p>
      <p className="opacity-60 text-sm text-center">As: {playedAs}</p>
    </div>
  );
};

export default CastCard;
