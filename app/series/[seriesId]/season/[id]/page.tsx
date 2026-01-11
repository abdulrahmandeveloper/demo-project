import SeasonDetailsPage from "@/features/series/components/season-page";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import React from "react";

type PageParams = {
  params: { seriesId: number; id: number };
};

const page = async ({ params }: PageParams) => {
  const { seriesId, id } = await params;

  return (
    <div>
      <Navbar
        logoPath={"/images/avatar-image.jpg"}
        links={navbarLinks}
        search={true}
      />
      <SeasonDetailsPage seriesId={seriesId} seasonNumber={id} />
    </div>
  );
};

export default page;
