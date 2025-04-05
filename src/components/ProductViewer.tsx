
import React, { useState } from "react";
import { Lightbulb, Plus, Palette } from "lucide-react";
import ThreeScene from "./ThreeScene";
import { MODEL_DATA } from "./CeilingFanModels";
import { useIsMobile } from "@/hooks/use-mobile";
import LuxuryModelSelector from "./LuxuryModelSelector";
import { getColorButtonStyle, getCircularMenuStyles } from "@/utils/modelSelectorStyles";

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
  const [bodyMenuOpen, setBodyMenuOpen] = useState(false);
  const [bladeMenuOpen, setBladeMenuOpen] = useState(false);
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
        
        {/* Luxury Model selector - moved lower */}
        <div className="absolute top-32 left-8 z-40 w-1/3">
          <LuxuryModelSelector 
            models={MODEL_DATA}
            selectedModel={modelType}
            onSelectModel={setModelType}
          />
        </div>
        
        {/* LED Light Button - Center Bottom */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={() => setLedLightOn(prev => !prev)}
            className={`
              rounded-full transition-all duration-300 flex items-center justify-center
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
        </div>
        
        {/* Body Color Menu - Left Bottom */}
        <div className="fixed left-4 bottom-4 z-30">
          <div className="relative">
            <button 
              onClick={() => setBodyMenuOpen(!bodyMenuOpen)}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-colors"
              aria-label="Toggle body color menu"
            >
              <Palette size={24} className={`transition-transform duration-300 ${bodyMenuOpen ? 'rotate-45' : ''}`} />
            </button>
            
            {bodyMenuOpen && (
              <div className="absolute bottom-16 left-0 flex flex-col gap-3 items-center">
                {COLOR_OPTIONS.map((color, index) => {
                  const isSelected = bodyColor === color.value;
                  return (
                    <button
                      key={color.value}
                      className={`
                        w-10 h-10 rounded-full border-2 transition-all
                        ${isSelected ? 'border-amber-500 shadow-lg' : 'border-gray-300'}
                        ${color.className}
                      `}
                      onClick={() => {
                        setBodyColor(color.value);
                        setBodyMenuOpen(false);
                      }}
                      title={`Body: ${color.name}`}
                      aria-label={`Set body color to ${color.name}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        {/* Blade Color Menu - Right Bottom */}
        <div className="fixed right-4 bottom-4 z-30">
          <div className="relative">
            <button 
              onClick={() => setBladeMenuOpen(!bladeMenuOpen)}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-colors"
              aria-label="Toggle blade color menu"
            >
              <Plus size={24} className={`transition-transform duration-300 ${bladeMenuOpen ? 'rotate-45' : ''}`} />
            </button>
            
            {bladeMenuOpen && (
              <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-center">
                {COLOR_OPTIONS.map((color, index) => {
                  const isSelected = bladeColor === color.value;
                  return (
                    <button
                      key={color.value}
                      className={`
                        w-10 h-10 rounded-full border-2 transition-all
                        ${isSelected ? 'border-amber-500 shadow-lg' : 'border-gray-300'}
                        ${color.className}
                      `}
                      onClick={() => {
                        setBladeColor(color.value);
                        setBladeMenuOpen(false);
                      }}
                      title={`Blades: ${color.name}`}
                      aria-label={`Set blade color to ${color.name}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
