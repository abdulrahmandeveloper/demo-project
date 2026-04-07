import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";
import { PersonInfoCardSkeleton } from "./person-info-card-skeleton";

const PeopleMainPageSkeleton = () => {
  return (
    <div className="w-9/10 mx-auto my-5">
      <div className="my-4">
        <Skeleton className={"w-96 h-8 my-4"} />
        <div className="flex overflow-auto gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index}>
              <PersonInfoCardSkeleton
                isHavingButtons={false}
                showingCreditsSidebar={true}
              />
            </div>
          ))}
        </div>
      </div>
      <Separator className="my-3" />

      <div className="my-4">
        <Skeleton className={"w-72 h-8 my-4"} />
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 18 })
            .slice(0, 11)
            .map((_, index) => (
              <div key={index}>
                <PersonInfoCardSkeleton
                  isHavingButtons={true}
                  showingCreditsSidebar={false}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PeopleMainPageSkeleton;
