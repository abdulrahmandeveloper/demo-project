import SeriesDetailsPage from "@/features/series/components/series-details-page";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar
        logoPath={"/public/images/avatar-image.jpg"}
        links={navbarLinks}
        search={true}
      />
      <SeriesDetailsPage />
    </div>
  );
};

export default page;
