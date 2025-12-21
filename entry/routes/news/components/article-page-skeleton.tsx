"use client";

import { Skeleton } from "@/shared/components/ui/skeleton";

import { Separator } from "@/shared/components/ui/separator";

const ArticlePageSkeleton = () => {
  return (
    <div>
      <div className="w-9/10 mx-auto">
        <div className="mt-5">
          <div className="flex items-center justify-center flex-col gap-6">
            {" "}
            <Skeleton className="w-3/4  h-6" />
            <Skeleton className="w-1/2  h-6" />
          </div>
          <Skeleton className="w-full aspect-[1.91:1] overflow-hidden my-4 h-96 flex">
            {" "}
          </Skeleton>
        </div>
        <div className="flex gap-5 w-full my-4">
          <Skeleton className="w-20 h-5" />
        </div>
        <Separator />
        <div className="w-2/3 mx-auto my-5 flex flex-col gap-5">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-2/3 h-5" />
          <Skeleton className="w-1/3 h-5" />
        </div>
        <Separator />

        <div className="flex justify-between">
          {" "}
          <Skeleton className="w-1/4 h-10 my-5" />
          <div className="flex gap-4">
            <Skeleton className="w-20 h-10 my-5" />
            <Skeleton className="w-20 h-10 my-5" />
            <Skeleton className="w-20 h-10 my-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePageSkeleton;
