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

  const hashedTitle = encodeUrl(title);

  const generatedId = geterateId(id.toString());

  const handleSaveClick = () => {
    setSaved(!saved);
  };
  return (
    <Card className={`${containerClassName}  flex-col`}>
      <CardHeader className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {" "}
          <Avatar className="ring-1 ring-border">
            <AvatarImage
              src={imagUrl ? imagUrl : "/images/avatar-image.jpg"}
              alt={authorName}
            ></AvatarImage>
          </Avatar>
        </div>
        <div className="flex flex-col gap-0.5">
          <CardTitle className="line-clamp-2 text-sm">
            {title}{" "}
            <BadgeCheckIcon className="size-4 fill-sky-600 stroke-white" />
          </CardTitle>
          <CardDescription className="text-xs">
            {authorName ? `${authorName} .` : null}{" "}
            {new Date(publishDate).toLocaleDateString()}
          </CardDescription>
        </div>
        <Button variant={"ghost"} size={"icon"}>
          <EclipseIcon className="" />
        </Button>
      </CardHeader>
      <Link href={`/news/${hashedTitle}-${generatedId}`} className="flex-1  ">
        <CardContent className="space-y-4  text-sm">
          <img
            src={imagUrl}
            alt={title}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <div className="space-y-1">
            <h2 className="text-muted-foreground line-clamp-3">{sourceName}</h2>
            <p className="font-semibold leading-snug">{description}</p>
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
