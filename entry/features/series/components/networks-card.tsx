import React from "react";

type NetworksCardProps = {
  name: string;
  logo: string;
  conatainerClassname: string;
};

const NetworksCard = ({
  name,
  logo,
  conatainerClassname,
}: NetworksCardProps) => {
  return (
    <div
      className={`${conatainerClassname} flex flex-col border border-white/50 rounded-2xl p-5 items-center`}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${logo}`}
        className=" object-cover h-2/3 w-"
      ></img>
      <h1 className="my-2 opacity-75 text-center">{name}</h1>
    </div>
  );
};

export default NetworksCard;
