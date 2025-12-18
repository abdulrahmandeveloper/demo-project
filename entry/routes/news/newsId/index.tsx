"use client";

import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import { useEffect, useState } from "react";

const NewsIdPage = ({ slug }: { slug: string }) => {
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState();

  const title = slug.split("-");
  const id = slug.split("-").pop();

  useEffect(() => {
    const fetchData = async () => {
      //const articleData = await
    };

    fetchData();
  }, []);
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
