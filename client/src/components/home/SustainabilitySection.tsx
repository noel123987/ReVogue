import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES, SUSTAINABILITY_BENEFITS } from "@/lib/constants";
import { ArrowRight, Recycle, Droplet, Cloud, Users } from "lucide-react";

const SustainabilitySection = () => {
  // Map icon names to components
  const getIcon = (name: string) => {
    switch (name) {
      case 'recycle':
        return <Recycle className="text-white" />;
      case 'droplet':
        return <Droplet className="text-white" />;
      case 'cloud':
        return <Cloud className="text-white" />;
      case 'users':
        return <Users className="text-white" />;
      default:
        return <Recycle className="text-white" />;
    }
  };
  
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-white text-primary text-sm font-medium rounded-full mb-4">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">Shop smarter, not harder, for our planet</h2>
            <p className="text-white/90 mb-8 text-lg">
              Every clothing purchase you make has an environmental footprint. At ReVogue, we're on a mission to make that footprint as small as possible through the power of circular fashion.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {SUSTAINABILITY_BENEFITS.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-secondary rounded-full p-3 mr-4">
                    {getIcon(benefit.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{benefit.title}</h3>
                    <p className="text-white/80 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <ButtonLink 
              href={ROUTES.SUSTAINABILITY} 
              className="bg-white hover:bg-neutral-lightest text-primary font-medium inline-flex items-center"
            >
              Visit Sustainability Hub
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80" 
              alt="Sustainable fashion production" 
              className="rounded-lg shadow-lg w-full"
            />
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-green-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-primary font-bold">Carbon Footprint Savings</h4>
                </div>
              </div>
              <div className="h-2 bg-neutral-light rounded-full">
                <div className="h-2 bg-secondary rounded-full w-[75%]"></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-neutral-dark text-xs">Q1 2023</span>
                <span className="text-primary font-medium text-xs">75% increase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
