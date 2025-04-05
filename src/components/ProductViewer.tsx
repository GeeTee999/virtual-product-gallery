
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ThreeScene from "./ThreeScene";
import ColorSelector from "./ColorSelector";
import FeatureToggle from "./FeatureToggle";

const COLOR_OPTIONS = [
  { name: "Black", value: "black", className: "bg-black" },
  { name: "Dark Wood", value: "dark", className: "bg-[#3a2618]" },
  { name: "Silver", value: "silver", className: "bg-[#a0a0a0]" },
  { name: "White", value: "white", className: "bg-white" },
];

const ProductViewer = () => {
  const [selectedColor, setSelectedColor] = useState("dark");
  const [features, setFeatures] = useState({
    ledLight: true,
    wifi: false,
  });

  const handleToggleFeature = (feature: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="relative">
        <ThreeScene fanColor={selectedColor} />
        
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
      
      {/* Color Selection */}
      <ColorSelector 
        options={COLOR_OPTIONS} 
        selectedColor={selectedColor} 
        onSelectColor={setSelectedColor} 
      />
      
      {/* Feature Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 max-w-lg mx-auto">
        <FeatureToggle 
          label="LED Light" 
          isActive={features.ledLight} 
          onToggle={() => handleToggleFeature("ledLight")}
          isSelected={true} 
        />
        <FeatureToggle 
          label="Wi-Fi" 
          isActive={features.wifi} 
          onToggle={() => handleToggleFeature("wifi")}
        />
      </div>
    </div>
  );
};

export default ProductViewer;
