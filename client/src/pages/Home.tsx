import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import CategorySection from "@/components/home/CategorySection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import SellerSection from "@/components/home/SellerSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/constants";
import { User } from "@/lib/types";

const Home = () => {
  // This is correctly placed inside the component
  const { data: user } = useQuery<User | null>({
    queryKey: [API_ENDPOINTS.AUTH.ME],
  });

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCollections />
        <CategorySection />
        <SustainabilitySection />
        <SellerSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Home;