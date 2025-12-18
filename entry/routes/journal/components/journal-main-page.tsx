import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";

const JournalMainPage = () => {
  return (
    <div className="w-9/10 mx-auto">
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={true}
      />
      <div className="">
        <h1>Reviews</h1>
      </div>
      <div className="">
        <h1 className="">Articles</h1>
      </div>
      <div className="">
        <h1>Interviews</h1>
      </div>
    </div>
  );
};

export default JournalMainPage;
