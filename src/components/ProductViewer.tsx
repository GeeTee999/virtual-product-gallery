
import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import ThreeScene from "./ThreeScene";
import { MODEL_DATA } from "./CeilingFanModels";
import { useIsMobile } from "@/hooks/use-mobile";
import LuxuryModelSelector from "./LuxuryModelSelector";
import ColorSelector from "./ColorSelector";
import AnimatedColorSelector from "./AnimatedColorSelector";
import { 
  circularMenuStyles, 
  getCircularPosition, 
  getQuarterCircleStyle,
  COLOR_OPTIONS 
} from "@/utils/modelSelectorStyles";
import { cn } from "@/lib/utils";

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
        
        {/* Luxury Model selector - positioned above the fan with arrows on sides */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40 w-full px-4 flex justify-center">
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
              <AnimatedColorSelector 
                title="Body"
                options={COLOR_OPTIONS}
                selectedColor={bodyColor}
                onSelectColor={setBodyColor}
                position="left"
              />
            </div>
          </div>
          
          {/* LED Light Button - Center */}
          <button
            onClick={() => setLedLightOn(prev => !prev)}
            className={cn(
              "rounded-full transition-all duration-300 flex items-center justify-center z-10",
              "transform hover:scale-105 w-14 h-14",
              ledLightOn 
                ? 'bg-amber-500 text-white shadow-amber-300 shadow-lg' 
                : 'bg-gray-300 text-gray-600'
            )}
            aria-label="Toggle LED Light"
            title="LED Light"
          >
            <Lightbulb 
              size={24} 
              className={ledLightOn ? 'animate-pulse' : ''}
            />
          </button>
          
          {/* Blade Color Selection - Right */}
          <div className="relative">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-2">Blades</span>
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
      </div>
    </div>
  );
};

export default ProductViewer;
