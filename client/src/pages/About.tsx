import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES } from "@/lib/constants";
import { ShieldCheck, Award, Sparkles, Heart, User, Clock, ArrowRight } from "lucide-react";

import { TEAM_MEMBERS } from "@/lib/team";

const About = () => {
  const teamMembers = [
    {
      name: "Maya Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      bio: "Former fashion executive with a passion for sustainability and technology. Maya founded ReVogue to transform how we consume fashion."
    },
    {
      name: "David Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
      bio: "AI expert with a background in sustainable engineering. David leads our technology innovation and circular fashion algorithms."
    },
    {
      name: "Zara Patel",
      role: "Head of Sustainability",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      bio: "Environmental scientist and former UN climate advisor. Zara ensures our operations align with the highest sustainability standards."
    },
    {
      name: "Marcus Williams",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      bio: "Fashion designer with a focus on upcycling and sustainable design. Marcus oversees our creative vision and upcycling partnerships."
    }
  ];

  // Partners
  const partners = [
    {
      name: "Sustainable Fashion Coalition",
      logo: "sustainable-fashion-coalition",
    },
    {
      name: "Circular Economy Alliance",
      logo: "circular-alliance",
    },
    {
      name: "Climate Action Network",
      logo: "climate-action",
    },
    {
      name: "Eco Textiles Initiative",
      logo: "eco-textiles",
    },
    {
      name: "Fashion Revolution",
      logo: "fashion-revolution",
    },
    {
      name: "Global Recycling Fund",
      logo: "global-recycling",
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-primary text-white py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins leading-tight">
                Our Story
              </h1>
              <p className="text-white text-lg md:text-xl opacity-90 mb-8">
                We're on a mission to revolutionize fashion consumption and reduce textile waste through technology and community.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-poppins">
                  Our Mission & Vision
                </h2>
                <p className="text-neutral-dark mb-4">
                  ReVogue was founded in 2022 with a clear purpose: to create a world where fashion doesn't come at the cost of our planet. We believe that by leveraging technology and community, we can transform how people consume, share, and think about clothing.
                </p>
                <p className="text-neutral-dark mb-8">
                  Our AI-powered platform makes it easy to extend the lifecycle of garments through thrifting, renting, and upcycling. We're aligned with the UN's Sustainable Development Goal 12 (Responsible Consumption & Production) and are committed to reducing fashion's environmental footprint.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-neutral-lightest p-4 rounded-lg">
                    <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-bold mb-1">Our Mission</h3>
                    <p className="text-sm text-neutral-dark">
                      To create an accessible circular fashion ecosystem that extends the lifecycle of clothing and reduces textile waste.
                    </p>
                  </div>

                  <div className="bg-neutral-lightest p-4 rounded-lg">
                    <Sparkles className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-bold mb-1">Our Vision</h3>
                    <p className="text-sm text-neutral-dark">
                      A world where circular fashion is the norm, not the exception, powered by technology and community.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {TEAM_MEMBERS.map((member, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-lg shadow-lg w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                      <h4 className="font-bold">{member.name}</h4>
                      <p className="text-sm text-gray-200">{member.title}</p>
                    </div>
                  </div>
                ))}

                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                  <h4 className="font-bold mb-2 text-primary">Our Impact So Far</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="font-medium">92M+</div>
                    <div className="text-neutral-dark">Tons of textile waste reduced</div>
                    <div className="font-medium">45K+</div>
                    <div className="text-neutral-dark">Active users</div>
                    <div className="font-medium">120K+</div>
                    <div className="text-neutral-dark">Carbon emissions saved (tons)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-neutral-lightest">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-poppins">Our Values</h2>
              <p className="text-neutral-dark">
                These core principles guide everything we do at ReVogue, from the technology we build to the partners we work with.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability First</h3>
                <p className="text-neutral-dark">
                  Environmental impact is considered in every decision we make, from our platform features to our operations and partnerships.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                <p className="text-neutral-dark">
                  We believe in the power of community to drive change. Our platform is built to connect like-minded individuals and amplify their collective impact.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Technological Innovation</h3>
                <p className="text-neutral-dark">
                  We leverage cutting-edge AI and technology to make sustainable fashion choices easier, more personalized, and more accessible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-poppins">Meet Our Team</h2>
              <p className="text-neutral-dark">
                Our diverse team brings together expertise in fashion, technology, and sustainability to create the future of circular fashion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-neutral-lightest rounded-lg overflow-hidden shadow-sm">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.role}</p>
                    <p className="text-neutral-dark text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-neutral-dark mb-4">
                We're growing! Join our team and help us build the future of sustainable fashion.
              </p>
              <ButtonLink
                href="#"
                className="bg-primary hover:bg-primary-dark text-white font-medium"
              >
                View Open Positions
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-neutral-lightest">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-poppins">Our Journey</h2>
              <p className="text-neutral-dark">
                From a small idea to a growing circular fashion platform, here's how ReVogue evolved
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="bg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                      1
                    </div>
                    <div className="h-full w-0.5 bg-neutral-light"></div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">The Beginning</h3>
                      <span className="text-sm text-neutral-dark">2022</span>
                    </div>
                    <p className="text-neutral-dark">
                      ReVogue began as a master's thesis project by our founder, Maya Johnson, exploring AI applications in sustainable fashion. After graduating, Maya assembled a small team of tech and fashion experts to turn the concept into reality.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="bg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                      2
                    </div>
                    <div className="h-full w-0.5 bg-neutral-light"></div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">First Platform Launch</h3>
                      <span className="text-sm text-neutral-dark">2022</span>
                    </div>
                    <p className="text-neutral-dark">
                      We launched our beta platform with just thrifted clothing, focusing on the New York City area. Our AI-powered tagging system and carbon footprint calculator were an immediate hit with early adopters.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="bg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                      3
                    </div>
                    <div className="h-full w-0.5 bg-neutral-light"></div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">Expansion to Rentals</h3>
                      <span className="text-sm text-neutral-dark">2023</span>
                    </div>
                    <p className="text-neutral-dark">
                      After securing seed funding, we expanded our platform to include fashion rentals, partnering with boutique designers who shared our sustainable values. This significantly increased our user base and environmental impact.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="bg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                      4
                    </div>
                    <div className="h-full w-0.5 bg-neutral-light"></div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">Upcycling Network</h3>
                      <span className="text-sm text-neutral-dark">2023</span>
                    </div>
                    <p className="text-neutral-dark">
                      We launched our upcycling marketplace, connecting skilled artisans with users looking to transform garments rather than discard them. This completed our circular fashion ecosystem.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="bg-primary text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center z-10">
                      5
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">Today and Beyond</h3>
                      <span className="text-sm text-neutral-dark">2024</span>
                    </div>
                    <p className="text-neutral-dark">
                      ReVogue now serves over 45,000 active users across North America, with plans to expand globally. We continue to refine our AI technology and forge partnerships with sustainable fashion brands and environmental organizations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-poppins">Our Partners</h2>
              <p className="text-neutral-dark">
                We collaborate with organizations that share our commitment to sustainability and circular fashion
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-6 bg-neutral-lightest rounded-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">{partner.logo[0].toUpperCase()}</span>
                  </div>
                  <h3 className="text-center font-medium">{partner.name}</h3>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-neutral-dark mb-4">
                Interested in partnering with ReVogue? We're always looking for organizations that align with our mission.
              </p>
              <ButtonLink
                href={ROUTES.CONTACT}
                className="bg-primary hover:bg-primary-dark text-white font-medium"
              >
                Become a Partner
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* SDG Alignment Section */}
        <section className="py-16 bg-neutral-lightest">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1607000975631-8328010cccd6?auto=format&fit=crop&w=800&q=80"
                  alt="Sustainable Development Goals"
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 font-poppins">
                  Aligned with UN Sustainable Development Goals
                </h2>
                <p className="text-neutral-dark mb-8">
                  Our work directly supports multiple UN Sustainable Development Goals, focusing primarily on SDG 12: Responsible Consumption and Production.
                </p>

                <div className="space-y-6">
                  <div className="flex">
                    <div className="bg-primary/10 rounded-full p-2 mr-4 h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">12</span>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">SDG 12: Responsible Consumption and Production</h3>
                      <p className="text-sm text-neutral-dark">
                        Our platform directly reduces textile waste and promotes sustainable resource use through circular fashion.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-primary/10 rounded-full p-2 mr-4 h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">13</span>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">SDG 13: Climate Action</h3>
                      <p className="text-sm text-neutral-dark">
                        By reducing the need for new production and extending garment lifecycles, we help mitigate fashion's carbon footprint.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="bg-primary/10 rounded-full p-2 mr-4 h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">8</span>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">SDG 8: Decent Work and Economic Growth</h3>
                      <p className="text-sm text-neutral-dark">
                        Our platform creates economic opportunities for sellers, renters, and upcyclers in the sustainable fashion space.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white font-poppins">
                Join Us in Revolutionizing Fashion
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Whether you're buying, selling, renting, or upcycling, your participation helps build a more sustainable fashion ecosystem
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <ButtonLink
                  href={ROUTES.SHOP}
                  className="bg-white hover:bg-neutral-lightest text-primary font-medium"
                >
                  Start Shopping
                </ButtonLink>
                <ButtonLink
                  href={ROUTES.CONTACT}
                  className="bg-transparent hover:bg-primary-dark border-2 border-white text-white font-medium"
                >
                  Contact Us
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

export default About;
