
import React, { useState } from "react";

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
  
  // Position styles based on left/right
  const positionClasses = position === "left" 
    ? "items-start" 
    : "items-end";
  
  // Colors container positioning
  const colorsContainerClasses = position === "left"
    ? "left-0 origin-left"
    : "right-0 origin-right";
    
  return (
    <div 
      className={`relative flex flex-col ${positionClasses}`}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Main button showing selected color */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative flex flex-col items-center rounded-full w-10 h-10 border-2 transition-all transform
          ${selectedColor === selectedOption.value 
            ? 'border-blue-500 scale-110 shadow-lg z-10' 
            : 'border-gray-300'}
          ${selectedOption.className}
        `}
        aria-label={`Select ${title} color: currently ${selectedOption.name}`}
        title={`${title} Color: ${selectedOption.name}`}
      >
        <span className="absolute -bottom-7 text-xs font-semibold text-gray-700">{title}</span>
      </button>
      
      {/* Animated color options */}
      <div 
        className={`
          absolute top-0 ${colorsContainerClasses}
          transition-all duration-300 transform
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col gap-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
          {options.map((option, index) => (
            <button
              key={option.value}
              className={`
                w-8 h-8 rounded-full border-2 transition-all transform
                ${selectedColor === option.value 
                  ? 'border-blue-500 scale-110 shadow-md' 
                  : 'border-gray-300 hover:scale-105'}
                ${option.className}
                animate-fade-in
                transition-all duration-200
              `}
              style={{ 
                animationDelay: `${index * 50}ms`,
              }}
              onClick={() => {
                onSelectColor(option.value);
                // Don't close immediately so user can see their selection
                setTimeout(() => setIsOpen(false), 500);
              }}
              aria-label={`Select ${option.name}`}
              title={option.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedColorSelector;
