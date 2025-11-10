import Navbar from "@/shared/components/navbar";
import { navbarLinks } from "@/shared/lib/utils/constants/navbar-links";
import React from "react";

const SeriesList = () => {
  return (
    <div className="">
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <div className=""></div>
    </div>
  );
};

export default SeriesList;
