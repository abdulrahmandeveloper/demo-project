"use client";

import { featuresData } from "@/shared/utils/constants/features-description";

const FeatureDisplayCard = () => {
  return (
    <div className="w-2/3 mx-auto   grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 px-6 text-white">
      {featuresData.map((feature, index) => {
        return (
          <div
            className=" bg-[#506a83] flex flex-row justify-center   items-center  rounded-md p-4 hover:cursor-pointer gap-4 hover:bg-[#03b146] hover:opacity-90 hover:opacity"
            key={index}
          >
            <span className="">{<feature.icon className="size-10" />}</span>
            <div className="items-center ">{feature.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureDisplayCard;
