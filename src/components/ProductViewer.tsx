
import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import ThreeScene from "./ThreeScene";
import { MODEL_DATA } from "./CeilingFanModels";
import { useIsMobile } from "@/hooks/use-mobile";
import LuxuryModelSelector from "./LuxuryModelSelector";
import { 
  circularMenuStyles, 
  getCircularPosition, 
  COLOR_OPTIONS 
} from "@/utils/modelSelectorStyles";

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
    setBodyMenuActive(false);
  };

  const handleBladeColorSelect = (color: string) => {
    setBladeColor(color);
    setBladeMenuActive(false);
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
        
        {/* Luxury Model selector - positioned lower */}
        <div className="absolute top-48 left-8 z-40 w-1/3">
          <LuxuryModelSelector 
            models={MODEL_DATA}
            selectedModel={modelType}
            onSelectModel={setModelType}
          />
        </div>
        
        {/* Control panel - positioned absolutely at the bottom of the scene */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-6">
          {/* Body Color Selection - Left */}
          <div className="relative">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-2">Body</span>
              <div className={circularMenuStyles.container}>
                {/* Trigger Button */}
                <button 
                  onClick={toggleBodyMenu}
                  className={`${circularMenuStyles.trigger} ${selectedBodyColor.className}`}
                  aria-label="Toggle body color menu"
                />
                
                {/* Menu Items */}
                <div className={`
                  ${circularMenuStyles.menuWrapper} 
                  ${bodyMenuActive ? circularMenuStyles.menuWrapperActive : ''}
                `}>
                  {COLOR_OPTIONS.map((option, index) => {
                    const position = getCircularPosition(index, COLOR_OPTIONS.length);
                    
                    return (
                      <button
                        key={option.value}
                        className={`
                          ${circularMenuStyles.menuItem}
                          ${option.className}
                          ${bodyColor === option.value ? 'ring-2 ring-amber-400 ring-offset-2' : ''}
                        `}
                        style={position}
                        onClick={() => handleBodyColorSelect(option.value)}
                        title={option.name}
                      />
                    );
                  })}
                  
                  {/* Expanding background circle */}
                  <div 
                    className={`
                      ${circularMenuStyles.menuBackdrop} 
                      ${selectedBodyColor.className}
                      ${bodyMenuActive ? 'scale-[4]' : 'scale-100'}
                    `}
                  />
                </div>
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
              <div className={circularMenuStyles.container}>
                {/* Trigger Button */}
                <button 
                  onClick={toggleBladeMenu}
                  className={`${circularMenuStyles.trigger} ${selectedBladeColor.className}`}
                  aria-label="Toggle blade color menu"
                />
                
                {/* Menu Items */}
                <div className={`
                  ${circularMenuStyles.menuWrapper} 
                  ${bladeMenuActive ? circularMenuStyles.menuWrapperActive : ''}
                `}>
                  {COLOR_OPTIONS.map((option, index) => {
                    const position = getCircularPosition(index, COLOR_OPTIONS.length);
                    
                    return (
                      <button
                        key={option.value}
                        className={`
                          ${circularMenuStyles.menuItem}
                          ${option.className}
                          ${bladeColor === option.value ? 'ring-2 ring-amber-400 ring-offset-2' : ''}
                        `}
                        style={position}
                        onClick={() => handleBladeColorSelect(option.value)}
                        title={option.name}
                      />
                    );
                  })}
                  
                  {/* Expanding background circle */}
                  <div 
                    className={`
                      ${circularMenuStyles.menuBackdrop}
                      ${selectedBladeColor.className} 
                      ${bladeMenuActive ? 'scale-[4]' : 'scale-100'}
                    `}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
