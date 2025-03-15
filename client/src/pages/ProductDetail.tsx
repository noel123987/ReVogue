import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS, ROUTES } from "@/lib/constants";
import { apiRequest } from "@/lib/queryClient";
import { Product } from "@/lib/types";
import { formatPrice, formatCO2, getCategoryLabel, getOptimizedImageUrl } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Star, Leaf, Heart, ShoppingBag, Recycle, ArrowLeft, Truck, Calendar } from "lucide-react";

const ProductDetail = () => {
  const [match, params] = useRoute("/products/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [quantity, setQuantity] = useState(1);
  
  // Fetch product details
  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: [API_ENDPOINTS.PRODUCTS.DETAIL(Number(params?.id))],
    enabled: !!params?.id,
  });
  
  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: () => {
      return apiRequest('POST', '/api/orders', {
        totalAmount: product!.price * quantity,
        orderType: product!.category === 'rental' ? 'rental' : 'purchase',
        items: [
          {
            productId: product!.id,
            quantity,
            price: product!.price
          }
        ]
      });
    },
    onSuccess: () => {
      toast({
        title: "Added to cart",
        description: `${product!.name} has been added to your cart.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Please sign in to add items to your cart.",
        variant: "destructive",
      });
    }
  });
  
  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: () => {
      return apiRequest('POST', '/api/wishlist', {
        productId: product!.id
      });
    },
    onSuccess: () => {
      toast({
        title: "Added to wishlist",
        description: `${product!.name} has been added to your wishlist.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Please sign in to add items to your wishlist.",
        variant: "destructive",
      });
    }
  });
  
  const handleAddToCart = () => {
    addToCartMutation.mutate();
  };
  
  const handleAddToWishlist = () => {
    addToWishlistMutation.mutate();
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="bg-neutral-lightest py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-neutral-light rounded-lg w-full h-[500px]"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-neutral-light rounded w-3/4"></div>
                  <div className="h-6 bg-neutral-light rounded w-1/4"></div>
                  <div className="h-4 bg-neutral-light rounded w-full"></div>
                  <div className="h-4 bg-neutral-light rounded w-full"></div>
                  <div className="h-4 bg-neutral-light rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (isError || !product) {
    return (
      <>
        <Navbar />
        <main className="bg-neutral-lightest py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-neutral-dark mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate(ROUTES.SHOP)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <main className="bg-neutral-lightest py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(ROUTES.SHOP)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={getOptimizedImageUrl(product.imageUrl, 1200)}
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-neutral-lightest">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-400">
                    <Star className="fill-current mr-1 h-4 w-4" />
                    <Star className="fill-current mr-1 h-4 w-4" />
                    <Star className="fill-current mr-1 h-4 w-4" />
                    <Star className="fill-current mr-1 h-4 w-4" />
                    <Star className="fill-current mr-1 h-4 w-4" />
                    <span className="text-sm text-neutral-dark ml-1">(24 reviews)</span>
                  </div>
                  <div>
                    <Badge className="bg-secondary text-white">
                      <Leaf className="mr-1 h-3 w-3" /> 
                      CO₂ saved: {formatCO2(product.sustainabilityImpact)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <Badge variant="outline" className="mb-3">
                {getCategoryLabel(product.category)}
              </Badge>
              <h1 className="text-3xl font-bold mb-2 font-poppins">{product.name}</h1>
              <div className="text-2xl font-semibold mb-4 text-primary">
                {formatPrice(product.price)}
                {product.category === 'rental' && <span className="ml-1 text-sm font-normal text-neutral-dark">/day</span>}
              </div>
              
              <div className="space-y-1 mb-4">
                {product.brand && (
                  <p className="text-neutral-dark">
                    <span className="font-medium">Brand:</span> {product.brand}
                  </p>
                )}
                {product.size && (
                  <p className="text-neutral-dark">
                    <span className="font-medium">Size:</span> {product.size}
                  </p>
                )}
                {product.condition && (
                  <p className="text-neutral-dark">
                    <span className="font-medium">Condition:</span> {product.condition}
                  </p>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-neutral-dark">
                  {product.description}
                </p>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="border border-neutral-light rounded-md flex items-center mr-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                
                <Button 
                  className="flex-1 bg-primary hover:bg-primary-dark"
                  onClick={handleAddToCart}
                  disabled={addToCartMutation.isPending}
                >
                  {addToCartMutation.isPending ? (
                    <span className="animate-pulse">Adding...</span>
                  ) : (
                    <>
                      {product.category === 'rental' ? (
                        <>
                          <Calendar className="mr-2 h-4 w-4" />
                          Rent Now
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  size="icon"
                  className="ml-2"
                  onClick={handleAddToWishlist}
                  disabled={addToWishlistMutation.isPending}
                >
                  <Heart className={`h-4 w-4 ${addToWishlistMutation.isPending ? 'animate-pulse' : ''}`} />
                </Button>
              </div>
              
              {product.category === 'upcycled' && (
                <Button variant="outline" className="w-full mb-4">
                  <Recycle className="mr-2 h-4 w-4" />
                  Request Custom Upcycling
                </Button>
              )}
              
              <div className="border-t border-neutral-light pt-4 mt-4">
                <div className="flex items-start mb-3">
                  <Truck className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-neutral-dark">
                      On all orders within the U.S.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Leaf className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Sustainability Impact</h4>
                    <p className="text-sm text-neutral-dark">
                      By choosing this {getCategoryLabel(product.category).toLowerCase()} item, you're saving {formatCO2(product.sustainabilityImpact)} of CO₂ compared to buying new.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
