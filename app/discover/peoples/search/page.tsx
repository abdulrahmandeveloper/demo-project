import PeopleSearchPage from "@/routes/peoples/components/people-search-page";
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
      <PeopleSearchPage />
    </div>
  );
};

export default page;
