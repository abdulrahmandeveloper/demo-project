import CompanyPage from "@/routes/companies/components/company-page";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import React from "react";

type PageProps = {
  params: {
    id: number;
  };
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <Navbar
        logoPath={"/images/avatar-image.jpg"}
        links={navbarLinks}
        search={true}
      />
      <CompanyPage id={id} />
    </div>
  );
};

export default page;
