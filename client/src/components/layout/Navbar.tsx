import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES, PRODUCT_CATEGORIES } from "@/lib/constants";
import { Heart, ShoppingBag, Search, User, Menu, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/constants";

const Navbar = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: [API_ENDPOINTS.AUTH.ME],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={ROUTES.HOME}>
              <a className="flex items-center">
                <span className="font-poppins font-bold text-2xl text-black">
                  Re<span className="text-accent">Vogue</span>
                </span>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={ROUTES.HOME}>
              <a className={`font-medium ${isActive(ROUTES.HOME) ? 'text-primary' : 'text-neutral-darkest hover:text-primary'}`}>
                Home
              </a>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center font-medium ${isActive(ROUTES.SHOP) ? 'text-primary' : 'text-neutral-darkest hover:text-primary'}`}>
                  Shop
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {PRODUCT_CATEGORIES.map((category) => (
                  <DropdownMenuItem key={category.value} asChild>
                    <Link href={`${ROUTES.SHOP}?category=${category.value}`}>
                      <a className="block w-full">{category.label}</a>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link href={ROUTES.SHOP}>
                    <a className="block w-full">View All</a>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={ROUTES.SELL_UPLOAD}>
              <a className={`font-medium ${isActive(ROUTES.SELL_UPLOAD) ? 'text-primary' : 'text-neutral-darkest hover:text-primary'}`}>
                Sell/Upload
              </a>
            </Link>

            <Link href={ROUTES.SUSTAINABILITY}>
              <a className={`font-medium ${isActive(ROUTES.SUSTAINABILITY) ? 'text-primary' : 'text-neutral-darkest hover:text-primary'}`}>
                Sustainability
              </a>
            </Link>

            <Link href={ROUTES.ABOUT}>
              <a className={`font-medium ${isActive(ROUTES.ABOUT) ? 'text-primary' : 'text-neutral-darkest hover:text-primary'}`}>
                About
              </a>
            </Link>
          </div>

          {/* Right Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#">
              <a className="text-neutral-dark hover:text-primary">
                <Search className="h-5 w-5" />
              </a>
            </Link>

            <Link href="#">
              <a className="text-neutral-dark hover:text-primary">
                <Heart className="h-5 w-5" />
              </a>
            </Link>

            <Link href="#">
              <a className="text-neutral-dark hover:text-primary">
                <ShoppingBag className="h-5 w-5" />
              </a>
            </Link>

            {isLoading ? (
              <div className="h-5 w-5 animate-pulse bg-neutral-light rounded-full"></div>
            ) : user ? (
              <Link href={ROUTES.DASHBOARD}>
                <a className="text-neutral-dark hover:text-primary">
                  <User className="h-5 w-5" />
                </a>
              </Link>
            ) : (
              <ButtonLink href={ROUTES.LOGIN} variant="default" className="bg-primary hover:bg-primary-dark text-white">
                Sign In
              </ButtonLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6 text-neutral-darkest" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (hidden by default) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link href={ROUTES.HOME}>
              <a className={`block py-2 font-medium ${isActive(ROUTES.HOME) ? 'text-primary' : 'text-neutral-darkest hover:text-primary'}`}>
                Home
              </a>
            </Link>

            <div>
              <button className="flex justify-between items-center w-full py-2 font-medium text-neutral-darkest hover:text-primary">
                Shop
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="pl-4 pt-2 space-y-2">
                {PRODUCT_CATEGORIES.map((category) => (
                  <Link key={category.value} href={`${ROUTES.SHOP}?category=${category.value}`}>
                    <a className="block text-neutral-dark hover:text-primary">
                      {category.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            <Link href={ROUTES.SELL_UPLOAD}>
              <a className={`block py-2 font-medium ${isActive(ROUTES.SELL_UPLOAD) ? 'text-primary' : 'text-neutral-darkest hover:text-primary'}`}>
                Sell/Upload
              </a>
            </Link>

            <Link href={ROUTES.SUSTAINABILITY}>
              <a className={`block py-2 font-medium ${isActive(ROUTES.SUSTAINABILITY) ? 'text-primary' : 'text-neutral-darkest hover:text-primary'}`}>
                Sustainability
              </a>
            </Link>

            <Link href={ROUTES.ABOUT}>
              <a className={`block py-2 font-medium ${isActive(ROUTES.ABOUT) ? 'text-primary' : 'text-neutral-darkest hover:text-primary'}`}>
                About
              </a>
            </Link>

            <div className="pt-4 border-t border-neutral-light flex justify-between">
              <Link href="#">
                <a className="text-neutral-dark hover:text-primary">
                  <Search className="h-5 w-5" />
                </a>
              </Link>

              <Link href="#">
                <a className="text-neutral-dark hover:text-primary">
                  <Heart className="h-5 w-5" />
                </a>
              </Link>

              <Link href="#">
                <a className="text-neutral-dark hover:text-primary">
                  <ShoppingBag className="h-5 w-5" />
                </a>
              </Link>

              <Link href={ROUTES.DASHBOARD}>
                <a className="text-neutral-dark hover:text-primary">
                  <User className="h-5 w-5" />
                </a>
              </Link>
            </div>

            <ButtonLink 
              href={ROUTES.LOGIN} 
              className="block w-full text-center bg-primary hover:bg-primary-dark text-white mt-4"
            >
              Sign In
            </ButtonLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;