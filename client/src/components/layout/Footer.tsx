import { Link } from "wouter";
import { ROUTES } from "@/lib/constants";
import { 
  Instagram, 
  Linkedin, 
  Facebook
} from "lucide-react";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-darkest text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href={ROUTES.HOME}>
              <a className="inline-block mb-6">
                <span className="text-white font-poppins font-bold text-2xl">
                  Re<span className="text-accent">Vogue</span>
                </span>
              </a>
            </Link>
            <p className="text-neutral-light mb-6">
              AI-powered circular fashion platform working to reduce textile waste and make sustainable style accessible to all.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-light hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-light hover:text-white transition-colors">
                <FaPinterest size={20} />
              </a>
              <a href="#" className="text-neutral-light hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-neutral-light hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-lg">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`${ROUTES.SHOP}?category=thrift`}>
                  <a className="text-neutral-light hover:text-white transition-colors">Thrifted Clothing</a>
                </Link>
              </li>
              <li>
                <Link href={`${ROUTES.SHOP}?category=rental`}>
                  <a className="text-neutral-light hover:text-white transition-colors">Fashion Rentals</a>
                </Link>
              </li>
              <li>
                <Link href={`${ROUTES.SHOP}?category=upcycled`}>
                  <a className="text-neutral-light hover:text-white transition-colors">Upcycled Items</a>
                </Link>
              </li>
              <li>
                <Link href={ROUTES.SHOP}>
                  <a className="text-neutral-light hover:text-white transition-colors">New Arrivals</a>
                </Link>
              </li>
              <li>
                <Link href={ROUTES.SHOP}>
                  <a className="text-neutral-light hover:text-white transition-colors">Popular Brands</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-lg">Our Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href={ROUTES.ABOUT}>
                  <a className="text-neutral-light hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href={ROUTES.SUSTAINABILITY}>
                  <a className="text-neutral-light hover:text-white transition-colors">Sustainability</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-light hover:text-white transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-neutral-light hover:text-white transition-colors">Press</a>
              </li>
              <li>
                <a href="#" className="text-neutral-light hover:text-white transition-colors">Partners</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-lg">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link href={ROUTES.CONTACT}>
                  <a className="text-neutral-light hover:text-white transition-colors">Contact Us</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-light hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-neutral-light hover:text-white transition-colors">Shipping Info</a>
              </li>
              <li>
                <a href="#" className="text-neutral-light hover:text-white transition-colors">Returns Policy</a>
              </li>
              <li>
                <a href="#" className="text-neutral-light hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-dark flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-light text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ReVogue. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-neutral-light hover:text-white transition-colors text-sm">Terms of Service</a>
            <span className="text-neutral-dark">|</span>
            <a href="#" className="text-neutral-light hover:text-white transition-colors text-sm">Privacy Policy</a>
            <span className="text-neutral-dark">|</span>
            <a href="#" className="text-neutral-light hover:text-white transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
