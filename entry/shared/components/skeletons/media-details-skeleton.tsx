import { Separator } from "@/shared/components/ui/separator";
import React from "react";

const MediaDetailsPageSkeleton = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <SkeletonText className="h-8 w-1/3" />
        <SkeletonBox className="h-10 w-48 rounded-md" />
      </div>
      <div className="grid grid-cols-2 gap-3 bg-card p-4 rounded-lg my-5">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-6">
            <SkeletonText className="h-6 w-1/2" />
            <Separator />
            <SkeletonText className="w-3/4" />
            <SkeletonText className="w-2/3" />
            <SkeletonText className="w-1/2" />
            <SkeletonText className="w-2/4" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-10 my-5">
        {[1, 2].map((section) => (
          <div key={section}>
            <SkeletonText className="h-7 w-32 mb-4" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg border">
                  <SkeletonBox className="w-16 h-16 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <SkeletonText className="w-3/4" />
                    <SkeletonText className="w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="my-5">
        <SkeletonText className="h-7 w-40 mb-4" />

        <div className="grid grid-cols-7 gap-5">
          {[...Array(7)].map((_, i) => (
            <SkeletonBox key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
      <div className="my-5">
        <SkeletonText className="h-7 w-40 mb-4" />

        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-xl p-4 space-y-3">
              <SkeletonText className="w-1/2" />
              <Separator />
              <SkeletonBox className="h-6 w-full" />
              <SkeletonBox className="h-6 w-4/5" />
            </div>
          ))}
        </div>
      </div>
      <div className="my-5">
        <SkeletonText className="h-7 w-48 mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-2">
              <SkeletonText className="w-1/2" />
              <Separator />
              <SkeletonText className="w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaDetailsPageSkeleton;

const SkeletonBox = ({ className = "" }) => (
  <div className={`animate-pulse bg-muted rounded-lg ${className}`} />
);

const SkeletonText = ({ className = "" }) => (
  <div className={`animate-pulse bg-muted rounded-lg h-4 ${className}`} />
);
