import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

const PersonPageSkeleton = () => {
  return (
    <div>
      <div className="">
        <div className="w-4/5 mx-auto flex gap-8">
          <div className="rounded-lg p-5 m-6 w-1/4 lg:aspect-2/3">
            <Skeleton className="rounded-lg w-full h-full" />
          </div>
          <div className="justify-center flex flex-col gap-3">
            {Array.from({ length: 8 }).map((_, index) => {
              const titleWidth = generateRandomWidthLengths(50, 100);
              const valueWidth = generateRandomWidthLengths(100, 150);
              return (
                <div className="flex gap-4" key={index}>
                  <Skeleton
                    className={`opacity-70 text-lg font-semibold px-3`}
                    style={{
                      width: `${titleWidth}px`,
                      height: `40px`,
                    }}
                  ></Skeleton>
                  <Skeleton
                    className={``}
                    style={{
                      width: `${valueWidth}px`,
                      height: `40px`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-3 my-5 gap-3 px-5 min-h-[500px]">
          <div className="relative w-4/5 mx-auto h-full  overflow-hidden ">
            <Skeleton className="h-full w-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-linear-to-r from-black via-95% to-transparent"></div>
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="flex items-center mx-auto justify-center w-64 h-10" />
            <Separator />
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="font-sans font-light text-lg px-2 py-2"
              >
                <Skeleton className="w-full h-4" />
              </div>
            ))}
          </div>
          <div className="relative w-4/5 mx-auto ml-auto h-full overflow-hidden">
            <Skeleton className="h-full w-full object-cover opacity-50" />

            <div className="absolute inset-0 bg-linear-to-l from-black via-95% to-transparent"></div>
          </div>
        </div>
        <Separator className="my-1" />
        <div className="flex flex-col gap-1 my-5">
          <div className=" flex justify-center gap-5">
            <Skeleton className="w-24 h-10" />
            <Skeleton className="w-24 h-10" />
          </div>
          <div className="w-2/3 mx-auto -[600px] ">
            <Separator className="my-4" />{" "}
            <div className="grid lg:grid-cols-5 gap-4">
              {" "}
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="">
                  <Skeleton className="w-full lg:h-[300px] aspect-2/3" />
                </div>
              ))}
            </div>
            <Skeleton className=" mx-auto w-32 h-10 my-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonPageSkeleton;

function generateRandomWidthLengths(min: number, max: number): number {
  const randomLength = Math.random() * (max - min) + min;
  return Math.floor(randomLength);
}
