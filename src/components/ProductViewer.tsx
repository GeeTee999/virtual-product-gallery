
import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import ThreeScene from "./ThreeScene";
import AnimatedColorSelector from "./AnimatedColorSelector";
import { MODEL_DATA } from "./CeilingFanModels";
import { useIsMobile } from "@/hooks/use-mobile";
import LuxuryModelSelector from "./LuxuryModelSelector";

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
  const [modelType, setModelType] = useState("classic");
  const isMobile = useIsMobile();

  return (
    <div className="w-full mx-auto px-2 flex flex-col">
      <div className="relative">
        <ThreeScene 
          fanColor={bodyColor} 
          bladeColor={bladeColor} 
          ledLightOn={ledLightOn}
          modelType={modelType} 
        />
        
        {/* Luxury Model selector */}
        <LuxuryModelSelector 
          models={MODEL_DATA}
          selectedModel={modelType}
          onSelectModel={setModelType}
        />
        
        {/* Control panel - positioned absolutely at the bottom of the scene */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-6">
          {/* Body Color Selection - Left */}
          <div className="relative z-20">
            <AnimatedColorSelector 
              title="Body"
              options={COLOR_OPTIONS} 
              selectedColor={bodyColor} 
              onSelectColor={setBodyColor}
              position="left"
            />
          </div>
          
          {/* LED Light Button - Center */}
          <button
            onClick={() => setLedLightOn(prev => !prev)}
            className={`
              rounded-full transition-all duration-300 flex items-center justify-center z-10
              ${ledLightOn 
                ? 'bg-amber-500 text-white shadow-amber-300 shadow-lg' 
                : 'bg-gray-300 text-gray-600'}
              transform hover:scale-105
            `}
            aria-label="Toggle LED Light"
            title="LED Light"
            style={{ 
              width: '50px', 
              height: '50px',
            }}
          >
            <Lightbulb 
              size={24} 
              className={`${ledLightOn ? 'animate-pulse' : ''}`}
            />
          </button>
          
          {/* Blade Color Selection - Right */}
          <div className="relative z-20">
            <AnimatedColorSelector 
              title="Blades"
              options={COLOR_OPTIONS} 
              selectedColor={bladeColor} 
              onSelectColor={setBladeColor} 
              position="right"
            />
          </div>
        </div>
        
        {/* Display the currently selected model name */}
        <div className="absolute top-4 right-6 bg-white/80 px-3 py-1 rounded-lg shadow-sm">
          <h3 className="text-gray-800 font-medium">{MODEL_DATA.find(m => m.id === modelType)?.name || "Classic"} Model</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
