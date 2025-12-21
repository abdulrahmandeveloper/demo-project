import SeriesList from "entry/features/series/components/series-list";
import Navbar from "entry/shared/components/navigation/navbar";
import { navbarLinks } from "entry/shared/constants/navbar-links.constants";

const index = () => {
  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <SeriesList />
    </div>
  );
};

export default index;
