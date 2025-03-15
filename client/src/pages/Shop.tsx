import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { API_ENDPOINTS, PRODUCT_CATEGORIES, PRODUCT_SIZES, PRICE_RANGES } from "@/lib/constants";
import { Product, ProductFilters } from "@/lib/types";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Checkbox
} from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal } from "lucide-react";

// Add proper error handling in the Shop component
const Shop = () => {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const urlParams = new URLSearchParams(search);
  
  const [filters, setFilters] = useState<ProductFilters>({
    category: urlParams.get("category") as any || undefined,
    minPrice: undefined,
    maxPrice: undefined,
    size: undefined,
    brand: undefined
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  // Build query string for API request
  const buildQueryString = () => {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.minPrice !== undefined) queryParams.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) queryParams.append("maxPrice", filters.maxPrice.toString());
    if (filters.size) queryParams.append("size", filters.size);
    if (filters.brand) queryParams.append("brand", filters.brand);
    
    return queryParams.toString();
  };
  
  // Fetch products with filters
  const { data: products, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: [`${API_ENDPOINTS.PRODUCTS.BASE}?${buildQueryString()}`],
  });
  
  // Handle error state
  if (isError) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
            <p className="text-gray-600">
              {error instanceof Error ? error.message : "There was an error loading the products. Please try again."}
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Update URL when filters change
  useEffect(() => {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append("category", filters.category);
    if (filters.minPrice !== undefined) queryParams.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) queryParams.append("maxPrice", filters.maxPrice.toString());
    if (filters.size) queryParams.append("size", filters.size);
    if (filters.brand) queryParams.append("brand", filters.brand);
    
    const queryString = queryParams.toString();
    setLocation(`/shop${queryString ? `?${queryString}` : ''}`, { replace: true });
  }, [filters, setLocation]);
  
  const handleCategoryChange = (value: string) => {
    setFilters(prev => ({ ...prev, category: value as any }));
  };
  
  const handleSizeChange = (value: string) => {
    setFilters(prev => ({ ...prev, size: value }));
  };
  
  const handlePriceRangeChange = (range: { min: number, max: number | null }) => {
    setFilters(prev => ({ 
      ...prev, 
      minPrice: range.min,
      maxPrice: range.max
    }));
  };
  
  const clearAllFilters = () => {
    setFilters({
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      size: undefined,
      brand: undefined
    });
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Get the title based on category filter
  const getPageTitle = () => {
    if (!filters.category) return "All Products";
    
    const category = PRODUCT_CATEGORIES.find(cat => cat.value === filters.category);
    return category ? category.label : "Products";
  };
  
  return (
    <>
      <Navbar />
      <main className="bg-neutral-lightest py-8 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-poppins">{getPageTitle()}</h1>
            <p className="text-neutral-dark mt-2">
              Discover sustainable fashion pieces curated for style and environmental impact.
            </p>
          </div>
          
          <div className="lg:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={toggleFilters}
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`w-full lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl flex items-center">
                    <SlidersHorizontal className="mr-2 h-5 w-5" />
                    Filters
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" defaultValue={["category", "price", "size"]}>
                    <AccordionItem value="category">
                      <AccordionTrigger>Category</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {PRODUCT_CATEGORIES.map((category) => (
                            <div key={category.value} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`category-${category.value}`} 
                                checked={filters.category === category.value}
                                onCheckedChange={() => handleCategoryChange(category.value)}
                              />
                              <label 
                                htmlFor={`category-${category.value}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="price">
                      <AccordionTrigger>Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {PRICE_RANGES.map((range, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`price-${index}`} 
                                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                                onCheckedChange={() => handlePriceRangeChange({min: range.min, max: range.max})}
                              />
                              <label 
                                htmlFor={`price-${index}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {range.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="size">
                      <AccordionTrigger>Size</AccordionTrigger>
                      <AccordionContent>
                        <Select value={filters.size} onValueChange={handleSizeChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {PRODUCT_SIZES.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="brand">
                      <AccordionTrigger>Brand</AccordionTrigger>
                      <AccordionContent>
                        <Input 
                          placeholder="Search brands" 
                          value={filters.brand || ''} 
                          onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
            
            {/* Products Grid */}
            <div className="w-full lg:w-3/4">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
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
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="bg-neutral-light rounded-full p-4 mb-4">
                    <Filter className="h-8 w-8 text-neutral-dark" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-neutral-dark mb-6 max-w-md">
                    We couldn't find any products matching your current filters. Try adjusting your filters or check back later.
                  </p>
                  <Button onClick={clearAllFilters}>Clear All Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shop;
