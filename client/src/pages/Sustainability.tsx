import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Recycle,
  Droplet,
  Cloud,
  BookOpen,
  BarChart4,
  ArrowRight,
  Users,
  Zap,
} from "lucide-react";

const Sustainability = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="bg-white text-primary mb-4">Sustainability Hub</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
                Making fashion sustainable, one garment at a time
              </h1>
              <p className="text-lg mb-8 text-white/90">
                Learn about the environmental impact of your fashion choices and how ReVogue is committed to creating a more sustainable fashion ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <ButtonLink
                  href="#carbon-tracker"
                  className="bg-white hover:bg-neutral-lightest text-primary font-medium"
                >
                  Carbon Footprint Tracker
                </ButtonLink>
                <ButtonLink
                  href="#learn"
                  className="bg-transparent hover:bg-primary-dark border-2 border-white text-white font-medium"
                >
                  Educational Resources
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-poppins">Why Circular Fashion Matters</h2>
              <p className="text-neutral-dark">
                The fashion industry is one of the largest polluters in the world. By embracing circular fashion, we can make a significant difference.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BarChart4 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">92 Million Tons</h3>
                  <p className="text-neutral-dark">
                    Textile waste produced annually by the fashion industry, most of which ends up in landfills
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Droplet className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">1,800 Gallons</h3>
                  <p className="text-neutral-dark">
                    Water required to produce a single pair of jeans, from cotton production to finished product
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Cloud className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">10% of Emissions</h3>
                  <p className="text-neutral-dark">
                    Global carbon emissions contributed by the fashion industry, more than aviation and shipping combined
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16 bg-neutral-lightest">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-poppins">Our Circular Approach</h2>
              <p className="text-neutral-dark">
                ReVogue is pioneering AI-powered circular fashion through three key pillars that extend the lifecycle of garments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-primary/5 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 16V8" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Thrift</h3>
                  <p className="text-neutral-dark mb-4">
                    Extending the life of clothing by giving pre-loved garments a second home, keeping quality items in circulation.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <Leaf className="h-4 w-4 mr-2" />
                    <span>Reduces waste and production demands</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-secondary/5 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-secondary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
                    <path d="M5 19.5C5.5 18 6 15 6 12" />
                    <path d="M22 12c0 5.5-4.5 10-10 10a10 10 0 0 1-8-4" />
                    <path d="M19 4.5C18.5 6 18 9 18 12" />
                    <path d="M12 12h0" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Rent</h3>
                  <p className="text-neutral-dark mb-4">
                    Maximizing the utility of garments by allowing multiple users to enjoy them without owning them permanently.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <Droplet className="h-4 w-4 mr-2" />
                    <span>Reduces overconsumption and waste</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-accent/5 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
                    <path d="M3 16c0 1 1 2 2 2h4c1 0 2-1 2-2" />
                    <path d="M21 16c0 1-1 2-2 2h-4c-1 0-2-1-2-2" />
                    <path d="M12 12h0" />
                    <path d="M3 9v10" />
                    <path d="M21 9v10" />
                    <path d="M12 12v4" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Upcycle</h3>
                  <p className="text-neutral-dark mb-4">
                    Transforming worn or damaged garments into new, more valuable products through creative redesign.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <Recycle className="h-4 w-4 mr-2" />
                    <span>Gives new life to textile waste</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carbon Tracker */}
        <section id="carbon-tracker" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-secondary text-white mb-4">Carbon Tracker</Badge>
                <h2 className="text-3xl font-bold mb-6 font-poppins">
                  Calculate Your Fashion Footprint
                </h2>
                <p className="text-neutral-dark mb-6">
                  Every clothing choice has an environmental cost. Our carbon tracker helps you understand the impact of your fashion decisions and how much you're saving by choosing circular fashion.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-neutral-lightest p-4 rounded-lg flex items-center">
                    <div className="bg-primary rounded-full p-2 mr-4">
                      <Leaf className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">One pre-loved t-shirt saves:</h4>
                      <p className="text-neutral-dark text-sm">
                        2.1 kg of CO₂ and 2,700 liters of water
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-lightest p-4 rounded-lg flex items-center">
                    <div className="bg-primary rounded-full p-2 mr-4">
                      <Leaf className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">A second-hand pair of jeans saves:</h4>
                      <p className="text-neutral-dark text-sm">
                        8.2 kg of CO₂ and 3,800 liters of water
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-lightest p-4 rounded-lg flex items-center">
                    <div className="bg-primary rounded-full p-2 mr-4">
                      <Leaf className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Renting a dress instead of buying saves:</h4>
                      <p className="text-neutral-dark text-sm">
                        12.5 kg of CO₂ and 5,000 liters of water
                      </p>
                    </div>
                  </div>
                </div>

                <ButtonLink
                  href={ROUTES.DASHBOARD}
                  className="bg-primary hover:bg-primary-dark text-white font-medium"
                >
                  <BarChart4 className="mr-2 h-4 w-4" />
                  View Your Impact Dashboard
                </ButtonLink>
              </div>

              <div className="bg-neutral-lightest rounded-lg p-8">
                <h3 className="text-xl font-bold mb-6 text-center">
                  CO₂ Savings Calculator
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      How many new clothing items do you typically buy per year?
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      defaultValue="25"
                      className="w-full h-2 bg-neutral-light rounded-md appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-neutral-dark mt-1">
                      <span>0</span>
                      <span>25</span>
                      <span>50+</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      What percentage of your wardrobe could you replace with pre-loved items?
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="50"
                      className="w-full h-2 bg-neutral-light rounded-md appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-neutral-dark mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-medium mb-3 text-center">Your Potential Impact</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-secondary rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">125.5 kg</div>
                        <p className="text-xs text-neutral-dark">CO₂ Saved Per Year</p>
                      </div>
                      <div className="border border-secondary rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">68,400 L</div>
                        <p className="text-xs text-neutral-dark">Water Saved Per Year</p>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm text-neutral-dark">
                      Equivalent to planting 6 trees or not driving for 310 miles
                    </div>
                  </div>

                  <ButtonLink
                    href={ROUTES.SHOP}
                    className="w-full bg-secondary hover:bg-secondary-dark text-white font-medium"
                  >
                    Start Your Sustainable Fashion Journey
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Resources */}
        <section id="learn" className="py-16 bg-neutral-lightest">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-primary text-white mb-4">Learn</Badge>
              <h2 className="text-3xl font-bold mb-4 font-poppins">
                Educational Resources
              </h2>
              <p className="text-neutral-dark">
                Expand your knowledge about sustainable fashion and its impact on the environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=800&q=80"
                    alt="Fast Fashion Impact"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="text-xs bg-primary inline-block px-2 py-1 rounded mb-2">
                        Article
                      </div>
                      <h3 className="text-lg font-bold">
                        The True Cost of Fast Fashion
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-neutral-dark text-sm mb-4">
                    Explore the environmental and social impacts of the fast fashion industry and why sustainable alternatives are crucial.
                  </p>
                  <a
                    href="#"
                    className="text-primary flex items-center text-sm font-medium"
                  >
                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80"
                    alt="Wardrobe Detox Guide"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="text-xs bg-secondary inline-block px-2 py-1 rounded mb-2">
                        Guide
                      </div>
                      <h3 className="text-lg font-bold">
                        How to Detox Your Wardrobe
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-neutral-dark text-sm mb-4">
                    A step-by-step guide to auditing your closet, identifying sustainable pieces, and responsibly removing what you don't need.
                  </p>
                  <a
                    href="#"
                    className="text-primary flex items-center text-sm font-medium"
                  >
                    Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1599710277661-f7aa6c640be6?auto=format&fit=crop&w=800&q=80"
                    alt="Sustainable Fabrics"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <div className="text-xs bg-accent inline-block px-2 py-1 rounded mb-2">
                        Guide
                      </div>
                      <h3 className="text-lg font-bold">
                        Sustainable Fabric Guide
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-neutral-dark text-sm mb-4">
                    Learn about eco-friendly fabrics and materials, their benefits, and how to identify them when shopping.
                  </p>
                  <a
                    href="#"
                    className="text-primary flex items-center text-sm font-medium"
                  >
                    Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 font-poppins">
                    Join Our Sustainability Workshop
                  </h3>
                  <p className="text-neutral-dark mb-6">
                    Learn practical skills to extend the life of your clothing, from basic repairs to creative upcycling techniques. Our monthly virtual workshops are free for ReVogue members.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <div className="bg-secondary rounded-full p-1 mr-3">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span>Basic clothing repair and maintenance</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-secondary rounded-full p-1 mr-3">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span>Creative upcycling techniques for beginners</span>
                    </li>
                    <li className="flex items-center">
                      <div className="bg-secondary rounded-full p-1 mr-3">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span>Sustainable care practices to extend garment life</span>
                    </li>
                  </ul>
                  <ButtonLink
                    href="#"
                    className="bg-primary hover:bg-primary-dark text-white font-medium"
                  >
                    Register for Next Workshop
                  </ButtonLink>
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-44e3e9699e2b?auto=format&fit=crop&w=800&q=80"
                    alt="Sustainability Workshop"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Stories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge className="bg-accent text-white mb-4">Community</Badge>
              <h2 className="text-3xl font-bold mb-4 font-poppins">
                Sustainability Success Stories
              </h2>
              <p className="text-neutral-dark">
                Meet ReVogue community members who are making a difference through their sustainable fashion choices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
                  alt="Emma's Story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <Badge className="mb-4">Community Spotlight</Badge>
                <h3 className="text-2xl font-bold mb-3 font-poppins">
                  Emma's Upcycling Journey
                </h3>
                <p className="text-neutral-dark mb-4">
                  "I started upcycling my old clothes during the pandemic as a creative outlet, and it's grown into a passion and side business. Through ReVogue, I've connected with customers who value handcrafted, one-of-a-kind pieces that tell a story."
                </p>
                <p className="text-neutral-dark mb-6">
                  Emma has transformed over 200 garments that would have otherwise ended up in landfills, saving an estimated 1,640 kg of CO₂ emissions.
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=150&h=150&q=80"
                    alt="Emma"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">Emma Rodriguez</div>
                    <div className="text-sm text-neutral-dark">Upcycling Artist</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-lightest rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=150&h=150&q=80"
                    alt="Michael"
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold">Michael's Rental Success</h4>
                    <p className="text-sm text-neutral-dark">
                      "I've saved thousands by renting formal wear for special occasions instead of buying pieces I'd only wear once."
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <Leaf className="h-4 w-4 text-secondary mr-1" />
                      <span className="text-secondary font-medium">
                        75.2 kg CO₂ saved
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-lightest rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=150&h=150&q=80"
                    alt="Aisha"
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold">Aisha's Thrifting Transformation</h4>
                    <p className="text-sm text-neutral-dark">
                      "I've built 90% of my wardrobe from thrifted pieces, saving money while discovering unique styles."
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <Leaf className="h-4 w-4 text-secondary mr-1" />
                      <span className="text-secondary font-medium">
                        127.8 kg CO₂ saved
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <ButtonLink
                href={ROUTES.SHOP}
                className="bg-primary hover:bg-primary-dark text-white font-medium"
              >
                Start Your Sustainability Journey
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-poppins">
                Together, we can transform fashion
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Join the ReVogue community today and be part of the circular fashion movement
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <ButtonLink
                  href={ROUTES.REGISTER}
                  className="bg-white hover:bg-neutral-lightest text-primary font-medium"
                >
                  Create Account
                </ButtonLink>
                <ButtonLink
                  href={ROUTES.SHOP}
                  className="bg-transparent hover:bg-primary-dark border-2 border-white text-white font-medium"
                >
                  Explore Products
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Sustainability;
