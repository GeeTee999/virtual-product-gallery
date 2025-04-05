
import React from "react";

interface ColorOption {
  name: string;
  value: string;
  className: string;
}

interface ColorSelectorProps {
  options: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorSelector = ({ options, selectedColor, onSelectColor }: ColorSelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <h3 className="text-right text-xl font-semibold rtl text-gray-800">בחר צבע גוף</h3>
          <p className="text-right text-sm text-gray-500 rtl">צבע גוף המאוורר</p>
        </div>
      </div>
      
      {/* Color selector buttons */}
      <div className="flex justify-center gap-6 mt-4 mb-8">
        {options.map((option) => (
          <button
            key={option.name}
            className={`w-14 h-14 rounded-full border-2 shadow-lg transform transition-all duration-200 hover:scale-110 ${
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
      
      <div className="text-center mt-2 text-sm text-gray-500">
        <p>Fan body color selection</p>
      </div>
    </div>
  );
};

export default ColorSelector;
