import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, ROUTES } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/button-link";
import ProductCard from "@/components/shop/ProductCard";
import { Product } from "@/lib/types";
import { ArrowRight } from "lucide-react";

type TabType = "thrift" | "rental" | "upcycled";

const FeaturedCollections = () => {
  const [activeTab, setActiveTab] = useState<TabType>("thrift");
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [`${API_ENDPOINTS.PRODUCTS.BASE}?category=${activeTab}`],
  });
  
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };
  
  return (
    <section className="py-16 bg-neutral-lightest">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 font-poppins">Featured Collections</h2>
        <p className="text-neutral-dark text-center mb-12 max-w-2xl mx-auto">
          Discover curated selections of sustainable fashion pieces that make a statement without harming our planet.
        </p>
        
        {/* Collection Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-neutral-light">
            <button 
              className={`px-4 md:px-6 py-3 font-medium ${activeTab === 'thrift' ? 'text-primary border-b-2 border-primary' : 'text-neutral-dark hover:text-primary'}`}
              onClick={() => handleTabChange('thrift')}
            >
              Trending Thrift
            </button>
            <button 
              className={`px-4 md:px-6 py-3 font-medium ${activeTab === 'rental' ? 'text-primary border-b-2 border-primary' : 'text-neutral-dark hover:text-primary'}`}
              onClick={() => handleTabChange('rental')}
            >
              Rental Fashion
            </button>
            <button 
              className={`px-4 md:px-6 py-3 font-medium ${activeTab === 'upcycled' ? 'text-primary border-b-2 border-primary' : 'text-neutral-dark hover:text-primary'}`}
              onClick={() => handleTabChange('upcycled')}
            >
              Upcycled Gems
            </button>
          </div>
        </div>
        
        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                <div className="relative pb-[125%] bg-neutral-light"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-neutral-light rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-light rounded w-1/2"></div>
                  <div className="h-4 bg-neutral-light rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products && products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-neutral-dark">No products found in this category yet.</p>
              </div>
            )}
          </div>
        )}
        
        <div className="text-center mt-10">
          <ButtonLink 
            href={`${ROUTES.SHOP}?category=${activeTab}`} 
            className="bg-primary hover:bg-primary-dark text-white font-medium inline-flex items-center"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
