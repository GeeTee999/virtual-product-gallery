
import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import ThreeScene from "./ThreeScene";
import ColorSelector from "./ColorSelector";
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
      
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-3 mt-2`}>
        {/* Body Color Selection */}
        <ColorSelector 
          title="Body Color"
          options={COLOR_OPTIONS} 
          selectedColor={bodyColor} 
          onSelectColor={setBodyColor} 
        />
        
        {/* Blade Color Selection */}
        <ColorSelector 
          title="Blade Color"
          options={COLOR_OPTIONS} 
          selectedColor={bladeColor} 
          onSelectColor={setBladeColor} 
        />
        
        {/* Luxury LED Light Button */}
        <div className="my-3 max-w-xs mx-auto w-full">
          <div 
            className={`
              relative overflow-hidden rounded-xl shadow-md transition-all duration-300
              ${ledLightOn ? 'bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-300' : 'bg-gradient-to-r from-slate-100 to-slate-200'}
              cursor-pointer
            `}
            onClick={() => setLedLightOn(prev => !prev)}
          >
            <div className="p-4 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1">LED Light</h3>
                
                <div className={`
                  p-2 rounded-full transition-all duration-300 mx-auto flex items-center justify-center
                  ${ledLightOn ? 'bg-amber-500 text-white shadow-amber-300 shadow-lg' : 'bg-gray-300 text-gray-600'}
                `}>
                  <Lightbulb 
                    size={20} 
                    className={`${ledLightOn ? 'animate-pulse' : ''}`}
                  />
                </div>
              </div>
            </div>
            
            {/* Light effect when turned on */}
            {ledLightOn && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 bg-amber-200 rounded-full blur-3xl"></div>
              </div>
            )}
            
            <div className={`absolute bottom-0 left-0 h-1 transition-all duration-300 ${ledLightOn ? 'bg-amber-400 w-full' : 'bg-gray-400 w-1/4'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
