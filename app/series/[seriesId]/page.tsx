import { SeriesPage } from "@/routes/series/components/series-page";
import Navbar from "entry/shared/components/navigation/navbar";
import { navbarLinks } from "entry/shared/constants/navbar-links.constants";
const page = () => {
  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={true}
      />
      <SeriesPage />
    </div>
  );
};

export default page;
