import Navbar from "@/components/navbar";
import { navbarLinks } from "@/utils/constants/navbar-links";

const page = () => {
  return (
    <div>
      <Navbar
        logo="/public/images/istar-logo.png"
        links={navbarLinks}
        search={false}
      />
    </div>
  );
};

export default page;
