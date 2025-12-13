"use client";

import Navbar from "@/shared/components/navigation/navbar";
import { navbarLinks } from "@/shared/constants/navbar-links.constants";
import { useSearchQueryData } from "@/shared/stores/searchQueryStore";

const SearchPage = () => {
  const query = useSearchQueryData((query) => query.query);
  console.log(query);

  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={false}
      />
      <div className="w-4/5 mx-auto my-10">
        <h1 className="font-bold text-3xl">Search Results:</h1>
      </div>
    </div>
  );
};

export default SearchPage;
