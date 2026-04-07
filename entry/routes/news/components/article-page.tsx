"use client";

import { BsFillShareFill } from "react-icons/bs";

import { getEveryNewsFromNewsApi } from "@/shared/services/news.service";
import { useEffect, useState } from "react";
import { NewsResponse } from "../interfaces/news.interface";
import { Separator } from "@/shared/components/ui/separator";
import { ExternalLinkIcon, List, ListChecksIcon, ThumbsUp } from "lucide-react";
import ArticlePageSkeleton from "./skeleton/article-page-skeleton";
import { Button } from "@/shared/components/ui/button";

const NewsIdPage = ({ slug }: { slug: string }) => {
  const [article, setArticle] = useState<NewsResponse>({
    source: { id: null, name: "" },
    author: "",
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    publishedAt: "",
    content: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoading(true);

      const articleData = await getEveryNewsFromNewsApi(slug, 1, "en");
      if (articleData) {
        setArticle(articleData[0]);
      } else {
        setLoading(false);
      }
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  return (
    <div>
      {loading ? <ArticlePageSkeleton /> : null}
      {loading ?? (
        <div className="w-9/10 mx-auto">
          <div className="">
            <h1 className="font-bold text-4xl text-center w-3/4 mx-auto my-6">
              {article.title}
            </h1>
            <div className="w-full aspect-[1.91:1] overflow-hidden my-4">
              {" "}
              <img
                src={article.urlToImage ?? "/images/avatar-image.jpg"}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-5 w-full mb-4 mt-1">
            {/*<img src={article.urlToImage} alt="" className="rounded-full" /> */}
            <p className="opacity-60">{article.author}</p>
          </div>
          <Separator />
          <div className="w-2/3 mx-auto my-5">
            <p className="">{article.description}</p>
            <p className=""> {article.content}</p>
          </div>
          <Separator />

          <div className="my-4  flex justify-between">
            <a
              href={article.url}
              className="text-primary dark:text-white px-2 py-2 hover:bg-primary/25 transition rounded-lg hover:text-black flex gap-3"
            >
              Read Full article
              {article.source.name !== "" ? ` in ${article.source.name}` : "."}
              <ExternalLinkIcon />
            </a>
            <div className="gap-2 flex">
              <Button className="cursor-pointer" size={"sm"}>
                <List />
                Add to collention
              </Button>
              <Button className="cursor-pointer" size={"sm"}>
                <BsFillShareFill className="size-3" />
                Share
              </Button>
              <Button className="cursor-pointer" size={"sm"}>
                <ThumbsUp />
                Like{" "}
              </Button>
            </div>
          </div>
          <div className="my-4">
            <h1 className="font-semibold text-lg">Comments</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsIdPage;
