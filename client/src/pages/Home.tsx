import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import CategorySection from "@/components/home/CategorySection";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import SellerSection from "@/components/home/SellerSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Home = () => {
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
