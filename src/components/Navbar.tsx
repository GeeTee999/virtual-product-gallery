
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 w-full">
      <div className="text-xl font-bold">LUXURY CEILING FANS</div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="hover:text-primary/80 transition">Fans</a>
        <a href="#" className="hover:text-primary/80 transition">About</a>
        <a href="#" className="hover:text-primary/80 transition">Contact</a>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a9.96 9.96 0 0 1 7.5 3.5 9.96 9.96 0 0 1 0 13 9.96 9.96 0 0 1-13 0 9.96 9.96 0 0 1 0-13A9.96 9.96 0 0 1 12 2Z" />
            <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
            <path d="m16 8-1.5 1.5" />
            <path d="M9.5 14.5 8 16" />
            <path d="m16 16-1.5-1.5" />
            <path d="M9.5 9.5 8 8" />
          </svg>
        </div>
        <Button variant="ghost" className="md:hidden">
          <Menu size={24} />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
