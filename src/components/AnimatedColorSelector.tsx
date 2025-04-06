
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ColorOption {
  name: string;
  value: string;
  className: string;
}

interface AnimatedColorSelectorProps {
  title: string;
  options: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
  position: "left" | "right";
}

const AnimatedColorSelector = ({
  title,
  options,
  selectedColor,
  onSelectColor,
  position
}: AnimatedColorSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Find the selected color option to display in the button
  const selectedOption = options.find(opt => opt.value === selectedColor) || options[0];
  
  // Calculate positions for the circle of colors
  const calculatePosition = (index: number, total: number) => {
    // Using quarter circle positioning - 4 positions as in the reference
    let angle;
    
    // Place items in specific segments with top and bottom swapped
    switch (index) {
      case 0: angle = 225; break; // Bottom-left
      case 1: angle = 315; break; // Bottom-right
      case 2: angle = 135; break; // Top-left
      case 3: angle = 45; break;  // Top-right
      default: angle = 0;
    }
    
    const radian = (angle * Math.PI) / 180;
    const radius = 50; // Distance from center button
    
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return { x, y, angle };
  };

  // Determine the quadrant styling (rounded corner)
  const getQuadrantStyle = (index: number) => {
    switch (index) {
      case 0: return "rounded-bl-full"; // Bottom-left
      case 1: return "rounded-br-full"; // Bottom-right
      case 2: return "rounded-tl-full"; // Top-left
      case 3: return "rounded-tr-full"; // Top-right
      default: return "";
    }
  };
  
  return (
    <div className="relative">
      {/* Main button showing selected color */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-full w-12 h-12 border-2 transition-all transform",
          selectedOption.className,
          selectedColor === selectedOption.value 
            ? 'border-blue-500 scale-110 shadow-lg z-10' 
            : 'border-gray-300'
        )}
        aria-label={`Select ${title} color: currently ${selectedOption.name}`}
        title={`${title} Color: ${selectedOption.name}`}
      >
        <span className="absolute -bottom-7 text-xs font-semibold text-center text-gray-700 whitespace-nowrap">
          {title}
        </span>
      </button>
      
      {/* Quadrant color options */}
      <div 
        className={cn(
          "absolute top-0 left-0 w-full h-full origin-center transform",
          "transition-all duration-300",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
        )}
      >
        {options.map((option, index) => {
          const { x, y } = calculatePosition(index, options.length);
          const quadrantStyle = getQuadrantStyle(index);
          
          return (
            <button
              key={option.value}
              className={cn(
                "absolute w-12 h-12 transition-all transform hover:scale-105",
                "origin-center border border-gray-200 shadow-md",
                option.className,
                quadrantStyle,
                selectedColor === option.value ? 'ring-2 ring-amber-400' : ''
              )}
              style={{ 
                transform: `translate(${x}px, ${y}px)`,
                transitionDelay: `${index * 60}ms`
              }}
              onClick={() => {
                onSelectColor(option.value);
              }}
              aria-label={`Select ${option.name}`}
              title={option.name}
            />
          );
        })}
        
        {/* Done button */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 text-xs bg-gray-200 px-2 py-1 rounded-full animate-fade-in"
            aria-label="Close color picker"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default AnimatedColorSelector;
