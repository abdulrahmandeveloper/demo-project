"use client";

import Navbar from "@/shared/components/navigation/navbar";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import { getEveryNewsFromNewsApi } from "@/shared/services/news.service";
import { useEffect, useState } from "react";
import { NewsResponse } from "../interfaces/news.interface";

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

  console.log(article);

  console.log("slug in news id: ", slug);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoading(true);

      const articleData = await getEveryNewsFromNewsApi(slug);
      if (articleData) {
        setArticle(articleData[0]);
        setLoading(false);
      }
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={true}
      />
      <div className="w-9/10 mx-auto">
        {loading && <Skeleton className="w-10 h-10" />}
        <div className="">
          <h1 className="items-center justify-center">{article.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default NewsIdPage;
