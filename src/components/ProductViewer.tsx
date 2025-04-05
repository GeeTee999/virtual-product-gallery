
import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import ThreeScene from "./ThreeScene";
import AnimatedColorSelector from "./AnimatedColorSelector";
import { useIsMobile } from "@/hooks/use-mobile";

const COLOR_OPTIONS = [
  { name: "Black", value: "black", className: "bg-black" },
  { name: "Dark Wood", value: "dark", className: "bg-[#3a2618]" },
  { name: "Silver", value: "silver", className: "bg-[#a0a0a0]" },
  { name: "White", value: "white", className: "bg-white" },
];

const ProductViewer = () => {
  const [bodyColor, setBodyColor] = useState("dark");
  const [bladeColor, setBladeColor] = useState("dark");
  const [ledLightOn, setLedLightOn] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="w-full mx-auto px-2 flex flex-col">
      <div className="relative">
        <ThreeScene 
          fanColor={bodyColor} 
          bladeColor={bladeColor} 
          ledLightOn={ledLightOn} 
        />
      </div>
      
      <div className="flex justify-between items-center mt-2 px-2 relative">
        {/* Body Color Selection - Left */}
        <div className="flex-1 flex justify-start">
          <AnimatedColorSelector 
            title="Body"
            options={COLOR_OPTIONS} 
            selectedColor={bodyColor} 
            onSelectColor={setBodyColor}
            position="left"
          />
        </div>
        
        {/* LED Light Button - Center */}
        <div className="mx-4">
          <button
            onClick={() => setLedLightOn(prev => !prev)}
            className={`
              p-2 rounded-full transition-all duration-300 flex items-center justify-center
              ${ledLightOn 
                ? 'bg-amber-500 text-white shadow-amber-300 shadow-lg' 
                : 'bg-gray-300 text-gray-600'}
            `}
            aria-label="Toggle LED Light"
            title="LED Light"
          >
            <Lightbulb 
              size={24} 
              className={`${ledLightOn ? 'animate-pulse' : ''}`}
            />
          </button>
        </div>
        
        {/* Blade Color Selection - Right */}
        <div className="flex-1 flex justify-end">
          <AnimatedColorSelector 
            title="Blades"
            options={COLOR_OPTIONS} 
            selectedColor={bladeColor} 
            onSelectColor={setBladeColor} 
            position="right"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
