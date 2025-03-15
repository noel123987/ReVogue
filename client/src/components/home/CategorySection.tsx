import { Link } from "wouter";
import { ROUTES, FEATURED_CATEGORIES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/utils";

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 font-poppins">Shop by Category</h2>
        <p className="text-neutral-dark text-center mb-12 max-w-2xl mx-auto">
          Discover how ReVogue is revolutionizing fashion consumption through our three core circular approaches.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_CATEGORIES.map((category, index) => (
            <div key={index} className="bg-neutral-lightest rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={getOptimizedImageUrl(category.image, 600)}
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.subtitle}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-dark mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary">{category.itemCount} items</span>
                  <Link href={`${ROUTES.SHOP}?category=${category.title.toLowerCase()}`}>
                    <a className="text-primary hover:text-primary-dark font-medium inline-flex items-center">
                      Shop Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
