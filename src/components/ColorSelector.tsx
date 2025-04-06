
import React from "react";
import { cn } from "@/lib/utils";

interface ColorOption {
  name: string;
  value: string;
  className: string;
}

interface ColorSelectorProps {
  title: string;
  options: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorSelector = ({
  title,
  options,
  selectedColor,
  onSelectColor
}: ColorSelectorProps) => {
  return (
    <div className="my-3 relative w-64 h-64 mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central Circle */}
        <button 
          className={`
            w-16 h-16 rounded-full shadow-inner 
            bg-gradient-to-br from-gray-100 to-gray-200
            flex items-center justify-center text-sm font-medium
            z-20 transition-all duration-300
          `}
          aria-label={`${title} color selector`}
        >
          {title}
        </button>

        {/* Outer Buttons */}
        {options.map((option, index) => {
          const angle = (index / options.length) * 360; // Calculate angle for each button
          const isSelected = selectedColor === option.value;

          return (
            <button
              key={option.value}
              className={cn(
                "absolute w-14 h-14 transition-all duration-500",
                "rounded-full border-2 grayscale hover:grayscale-0 hover:scale-110",
                option.className,
                isSelected 
                  ? "border-gray-800 scale-110 grayscale-0 shadow-lg z-10" 
                  : "border-gray-300"
              )}
              style={{
                transform: `rotate(${angle}deg) translate(0, -100px) rotate(-${angle}deg)`,
                transitionDelay: `${index * 50}ms`,
              }}
              onClick={() => onSelectColor(option.value)}
              aria-label={`Select ${option.name}`}
              title={option.name}
            >
              {/* Optional: Add a subtle inner effect for selected state */}
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gray-800 animate-pulse"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
