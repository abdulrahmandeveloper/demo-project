import CompaniesSearchPage from "@/routes/companies/components/companies-search-page";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";

const page = () => {
  return (
    <div>
      <Navbar
        logoPath={"/images/avatar-image.jpg"}
        links={navbarLinks}
        search={false}
      />
      <CompaniesSearchPage />
    </div>
  );
};

export default page;
