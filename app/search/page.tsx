import SearchPage from "@/routes/search/components/search-page";
import Navbar from "@/shared/components/navigation/navbar";

import { navbarLinks } from "@/shared/constants/navbar-links.constants";

const page = () => {
  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <SearchPage />
    </div>
  );
};

export default page;
