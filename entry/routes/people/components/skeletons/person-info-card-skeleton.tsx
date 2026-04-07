import { CardContent, CardFooter } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";

type PersonInfoCardSkeletonProps = {
  isHavingButtons: boolean;
  showingCreditsSidebar: boolean;
};
export const PersonInfoCardSkeleton = ({
  isHavingButtons,
  showingCreditsSidebar,
}: PersonInfoCardSkeletonProps) => {
  return (
    <div
      className={`flex ${
        showingCreditsSidebar ? "gap-5 items-start lg:w-[300px]" : "flex-col "
      }  items-center justify-center bg-card p-8 rounded-lg border-2 border-primary/30 sm:w-[200px] lg:w-full`}
    >
      {" "}
      <div className="">
        <Skeleton className="w-40 h-52 aspect-2/3 rounded-lg " />
        <div className="gap-1 flex flex-col my-3">
          <Skeleton className="w-32 h-5 my-2"></Skeleton>

          <Separator />
          <div className="flex justify-between gap-2 mt-2 mx-1">
            <Skeleton className="w-12 h-8"></Skeleton>
            <Skeleton className="w-20 h-8"></Skeleton>
          </div>
        </div>
      </div>
      {showingCreditsSidebar && (
        <div className="flex items-start">
          <div className="flex flex-col justify-between px-2 w-[300px] h-[400px]">
            <CardContent className="px-1">
              <Skeleton className="w-20 h-6 my-3" />{" "}
              <div className="border rounded-lg p-2">
                <div className="">
                  {" "}
                  <Skeleton className="w-20 h-5 mb-2" />
                  <Separator />
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center rounded-lg hover:bg-accent transition-colors p-2 group/item my-1"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-1">
                        {" "}
                        <Skeleton className="w-10 h-10" />
                      </div>

                      <Skeleton className="w-8 h-5"></Skeleton>
                    </div>
                  ))}
                </div>

                <>
                  {" "}
                  <Skeleton className="w-20 h-5 mb-2 mt-4" />
                  <Separator />
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center rounded-lg hover:bg-accent transition-colors p-2 group/item my-1"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-1">
                        {" "}
                        <Skeleton className="w-10 h-10" />
                      </div>

                      <Skeleton className="w-8 h-5"></Skeleton>
                    </div>
                  ))}
                </>
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-2 my-0">
              <div className="flex items-center gap-3 my-2">
                <Skeleton className="cursor-pointer w-16 h-8"></Skeleton>
                <Skeleton className="cursor-pointer w-16 h-8"></Skeleton>
              </div>
            </CardFooter>
          </div>
        </div>
      )}
      {isHavingButtons === true && showingCreditsSidebar === false && (
        <div className="flex items-center gap-3 my-2">
          <Skeleton className="cursor-pointer w-16 h-8"></Skeleton>
          <Skeleton className="cursor-pointer w-16 h-8"></Skeleton>
        </div>
      )}
    </div>
  );
};
