import SeriesDetailsPage from "@/features/series/components/series-details-page";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import React from "react";

const page = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;
  return (
    <div>
      <Navbar
        logoPath={"/images/avatar-image.jpg"}
        links={navbarLinks}
        search={true}
      />
      <SeriesDetailsPage seriesId={id} />
    </div>
  );
};

export default page;
