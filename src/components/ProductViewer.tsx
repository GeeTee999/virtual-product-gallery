
import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import ThreeScene from "./ThreeScene";
import { MODEL_DATA } from "./CeilingFanModels";
import { useIsMobile } from "@/hooks/use-mobile";
import LuxuryModelSelector from "./LuxuryModelSelector";
import { getColorButtonStyle, circularMenuStyles } from "@/utils/modelSelectorStyles";

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
  const [bodyMenuActive, setBodyMenuActive] = useState(false);
  const [bladeMenuActive, setBladeMenuActive] = useState(false);
  const isMobile = useIsMobile();

  const toggleBodyMenu = () => setBodyMenuActive(prev => !prev);
  const toggleBladeMenu = () => setBladeMenuActive(prev => !prev);

  const handleBodyColorSelect = (color: string) => {
    setBodyColor(color);
  };

  const handleBladeColorSelect = (color: string) => {
    setBladeColor(color);
  };

  const getSelectedColor = (colorValue: string) => {
    return COLOR_OPTIONS.find(option => option.value === colorValue) || COLOR_OPTIONS[0];
  };

  const selectedBodyColor = getSelectedColor(bodyColor);
  const selectedBladeColor = getSelectedColor(bladeColor);

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
        <LuxuryModelSelector 
          models={MODEL_DATA}
          selectedModel={modelType}
          onSelectModel={setModelType}
        />
        
        {/* Control panel - positioned absolutely at the bottom of the scene */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-6">
          {/* Body Color Selection - Left */}
          <div className="relative">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-2">Body</span>
              <div 
                className={`${circularMenuStyles.container} ${bodyMenuActive ? 'active' : ''}`}
              >
                <button 
                  onClick={toggleBodyMenu}
                  className={`
                    ${circularMenuStyles.floatingBtn} 
                    ${bodyMenuActive ? circularMenuStyles.activeFloatingBtn : ''}
                    ${selectedBodyColor.className}
                  `}
                  aria-label="Toggle body color menu"
                >
                </button>
                
                {bodyMenuActive && (
                  <div className="absolute left-0 top-0 z-10">
                    {COLOR_OPTIONS.map((option, index) => {
                      // Calculate positions in a circle
                      const angle = (index * 90) * Math.PI / 180;
                      const radius = 70;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      
                      return (
                        <button
                          key={option.value}
                          className={`
                            absolute w-12 h-12 rounded-full transition-all duration-300 transform
                            ${option.className}
                            ${bodyColor === option.value ? 'ring-2 ring-amber-400 ring-offset-2' : ''}
                          `}
                          style={{ 
                            transform: `translate(${x}px, ${y}px)`,
                            transitionDelay: `${index * 50}ms`
                          }}
                          onClick={() => handleBodyColorSelect(option.value)}
                          title={option.name}
                        />
                      );
                    })}
                    
                    {/* Background circle that expands */}
                    <div 
                      className={`
                        absolute w-14 h-14 rounded-full ${selectedBodyColor.className} 
                        transition-all duration-300 ease-in-out
                        ${bodyMenuActive ? 'scale-[4]' : 'scale-100'}
                        opacity-30 -z-10
                      `}
                    />
                  </div>
                )}
              </div>
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
          <div className="relative">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-2">Blades</span>
              <div 
                className={`${circularMenuStyles.container} ${bladeMenuActive ? 'active' : ''}`}
              >
                <button 
                  onClick={toggleBladeMenu}
                  className={`
                    ${circularMenuStyles.floatingBtn} 
                    ${bladeMenuActive ? circularMenuStyles.activeFloatingBtn : ''}
                    ${selectedBladeColor.className}
                  `}
                  aria-label="Toggle blade color menu"
                >
                </button>
                
                {bladeMenuActive && (
                  <div className="absolute left-0 top-0 z-10">
                    {COLOR_OPTIONS.map((option, index) => {
                      // Calculate positions in a circle
                      const angle = (index * 90) * Math.PI / 180;
                      const radius = 70;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      
                      return (
                        <button
                          key={option.value}
                          className={`
                            absolute w-12 h-12 rounded-full transition-all duration-300 transform
                            ${option.className}
                            ${bladeColor === option.value ? 'ring-2 ring-amber-400 ring-offset-2' : ''}
                          `}
                          style={{ 
                            transform: `translate(${x}px, ${y}px)`,
                            transitionDelay: `${index * 50}ms`
                          }}
                          onClick={() => handleBladeColorSelect(option.value)}
                          title={option.name}
                        />
                      );
                    })}
                    
                    {/* Background circle that expands */}
                    <div 
                      className={`
                        absolute w-14 h-14 rounded-full ${selectedBladeColor.className} 
                        transition-all duration-300 ease-in-out
                        ${bladeMenuActive ? 'scale-[4]' : 'scale-100'}
                        opacity-30 -z-10
                      `}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
