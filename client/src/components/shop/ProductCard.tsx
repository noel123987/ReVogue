import { Link } from "wouter";
import { Heart } from "lucide-react";
import { formatPrice, formatCO2, getCategoryLabel, getOptimizedImageUrl } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isFavorite) {
        // Remove from wishlist - actual implementation would need wishlist item id
        await apiRequest('DELETE', `/api/wishlist/${product.id}`);
      } else {
        // Add to wishlist
        await apiRequest('POST', '/api/wishlist', { productId: product.id });
      }
      
      setIsFavorite(!isFavorite);
      toast({
        title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
        description: isFavorite ? "The item has been removed from your wishlist" : "The item has been added to your wishlist",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please sign in to save items to your wishlist",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={ROUTES.PRODUCT_DETAIL(product.id)}>
        <a className="block">
          <div className="relative overflow-hidden pb-[125%]">
            <img 
              src={getOptimizedImageUrl(product.imageUrl)}
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <Button 
                variant="outline"
                size="icon"
                className="bg-white rounded-full p-2 shadow-sm hover:bg-neutral-lightest transition-colors"
                onClick={handleFavoriteClick}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-accent text-accent' : 'text-neutral-dark'}`} />
              </Button>
            </div>
            <div className="absolute bottom-3 left-3 bg-secondary text-white text-xs font-medium px-2 py-1 rounded">
              CO₂ saved: {formatCO2(product.sustainabilityImpact)}
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{product.name}</h3>
              <span className="font-semibold">{formatPrice(product.price)}</span>
            </div>
            <p className="text-neutral-dark text-sm mb-2">
              {product.brand} • {product.size || 'One Size'}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-neutral-light px-2 py-1 rounded-full">
                {getCategoryLabel(product.category)}
              </span>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs ml-1">4.8 (24)</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
