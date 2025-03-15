import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { API_ENDPOINTS } from "@/lib/constants";
import { User, Product } from "@/lib/types";
import { formatPrice, getOptimizedImageUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { useToast } from "@/hooks/use-toast";
import {
  ShoppingBag,
  TrendingUp,
  Recycle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "lucide-react";


const ProductCarousel = ({ products, title, icon: Icon }: {
  products: Product[],
  title: string,
  icon: any
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`carousel-${title}`);
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

      container.scrollTo({
        left: newPosition,
        behavior: "smooth"
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div
          id={`carousel-${title}`}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {products.map(product => (
            <Card key={product.id} className="min-w-[250px] flex-shrink-0">
              <div className="relative h-40">
                <img
                  src={getOptimizedImageUrl(product.imageUrl)}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium mb-1">{product.name}</h3>
                <p className="text-primary font-semibold">
                  {formatPrice(product.price)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { data: user } = useQuery<User>({
    queryKey: [API_ENDPOINTS.AUTH.ME],
  });

  const { data: thriftProducts } = useQuery<Product[]>({
    queryKey: [`${API_ENDPOINTS.PRODUCTS.BASE}?category=thrift`],
    enabled: !!user,
  });

  const { data: rentalProducts } = useQuery<Product[]>({
    queryKey: [`${API_ENDPOINTS.PRODUCTS.BASE}?category=rental`],
    enabled: !!user,
  });

  const { data: upcycledProducts } = useQuery<Product[]>({
    queryKey: [`${API_ENDPOINTS.PRODUCTS.BASE}?category=upcycled`],
    enabled: !!user,
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-lightest py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.username}!</h1>
            <p className="text-neutral-dark mb-6">
              Explore our latest sustainable fashion collections
            </p>
            <Carousel />
          </div>

          <div className="space-y-12">
            <ProductCarousel
              products={thriftProducts || []}
              title="Trending Thrift"
              icon={TrendingUp}
            />

            <ProductCarousel
              products={upcycledProducts || []}
              title="Upcycled Collection"
              icon={Recycle}
            />

            <ProductCarousel
              products={rentalProducts || []}
              title="Available for Rent"
              icon={Clock}
            />
          </div>

          {user?.role === "seller" && (
            <div className="mt-12">
              <ButtonLink
                href="/sell-upload"
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                List New Item
              </ButtonLink>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;