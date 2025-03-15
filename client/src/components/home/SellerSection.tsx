import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES, SELLER_BENEFITS } from "@/lib/constants";
import { ArrowRight, Check } from "lucide-react";

const SellerSection = () => {
  return (
    <section className="py-16 bg-neutral-lightest">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-4">
                Join Our Community
              </span>
              <h2 className="text-3xl font-bold mb-6 font-poppins">Turn your closet into a source of income</h2>
              <p className="text-neutral-dark mb-8">
                List your pre-loved fashion items, rent out special pieces, or showcase your upcycling skills. Our AI makes it simple to get started with automatic tagging and price suggestions.
              </p>
              
              <div className="space-y-4 mb-8">
                {SELLER_BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="text-primary mr-3">
                      <Check className="h-5 w-5" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              
              <ButtonLink 
                href={ROUTES.SELL_UPLOAD} 
                className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium"
              >
                Start Selling Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </div>
            
            <div className="relative min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80" 
                alt="Woman organizing clothes for selling" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerSection;
