
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import ThreeScene from "./ThreeScene";
import ColorSelector from "./ColorSelector";
import { Button } from "./ui/button";

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

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="relative">
        <ThreeScene 
          fanColor={bodyColor} 
          bladeColor={bladeColor} 
          ledLightOn={ledLightOn} 
        />
        
        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button 
            className="bg-gray-100/80 hover:bg-gray-200 p-3 rounded-r-lg"
            aria-label="Previous model"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
        
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button 
            className="bg-gray-100/80 hover:bg-gray-200 p-3 rounded-l-lg"
            aria-label="Next model"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
      
      {/* Body Color Selection */}
      <ColorSelector 
        title="בחר צבע גוף"
        description="צבע גוף המאוורר"
        englishCaption="Fan body color selection"
        options={COLOR_OPTIONS} 
        selectedColor={bodyColor} 
        onSelectColor={setBodyColor} 
      />
      
      {/* Blade Color Selection */}
      <ColorSelector 
        title="בחר צבע להבים"
        description="צבע להבי המאוורר"
        englishCaption="Fan blades color selection"
        options={COLOR_OPTIONS} 
        selectedColor={bladeColor} 
        onSelectColor={setBladeColor} 
      />
      
      {/* Luxury LED Light Button */}
      <div className="my-6 max-w-md mx-auto">
        <div 
          className={`
            relative overflow-hidden rounded-xl shadow-lg transition-all duration-300
            ${ledLightOn ? 'bg-gradient-to-r from-amber-100 to-amber-200 border-2 border-amber-300' : 'bg-gradient-to-r from-slate-200 to-slate-300'}
            cursor-pointer
          `}
          onClick={() => setLedLightOn(prev => !prev)}
        >
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">LED Lighting</h3>
              <p className="text-sm text-gray-700">Premium built-in illumination</p>
            </div>
            
            <div className={`
              p-3 rounded-full transition-all duration-300 flex items-center justify-center
              ${ledLightOn ? 'bg-amber-500 text-white shadow-amber-300 shadow-lg' : 'bg-gray-300 text-gray-600'}
            `}>
              <Lightbulb 
                size={28} 
                className={`${ledLightOn ? 'animate-pulse' : ''}`}
              />
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
  );
};

export default ProductViewer;
