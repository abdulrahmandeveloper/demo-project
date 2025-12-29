import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { BsGenderAmbiguous } from "react-icons/bs";
import { cn } from "@/shared/utils/utils";
import {
  BadgeCheckIcon,
  BookmarkIcon,
  EclipseIcon,
  ExternalLinkIcon,
  Film,
  Share2Icon,
  Star,
  TrendingUp,
  Tv,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { TMDBPeopleCredits } from "../interfaces/people.interface";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";

type PersonInfoCardProps = {
  containerClassName: string;
  personImage: string;
  name: string;
  originalName: string;
  gender: number;
  role: string;
  popular: number;
  knownFor?: TMDBPeopleCredits[];
};

const PersonInfoCard = ({
  containerClassName,
  personImage,
  name,
  originalName,
  gender,
  role,
  popular,
  knownFor,
}: PersonInfoCardProps) => {
  const [saved, setSaved] = useState<boolean>(false);

  const handleSaveClick = () => {
    setSaved(!saved);
  };

  const personGender =
    gender === 1 ? "Female" : gender === 2 ? "Male" : "Unknown";

  const isHavingMedia: boolean = knownFor ? true : false;

  const movieCredits = knownFor?.filter((item) => item.media_type === "movie");
  const seriesCredits = knownFor?.filter((item) => item.media_type === "tv");

  return (
    <Card
      className={`${containerClassName}  group overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:border-primary/30 flex flex-row gap-1 ${
        isHavingMedia ? "w-[500px]" : "w-200px]"
      } px-2`}
    >
      <div className="flex flex-col   w-[200px]">
        <CardHeader className="">
          <Link
            href={`/discover/peoples/${name}`}
            className={`items-center  ${isHavingMedia ? "my-4" : "my-2"}`}
          >
            <div className="relative ">
              {" "}
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/${personImage}`}
                alt={name}
                className="w-full aspect-2/3   object-cover object-top group-hover:scale-105 transition-transform duration-500 rounded-lg "
              />
              <div className="absolute bottom-0 group-hover:-bottom-2 left-0 group-hover:-left-1 right-0 group-hover:-right-1 p-4   bg-linear-to-t from-black/90 bg-transparent">
                <h1 className="  text-white  drop-shadow-lg mb- font-semibold text-lg text-center">
                  {name} {name !== originalName && " | " + originalName}
                </h1>
              </div>
            </div>
          </Link>
        </CardHeader>
        <Link
          href={`/discover/peoples/${name}`}
          className={`flex-1 ${isHavingMedia ? "my-4" : "my-2"}`}
        >
          <CardContent className="gap-1 flex flex-col">
            <div className="flex justify-between gap-2">
              <p className="">
                Known for: <strong className="">{role}</strong>
              </p>
            </div>{" "}
            <Separator />
            <div className="flex justify-between gap-3 my-2 mx-1">
              <Badge
                variant={"secondary"}
                className="flex items-center gap-1 px-2 py-1 text-sm"
              >
                <BsGenderAmbiguous className="h-4 w-4" /> {personGender}
              </Badge>
              <div className="bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-2 px-3 py-1.5 ">
                <TrendingUp className="h-4 w-4 text-yellow-500" />
                <h2 className="text-white font-black text-sm">
                  {popular.toFixed(2)}
                </h2>
              </div>
            </div>
          </CardContent>
        </Link>
        {isHavingMedia === false && (
          <CardFooter className="flex items-center gap-2 mt-2">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={handleSaveClick}
              className="cursor-pointer"
            >
              <BookmarkIcon
                className={cn(saved && "fill-primary stroke-primary")}
              />{" "}
              Save
            </Button>
            <Button variant={"ghost"} size={"sm"} className="cursor-pointer">
              <Share2Icon /> Share
            </Button>
          </CardFooter>
        )}
      </div>
      {isHavingMedia && (
        <div className="flex flex-col justify-between px-2 w-[300px]">
          <CardContent className="px-1">
            <h1 className="my-1 font-semibold">Played in</h1>
            <div className="border rounded-lg p-2">
              {movieCredits?.length > 0 && (
                <div className="">
                  {" "}
                  <h1 className="flex gap-1 items-center">
                    <Film className="h-4 w-4 text-amber-100 shrink-0" />
                    Movies
                  </h1>
                  <Separator />
                  {movieCredits?.slice(0, 3).map((item) => (
                    <Link
                      href={`/movies/${item.id}`}
                      key={item.id}
                      className="flex justify-between items-center rounded-lg hover:bg-accent transition-colors p-2 group/item my-1"
                    >
                      {item.media_type === "movie"}
                      <div className="flex items-center gap-2 flex-1 min-w-1">
                        {" "}
                        <p className="font-medium text-sm truncate transition-colors group-hover:text-primary">
                          {item.name ?? item.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        {item.vote_average.toFixed(1)}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {seriesCredits?.length > 0 && (
                <>
                  {" "}
                  <h1 className="flex items-center gap-1">
                    <Tv className="h-4 w-4 text-blue-500 shrink-0" /> Series
                  </h1>
                  <Separator />
                  {seriesCredits?.slice(0, 3).map((item) => (
                    <Link
                      href={`/series/${item.id}`}
                      key={item.id}
                      className="flex justify-between items-center rounded-lg hover:bg-accent transition-colors p-2 group/item my-1"
                    >
                      {item.media_type === "movie"}
                      <div className="flex items-center gap-2 flex-1 min-w-1">
                        {" "}
                        <p className="font-medium text-sm truncate transition-colors group-hover:text-primary">
                          {item.name ?? item.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        {item.vote_average.toFixed(1)}
                      </div>
                    </Link>
                  ))}
                </>
              )}
              {knownFor.length > 6 && (
                <Link href={`/people/${name}`}>
                  View All {knownFor.length} credits
                </Link>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2 my-0">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={handleSaveClick}
              className="cursor-pointer"
            >
              <BookmarkIcon
                className={cn(saved && "fill-primary stroke-primary")}
              />{" "}
              Save
            </Button>
            <Button variant={"ghost"} size={"sm"} className="cursor-pointer">
              <Share2Icon /> Share
            </Button>
          </CardFooter>
        </div>
      )}
    </Card>
  );
};

export default PersonInfoCard;
