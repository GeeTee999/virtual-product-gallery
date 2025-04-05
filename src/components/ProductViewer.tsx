
import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import ThreeScene from "./ThreeScene";
import { MODEL_DATA } from "./CeilingFanModels";
import { useIsMobile } from "@/hooks/use-mobile";
import LuxuryModelSelector from "./LuxuryModelSelector";
import { getColorButtonStyle } from "@/utils/modelSelectorStyles";

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
          <div className="flex flex-col items-center gap-2 z-20">
            <span className="text-sm font-medium text-gray-700">Body</span>
            <div className="flex gap-3">
              {COLOR_OPTIONS.map((option) => {
                const isSelected = bodyColor === option.value;
                const { className } = getColorButtonStyle(isSelected, option.className);
                
                return (
                  <button
                    key={option.value}
                    className={className}
                    onClick={() => setBodyColor(option.value)}
                    title={option.name}
                    aria-label={`Set body color to ${option.name}`}
                  />
                );
              })}
            </div>
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
              w-14 h-14
            `}
            aria-label="Toggle LED Light"
            title="LED Light"
          >
            <Lightbulb 
              size={24} 
              className={`${ledLightOn ? 'animate-pulse' : ''}`}
            />
          </button>
          
          {/* Blade Color Selection - Right */}
          <div className="flex flex-col items-center gap-2 z-20">
            <span className="text-sm font-medium text-gray-700">Blades</span>
            <div className="flex gap-3">
              {COLOR_OPTIONS.map((option) => {
                const isSelected = bladeColor === option.value;
                const { className } = getColorButtonStyle(isSelected, option.className);
                
                return (
                  <button
                    key={option.value}
                    className={className}
                    onClick={() => setBladeColor(option.value)}
                    title={option.name}
                    aria-label={`Set blade color to ${option.name}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
