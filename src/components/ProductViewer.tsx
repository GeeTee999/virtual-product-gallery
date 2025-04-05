
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

  // Get styles for body color menu
  const bodyMenuStyles = getCircularMenuStyles(bodyMenuOpen, 'left');
  // Get styles for blade color menu
  const bladeMenuStyles = getCircularMenuStyles(bladeMenuOpen, 'right');

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
        <div className="absolute top-16 left-8 z-40 w-1/3">
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
        
        {/* Body Color Circular Menu */}
        <div className="fixed left-4 bottom-4 transition-all duration-300 z-30">
          <div className={`relative ${bodyMenuOpen ? 'active' : ''}`}>
            {/* Toggle button */}
            <button 
              onClick={() => setBodyMenuOpen(!bodyMenuOpen)}
              className={`
                flex items-center justify-center w-14 h-14 rounded-full 
                bg-amber-500 text-white shadow-lg cursor-pointer z-40
                hover:bg-amber-600 transition-all duration-300
              `}
              aria-label="Toggle body color menu"
            >
              <Palette size={24} className={`transition-transform duration-300 ${bodyMenuOpen ? 'rotate-45' : ''}`} />
            </button>
            
            {/* Circular backdrop */}
            <div className={`
              absolute top-0 left-0 w-14 h-14 rounded-full
              bg-amber-500 transition-all duration-500 ease-in-out
              ${bodyMenuOpen ? 'scale-[5]' : 'scale-100'}
              z-20
            `}></div>
            
            {/* Menu items */}
            <div className="absolute top-0 left-0 w-full h-full z-30">
              {bodyMenuOpen && COLOR_OPTIONS.map((color, index) => {
                const angles = [-45, -135, -225, -315]; // Adjusted angles for better distribution
                const angle = angles[index];
                const radian = (angle * Math.PI) / 180;
                const distance = 70;
                const x = distance * Math.cos(radian);
                const y = distance * Math.sin(radian);
                const isSelected = bodyColor === color.value;
                const { className } = getColorButtonStyle(isSelected, color.className);
                
                return (
                  <button
                    key={color.value}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      transitionDelay: `${index * 0.05}s`
                    }}
                    className={className}
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
          </div>
        </div>
        
        {/* Blade Color Circular Menu */}
        <div className="fixed right-4 bottom-4 transition-all duration-300 z-30">
          <div className={`relative ${bladeMenuOpen ? 'active' : ''}`}>
            {/* Toggle button */}
            <button 
              onClick={() => setBladeMenuOpen(!bladeMenuOpen)}
              className={`
                flex items-center justify-center w-14 h-14 rounded-full 
                bg-amber-500 text-white shadow-lg cursor-pointer z-40
                hover:bg-amber-600 transition-all duration-300
              `}
              aria-label="Toggle blade color menu"
            >
              <Plus size={24} className={`transition-transform duration-300 ${bladeMenuOpen ? 'rotate-45' : ''}`} />
            </button>
            
            {/* Circular backdrop */}
            <div className={`
              absolute top-0 left-0 w-14 h-14 rounded-full
              bg-amber-500 transition-all duration-500 ease-in-out
              ${bladeMenuOpen ? 'scale-[5]' : 'scale-100'}
              z-20
            `}></div>
            
            {/* Menu items */}
            <div className="absolute top-0 left-0 w-full h-full z-30">
              {bladeMenuOpen && COLOR_OPTIONS.map((color, index) => {
                const angles = [45, 135, 225, 315]; // Adjusted angles for better distribution
                const angle = angles[index];
                const radian = (angle * Math.PI) / 180;
                const distance = 70;
                const x = distance * Math.cos(radian);
                const y = distance * Math.sin(radian);
                const isSelected = bladeColor === color.value;
                const { className } = getColorButtonStyle(isSelected, color.className);
                
                return (
                  <button
                    key={color.value}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      transitionDelay: `${index * 0.05}s`
                    }}
                    className={className}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
