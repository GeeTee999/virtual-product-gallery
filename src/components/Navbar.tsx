
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white z-50 shadow-md backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="font-serif text-2xl font-bold tracking-wider text-amber-300">
              LUXURY CEILING FANS
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/" label="Home" />
            <NavLink href="/shop" label="Shop" />
            <NavLink href="/gallery" label="Gallery" />
            <NavLink href="/about" label="About Us" />
            <NavLink href="/contact" label="Contact" />
            
            {/* Shopping Cart Icon */}
            <Link 
              to="/cart" 
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {/* Cart Item Count Badge - Uncomment when cart functionality is added */}
              {/* <span className="absolute -top-1 -right-1 bg-amber-500 text-xs text-white font-medium rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span> */}
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu} 
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-gray-900 shadow-lg",
        isMenuOpen ? "block" : "hidden"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink href="/" label="Home" onClick={toggleMenu} />
          <MobileNavLink href="/shop" label="Shop" onClick={toggleMenu} />
          <MobileNavLink href="/gallery" label="Gallery" onClick={toggleMenu} />
          <MobileNavLink href="/about" label="About Us" onClick={toggleMenu} />
          <MobileNavLink href="/contact" label="Contact" onClick={toggleMenu} />
          <MobileNavLink href="/cart" label="Shopping Cart" onClick={toggleMenu} />
        </div>
      </div>
    </nav>
  );
};

// Desktop Navigation Link
const NavLink = ({ href, label }: { href: string, label: string }) => (
  <Link 
    to={href} 
    className="relative text-gray-200 font-medium hover:text-white transition-colors duration-200 group"
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
  </Link>
);

// Mobile Navigation Link
const MobileNavLink = ({ 
  href, 
  label,
  onClick 
}: { 
  href: string, 
  label: string,
  onClick?: () => void
}) => (
  <Link
    to={href}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-gray-800 hover:text-white transition-colors"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;
