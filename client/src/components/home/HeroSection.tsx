import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES, IMPACT_STATS } from "@/lib/constants";

const HeroSection = () => {
  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-poppins leading-tight mb-6">
            AI-powered circular fashion for a sustainable future
          </h1>
          <p className="text-white text-lg md:text-xl opacity-90 mb-8">
            Join the movement to reduce fashion waste through thrifting, renting, and upcycling your wardrobe.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <ButtonLink 
              href={`${ROUTES.SHOP}?category=thrift`} 
              className="bg-white hover:bg-neutral-lightest text-primary font-medium"
            >
              Explore Thrift
            </ButtonLink>
            <ButtonLink 
              href={`${ROUTES.SHOP}?category=rental`}
              className="bg-secondary hover:bg-secondary-light text-white font-medium"
            >
              Rent Fashion
            </ButtonLink>
            <ButtonLink 
              href={`${ROUTES.SHOP}?category=upcycled`}
              className="bg-accent hover:bg-accent-light text-white font-medium"
            >
              Upcycle & Resell
            </ButtonLink>
          </div>
          
          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-white">
            {IMPACT_STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
