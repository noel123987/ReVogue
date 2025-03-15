
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { User, Product } from "@/shared/schema";
import { API_ENDPOINTS } from "@/lib/constants";
import { TrendingUp, Recycle, Clock, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

  const categoryImages = {
    thrift: [
      "/attached_assets/WhatsApp Image 2025-03-15 at 10.22.36_ebe0c1e7_1742018904537.jpg",
      "/attached_assets/WhatsApp Image 2025-03-15 at 11.02.57_9167f998_1742018981064.jpg"
    ],
    rental: [
      "/attached_assets/WhatsApp Image 2025-03-15 at 10.59.06_1f6f5edb_1742018965667.jpg",
      "/attached_assets/WhatsApp Image 2025-03-15 at 11.08.25_264987fb_1742018887981.jpg"
    ],
    upcycled: [
      "/attached_assets/WhatsApp Image 2025-03-15 at 11.08.10_849b8fb9_1742018948212.jpg",
      "/attached_assets/WhatsApp Image 2025-03-15 at 11.08.25_f9f32858_1742019196736.jpg"
    ]
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-lightest py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome back, {user?.username}! 👋</h1>
            <p className="text-neutral-dark text-lg">
              Discover sustainable fashion that matches your style. Browse our curated collections below.
            </p>
          </div>

          {/* Category Carousels */}
          <div className="space-y-16">
            {/* Thrift Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Badge className="bg-primary mb-2">Thrift</Badge>
                  <h2 className="text-2xl font-bold">Pre-loved Treasures</h2>
                </div>
                <Link href="/shop?category=thrift">
                  <a className="text-primary hover:text-primary-dark font-medium">View All</a>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryImages.thrift.map((img, i) => (
                  <div key={i} className="relative group overflow-hidden rounded-lg aspect-[3/4]">
                    <img 
                      src={img} 
                      alt="Thrift Fashion"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </section>

            {/* Rental Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Badge className="bg-secondary mb-2">Rental</Badge>
                  <h2 className="text-2xl font-bold">Luxury for Rent</h2>
                </div>
                <Link href="/shop?category=rental">
                  <a className="text-primary hover:text-primary-dark font-medium">View All</a>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryImages.rental.map((img, i) => (
                  <div key={i} className="relative group overflow-hidden rounded-lg aspect-[3/4]">
                    <img 
                      src={img} 
                      alt="Rental Fashion"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </section>

            {/* Upcycled Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Badge className="bg-accent mb-2">Upcycled</Badge>
                  <h2 className="text-2xl font-bold">Reimagined Fashion</h2>
                </div>
                <Link href="/shop?category=upcycled">
                  <a className="text-primary hover:text-primary-dark font-medium">View All</a>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryImages.upcycled.map((img, i) => (
                  <div key={i} className="relative group overflow-hidden rounded-lg aspect-[3/4]">
                    <img 
                      src={img} 
                      alt="Upcycled Fashion"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Seller CTA */}
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
