import { Avatar, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { createSlug, encodeUrl } from "@/shared/utils/handle-slug";
import { geterateId } from "@/shared/utils/generate-id";
import { cn } from "@/shared/utils/utils";
import {
  BadgeCheckIcon,
  BookmarkIcon,
  EclipseIcon,
  ExternalLinkIcon,
  Share2Icon,
} from "lucide-react";
import Link from "next/link";
import { stringify } from "querystring";
import React, { useState } from "react";

type NewsCardProps = {
  id: number;
  sourceName: string;
  authorName: string;
  title: string;
  description: string;
  imagUrl: string;
  publishDate: string;
  url: string;
  containerClassName: string;
};

const NewsCard = ({
  id,
  sourceName,
  authorName,
  title,
  description,
  imagUrl,
  publishDate,
  url,
  containerClassName,
}: NewsCardProps) => {
  const [saved, setSaved] = useState<boolean>(false);

  const handleSaveClick = () => {
    setSaved(!saved);
  };

  return (
    <Card className={`${containerClassName}`}>
      <CardHeader className="flex   gap-4">
        {" "}
        <Avatar className="ring-1 ring-border">
          <AvatarImage
            src={imagUrl ? imagUrl : "/images/avatar-image.jpg"}
            alt={authorName}
            className="object-cover"
          ></AvatarImage>
        </Avatar>
        <div className="flex flex-col gap-0.5 w-full">
          <CardTitle className="line-clamp-2 text-sm">
            {title}{" "}
            <BadgeCheckIcon className="size-4 fill-sky-600 stroke-white" />
          </CardTitle>
          <div className="flex  justify-between text-sm opacity-50">
            <p className=" truncate w-2/4">
              {authorName ? `${authorName} .` : null}{" "}
            </p>
            {new Date(publishDate).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <Link href={`/news/${title}`} className="flex-1  ">
        <CardContent className="space-y-4  text-sm ">
          <img
            src={imagUrl}
            alt={title}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <div className="space-y-1 h-[125px]">
            <h2 className="text-muted-foreground line-clamp-1">{sourceName}</h2>
            <p className="font-semibold leading-snug line-clamp-5 ">
              {description}
            </p>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="flex items-center gap-2">
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
        <Button
          variant={"ghost"}
          size={"sm"}
          asChild
          className="cursor-pointer"
        >
          <a target="_blank" href={url}>
            <ExternalLinkIcon />
            Read
          </a>
        </Button>
        <Button variant={"ghost"} size={"sm"} className="cursor-pointer">
          <Share2Icon /> Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
