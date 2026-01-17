import MovieDescriptionPage from "@/features/movie/components/movie-description-page";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import React from "react";

interface PageProps {
  params: { movieId: number };
}
const page = async ({ params }: PageProps) => {
  const { movieId } = await params;

  return (
    <div>
      <Navbar
        logoPath={"/images/avatar-image.jpg"}
        links={navbarLinks}
        search={true}
      />
      <MovieDescriptionPage movieId={movieId} />
    </div>
  );
};

export default page;
