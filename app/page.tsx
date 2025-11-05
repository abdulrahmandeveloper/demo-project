import CardDisplay from "@/shared/components/card/card-display";
import HeroSection from "@/shared/components/hero-section";

const page = () => {
  return (
    <div className="bg-[rgb(44,52,64)]">
      <HeroSection />
      <CardDisplay />
    </div>
  );
};

export default page;
