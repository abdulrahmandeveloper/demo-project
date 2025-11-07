import Navbar from "@/shared/components/navbar";
import { navbarLinks } from "@/shared/lib/utils/constants/navbar-links";
import { Button } from "../../../shared/components/ui/button";
import HeroSlider from "./slide-show";

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <HeroSlider />

      <div className="absolute top-0 left-0 right-0 z-20">
        <Navbar
          logoPath="/images/istar-logo.png"
          links={navbarLinks}
          search={true}
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white space-y-6 pb-12 bg-black/40 z-10">
        <h2 className="w-[70%] md:w-[40%] font-bold text-4xl leading-snug">
          <p>Track films you&apos;ve watched.</p>
          <p>Save those you want to see.</p>
          <p>Tell your friends what&apos;s good.</p>
        </h2>

        <Button className="hover:cursor-pointer text-lg py-5 px-6">
          Get started, it&apos;s free!
        </Button>

        <p className="opacity-80">
          The social network for film lovers. Also available on
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
