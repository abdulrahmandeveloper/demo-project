import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";

type PersonInfoCardSkeletonProps = {
  isHavingButtons: boolean;
};
export const PersonInfoCardSkeleton = ({
  isHavingButtons,
}: PersonInfoCardSkeletonProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-card p-8 rounded-lg border-2 border-primary/30 sm:w-[200px] lg:w-full">
      {" "}
      <Skeleton className="w-40 h-52 aspect-2/3 rounded-lg " />
      <div className="gap-1 flex flex-col my-3">
        <Skeleton className="w-32 h-5 my-2"></Skeleton>

        <Separator />
        <div className="flex justify-between gap-2 mt-2 mx-1">
          <Skeleton className="w-12 h-8"></Skeleton>
          <Skeleton className="w-20 h-8"></Skeleton>
        </div>
      </div>
      {isHavingButtons === true && (
        <div className="flex items-center gap-3 my-2">
          <Skeleton className="cursor-pointer w-16 h-8"></Skeleton>
          <Skeleton className="cursor-pointer w-16 h-8"></Skeleton>
        </div>
      )}
    </div>
  );
};
