import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";

const WatchProviderSkeleton = () => {
  return (
    <div className="">
      <Skeleton className="h-10 w-1/3 my-5" />
      <div className="flex gap-5 justify-between items-center">
        <div className="w-6/10 flex gap-4 items-center justify-center">
          <Skeleton className="flex-1 h-9" />
          <Skeleton className="w-28 h-10" />
        </div>
        <div className="w-1/3 flex gap-4 justify-end">
          <Skeleton className="w-32 h-10" />
          <Skeleton className="w-32 h-10" /> <Skeleton className="w-32 h-10" />
        </div>
      </div>
      <div className="my-5">
        <Separator className="bord" />
      </div>
      <div>
        <div className="grid lg:grid-cols-4 lg:gap-4 lg:my-5 md:grid-cols-2 md:my-4 md:gap-3">
          {Array.from({ length: 20 }).map(() => (
            <ProviderCardSkeleton />
          ))}
        </div>{" "}
      </div>
    </div>
  );
};

export default WatchProviderSkeleton;

export const ProviderCardSkeleton = () => {
  return (
    <div className="flex gap-4 rounded-lg border p-4 h-40">
      <Skeleton className="w-3/10 h-full" />
      <div className="flex justify-center flex-col flex-1 gap-4">
        <Skeleton className="w-1/2 h-6" /> <Skeleton className="w-2/3 h-6" />
        <Skeleton className="w-1/4 h-6" />
      </div>
    </div>
  );
};
