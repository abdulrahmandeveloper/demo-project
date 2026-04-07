import CompaniesMainPage from "@/routes/companies/components/companies-main-page";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar
        logoPath={"/images/avatar-image.jpg"}
        links={navbarLinks}
        search={true}
      />

      <CompaniesMainPage />
    </div>
  );
};

export default page;
