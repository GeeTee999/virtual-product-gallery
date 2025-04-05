
import React from "react";

interface ColorOption {
  name: string;
  value: string;
  className: string;
}

interface ColorSelectorProps {
  title: string;
  description: string;
  englishCaption: string;
  options: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorSelector = ({ 
  title, 
  description, 
  englishCaption, 
  options, 
  selectedColor, 
  onSelectColor 
}: ColorSelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <h3 className="text-right text-xl font-semibold rtl text-gray-800">{title}</h3>
          <p className="text-right text-sm text-gray-500 rtl">{description}</p>
        </div>
      </div>
      
      {/* Color selector buttons */}
      <div className="flex justify-center gap-5 mt-3 mb-4">
        {options.map((option) => (
          <button
            key={option.name}
            className={`w-12 h-12 rounded-full border-2 shadow-lg transform transition-all duration-200 hover:scale-110 ${
              selectedColor === option.value
                ? "border-gold ring-2 ring-gold/50 ring-offset-2"
                : "border-gray-300"
            } ${option.className}`}
            onClick={() => onSelectColor(option.value)}
            aria-label={`Select ${option.name} color`}
            style={{
              background: option.className.includes("bg-white") ? "#ffffff" : undefined,
              boxShadow: selectedColor === option.value ? "0 4px 12px rgba(0,0,0,0.15)" : "0 2px 6px rgba(0,0,0,0.1)"
            }}
          />
        ))}
      </div>
      
      <div className="text-center mt-1 text-sm text-gray-500">
        <p>{englishCaption}</p>
      </div>
    </div>
  );
};

export default ColorSelector;
