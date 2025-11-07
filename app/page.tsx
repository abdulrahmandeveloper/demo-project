import CardDisplay from "@/shared/components/card/card-display";
import FeatureDisplayCard from "@/shared/components/card/feature-display-card";
import HeroSection from "@/pages/home/components/hero-section";
import Collections from "@/shared/components/collections";

const page = () => {
  return (
    <div className="bg-[rgb(44,52,64)]">
      <HeroSection />
      <div className="">
        <h2 className="w-4/5 mb-0 text-neutral-500 text-3xl mt-5 mx-auto">
          Reccomendations to you...
        </h2>
        <CardDisplay showOverlay={true} size="lg" limit={7} />
      </div>
      <p className="w-2/3 mx-auto mb-4 text-amber-100 opacity-90 text-lg">
        We let you to:
      </p>
      <FeatureDisplayCard />
      <div className="w-3/4 mx-auto mt-8">
        <p className="text-amber-200 opacity-50 text-sm">JUST REVIEWED...</p>
        <div className="border border-white opacity-25 m-1"></div>
        <CardDisplay showOverlay={false} size="sm" limit={12} />
      </div>
      <div className="w-3/5 mx-auto flex flex-col items-center justify-center pb-4">
        <p className="text-[#abc] text-3xl  m-1 my-3">
          Write and share reviews. Compile your own lists. Share your life in
          film.
        </p>
        <p className="text-[#abc] opacity-90 text-sm">
          Below are some popular global Collections .
          <span className="text-white text-md"> Sign up</span> to create your
          own.
        </p>
      </div>
      <div className="w-3/5 mx-auto mt-8">
        <p className="text-amber-200 opacity-50 text-sm">
          Popular Collections...
        </p>
        <div className="border border-white opacity-25 m-1"></div>
      </div>
      <Collections />
    </div>
  );
};

export default page;
