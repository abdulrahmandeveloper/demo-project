import JournalMainPage from "@/routes/journal/components/journal-main-page";
import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
const page = () => {
  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={true}
      />
      <JournalMainPage />
    </div>
  );
};

export default page;
