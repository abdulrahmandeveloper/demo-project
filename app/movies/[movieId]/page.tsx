import { MoviePage } from "@/routes/movies/components/movie-page";
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
      <MoviePage />
    </div>
  );
};

export default page;
