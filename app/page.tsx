import CardDisplay from "@/shared/components/card/card-display";
import FeatureDisplayCard from "@/shared/components/card/feature-display-card";
import HeroSection from "@/pages/home/components/hero-section";

const page = () => {
  return (
    <div className="bg-[rgb(44,52,64)]">
      <HeroSection />
      <CardDisplay showOverlay={true} size="lg" />
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
    </div>
  );
};

export default page;
