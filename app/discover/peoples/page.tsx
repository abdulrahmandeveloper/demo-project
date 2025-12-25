import PeoplesMainPage from "@/routes/peoples/components/peoples-main-page";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <PeoplesMainPage />
    </div>
  );
};

export default page;
