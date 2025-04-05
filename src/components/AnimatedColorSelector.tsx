
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
  
  // Calculate positions for the circle of colors
  const calculatePosition = (index: number, total: number) => {
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep;
    const radius = 50; // Distance from center button
    
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return { x, y };
  };
  
  return (
    <div 
      className="relative"
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
        <span className="absolute -bottom-7 text-xs font-semibold text-center text-gray-700 w-16 -ml-3">{title}</span>
      </button>
      
      {/* Circular color options */}
      <div 
        className={`
          absolute top-0 left-0
          w-full h-full
          transition-all duration-300 transform
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}
        `}
      >
        {options.map((option, index) => {
          const { x, y } = calculatePosition(index, options.length);
          
          return (
            <button
              key={option.value}
              className={`
                absolute w-8 h-8 rounded-full border-2 transition-all transform
                ${selectedColor === option.value 
                  ? 'border-blue-500 scale-110 shadow-md' 
                  : 'border-gray-300 hover:scale-105'}
                ${option.className}
                animate-fade-in
              `}
              style={{ 
                transform: `translate(${x}px, ${y}px)`,
                transitionDelay: `${index * 50}ms`,
                zIndex: 20
              }}
              onClick={() => {
                onSelectColor(option.value);
                // Don't close immediately so user can see their selection
                setTimeout(() => setIsOpen(false), 500);
              }}
              aria-label={`Select ${option.name}`}
              title={option.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedColorSelector;
