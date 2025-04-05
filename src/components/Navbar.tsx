import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
const Navbar = () => {
  return <nav className="flex items-center justify-between p-4 w-full">
      <div className="text-xl font-bold">LUXURY CEILING FANS</div>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="hover:text-primary/80 transition">Fans</a>
        <a href="#" className="hover:text-primary/80 transition">About</a>
        <a href="#" className="hover:text-primary/80 transition">Contact</a>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-blue-400">
          
        </div>
        <Button variant="ghost" className="md:hidden">
          <Menu size={24} />
        </Button>
      </div>
    </nav>;
};
export default Navbar;