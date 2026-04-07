import NewsIdPage from "@/routes/news/components/article-page";
import Navbar from "@/shared/components/navigation/navbar";

import { navbarLinks } from "@/shared/constants/navbar-links.constants";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);

  return (
    <div>
      <Navbar
        logoPath={"/images/istar-logo.png"}
        links={navbarLinks}
        search={true}
      />{" "}
      <NewsIdPage slug={decodedSlug} />
    </div>
  );
};

export default page;
