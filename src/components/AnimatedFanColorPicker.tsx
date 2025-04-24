
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ColorOption {
  name: string;
  value: string;
  className: string;
}

interface AnimatedFanColorPickerProps {
  title: string;
  selectedColor: string;
  onColorSelect: (color: string) => void;
  position: "left" | "right";
}

const AnimatedFanColorPicker = ({
  title,
  selectedColor,
  onColorSelect,
  position
}: AnimatedFanColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Define color options with fan matching colors
  const colorOptions: ColorOption[] = [
    { name: "Brown", value: "dark", className: "bg-amber-800 border border-amber-900" },
    { name: "Black", value: "black", className: "bg-black border border-gray-800" },
    { name: "Silver", value: "silver", className: "bg-[#a0a0a0] border border-gray-400" },
    { name: "White", value: "white", className: "bg-white border border-gray-300" },
  ];
  
  // Find the selected color option
  const selectedOption = colorOptions.find(opt => opt.value === selectedColor) || colorOptions[0];
  
  // Calculate positions for the fan-shaped color options
  const getFanPosition = (index: number) => {
    // Create fan-like spread for options
    const baseAngle = position === "left" ? -20 : 20;
    const spreadAngle = 25; // degrees between options
    const angle = baseAngle + (index * spreadAngle);
    const radian = (angle * Math.PI) / 180;
    
    // Distance from center button
    const radius = 55; 
    
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return { x, y, angle };
  };

  // Color option appears in fan shape with slight overlap
  return (
    <div className="relative flex flex-col items-center">
      <span className="absolute text-xs font-medium text-gray-700 whitespace-nowrap mb-1 -top-6">{title}</span>
      
      {/* Main button that shows current selection */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-md transition-all duration-300 hover:scale-105 z-10",
          selectedOption.className,
          isOpen ? "scale-110 ring-2 ring-amber-500" : ""
        )}
        aria-label={`Select ${title} color: currently ${selectedOption.name}`}
        title={`${title}: ${selectedOption.name}`}
      />
      
      {/* Fan-shaped color options */}
      <div className="absolute top-0 left-0 w-0 h-0">
        {colorOptions.map((option, index) => {
          const { x, y, angle } = getFanPosition(index);
          const isSelected = selectedColor === option.value;
          
          return (
            <button
              key={option.value}
              className={cn(
                "absolute w-12 h-12 rounded-full transition-all duration-300 transform origin-center shadow-md",
                option.className,
                isSelected ? "ring-2 ring-amber-400" : ""
              )}
              style={{ 
                transform: isOpen 
                  ? `translate(${x}px, ${y}px) rotate(${angle}deg) scale(1)` 
                  : `translate(0, 0) rotate(0deg) scale(0)`,
                opacity: isOpen ? 1 : 0,
                zIndex: isOpen ? 20 - index : 0,
                transitionDelay: `${index * 50}ms`
              }}
              onClick={() => {
                onColorSelect(option.value);
                setIsOpen(false);
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

export default AnimatedFanColorPicker;
