
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  return <nav className="flex items-center justify-between p-4 w-full">
      <div className="text-xl font-bold">LUXURY CEILING FANS</div>
      <Button variant="ghost" aria-label="Menu">
        <Menu size={24} />
      </Button>
    </nav>;
};

export default Navbar;
