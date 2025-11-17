import React from "react";

type posterCardProps = { src: string; className?: string };

const PosterCard = ({ src, className }: posterCardProps) => {
  return (
    <div>
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}${src}`}
        alt="image"
        className={className}
      />
    </div>
  );
};

export default PosterCard;
