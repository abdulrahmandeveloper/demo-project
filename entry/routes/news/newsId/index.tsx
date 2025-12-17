"use client";

import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const NewsIdPage = () => {
  const searchParams = useSearchParams();
  const articleLink = searchParams.get("url");
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {}, []);
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
