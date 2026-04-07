import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

const MoviePageSkeleton = () => {
  return (
    <div className="h-screen">
      <div className="absolute top-0 -z-50  h-[250px] w-full object-cover object-center ">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="grid grid-cols-3 gap-4 h-[500px]">
        <div className="px-20 py-14">
          <Skeleton className="w-full h-full " />
        </div>
        <div className="flex flex-col justify-end items-start lg:my-10 gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-32 w-40" />
        </div>{" "}
        <div className="p-5 flex flex-col my-auto">
          <Skeleton className="my-1 h-8 w-20" />
          <div className="flex justify-center items-center "></div>
          <Skeleton className=" w-full h-36 " />
        </div>
      </div>
      <div className="my-5">
        <Separator />
      </div>
      <div className="flex my-5">
        <div className="w-1/3 flex items-center justify-center flex-col gap-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="w-2/3 flex gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="bg-card p-4 rounded-lg border-gray-500/50 border h-[180px] w-[260px] flex-col flex justify-between"
            />
          ))}
        </div>
      </div>
      <div className="my-5">
        <Separator />
      </div>
      <div className="w-2/3 flex gap-4 flex-col">
        <Skeleton className="my-2 h-10 w-20" />
        <div className="flex gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="p-4 rounded-full border-gray-500/50 border h-[100px] w-[100px] "
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePageSkeleton;
