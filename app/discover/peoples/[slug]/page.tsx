import PersonPage from "@/routes/peoples/components/person-page";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import React from "react";

type PageProps = {
  params: { slug: number };
};
const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  console.log(slug);

  return (
    <div>
      <Navbar
        logoPath={"/images/avatar-image.jpg"}
        links={navbarLinks}
        search={true}
      />
      <PersonPage id={slug} />
    </div>
  );
};

export default page;
