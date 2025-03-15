import { Link } from "wouter";
import { Heart } from "lucide-react";
import { formatPrice, formatCO2, getCategoryLabel, getOptimizedImageUrl } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { apiRequestMethod } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  // Make sure product is valid before rendering
  if (!product || !product.id) {
    return null;
  }
  
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isFavorite) {
        // Remove from wishlist - actual implementation would need wishlist item id
        await apiRequestMethod('DELETE', `/api/wishlist/${product.id}`);
      } else {
        // Add to wishlist
        await apiRequestMethod('POST', '/api/wishlist', { productId: product.id });
      }
      
      setIsFavorite(!isFavorite);
      toast({
        title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
        description: isFavorite ? "The item has been removed from your wishlist" : "The item has been added to your wishlist",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Please sign in to add items to your wishlist",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={ROUTES.PRODUCT_DETAIL(product.id)}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <img 
            src={getOptimizedImageUrl(product.imageUrl)} 
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full w-8 h-8"
              onClick={handleFavoriteClick}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
            </Button>
          </div>
          {product.category && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-primary/80 backdrop-blur-sm text-white text-xs">
                {getCategoryLabel(product.category)}
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
          <div className="flex justify-between items-center">
            <p className="font-bold text-primary">{formatPrice(product.price)}</p>
            <div className="flex items-center text-xs text-gray-600">
              <Leaf className="h-3 w-3 mr-1 text-green-600" />
              <span>{formatCO2(product.sustainabilityImpact)} CO₂ saved</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
