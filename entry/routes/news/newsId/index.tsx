"use client";

import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import { getEveryNewsFromNewsApi } from "@/shared/services/news.service";
import { useEffect, useState } from "react";

const NewsIdPage = ({ slug }: { slug: string }) => {
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  //const title = slug.split("-");
  //const id = slug.split("-").pop();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const articleData = await getEveryNewsFromNewsApi(slug);
      if (articleData) {
        setArticle(articleData);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <div className=""></div>
    </div>
  );
};

export default NewsIdPage;
