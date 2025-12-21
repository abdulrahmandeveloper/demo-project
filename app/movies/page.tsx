import { MoviesList } from "@/routes/movies/components/movie-list";
import Navbar from "entry/shared/components/navigation/navbar";
import { navbarLinks } from "entry/shared/constants/navbar-links.constants";

const page = () => {
  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <MoviesList />
    </div>
  );
};

export default page;
