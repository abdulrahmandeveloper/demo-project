import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";
import { PersonInfoCardSkeleton } from "./person-info-card-skeleton";
import { Separator } from "@/shared/components/ui/separator";

const PeopleSearchPageSkeleton = () => {
  return (
    <div className="my-5">
      <div className="">
        <Skeleton className="w-40 h-10" />
      </div>
      <Separator className="my-2" />

      {
        <div className="my-5 grid lg:grid-cols-6 gap-4 mx-auto w-full">
          {Array.from({ length: 18 }).map((_, index) => (
            <div key={index}>
              <PersonInfoCardSkeleton isHavingButtons={true} />
            </div>
          ))}
        </div>
      }
      <div>
        <Skeleton className="w-2/4 mx-auto h-10" />
      </div>
    </div>
  );
};

export default PeopleSearchPageSkeleton;
