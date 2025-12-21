import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

type NewsCardSkeletonProps = {
  containerClassName?: string;
};

const NewsCardSkeleton = ({ containerClassName }: NewsCardSkeletonProps) => {
  return (
    <Card className={`${containerClassName}  w-full max-w-md`}>
      <CardHeader className="flex items-center  gap-4">
        <Skeleton className="h-10 w-10 rounded-full"></Skeleton>
        <div className="flex-1 space-y-2">
          <CardTitle className="line-clamp-2 text-sm flex flex-col gap-2">
            <Skeleton className="h-4 w-3/2" />
            <Skeleton className="h-3 w-2/3" />
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4  text-sm flex-1">
        <Skeleton className="aspect-video w-full rounded-lg" />

        <div className="space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </CardFooter>
    </Card>
  );
};

export default NewsCardSkeleton;
