
import React from "react";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

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
          className={cn(
            "w-16 h-16 rounded-full shadow-lg",
            "bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-800 dark:to-neutral-900",
            "flex items-center justify-center gap-2 text-sm font-medium",
            "z-20 transition-all duration-300 hover:scale-105 group",
            "border border-neutral-200 dark:border-neutral-700"
          )}
          aria-label={`${title} color selector`}
        >
          <Palette className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-amber-500 transition-colors" />
          <span className="text-neutral-700 dark:text-neutral-300">{title}</span>
        </button>

        {/* Outer Color Buttons */}
        {options.map((option, index) => {
          const angle = (index / options.length) * 360;
          const isSelected = selectedColor === option.value;

          return (
            <button
              key={option.value}
              className={cn(
                "absolute w-14 h-14 transition-all duration-500",
                "rounded-full border-2 hover:scale-110",
                "shadow-sm hover:shadow-md",
                option.className,
                isSelected 
                  ? "border-amber-500 scale-110 shadow-lg z-10" 
                  : "border-neutral-200 dark:border-neutral-700"
              )}
              style={{
                transform: `rotate(${angle}deg) translate(0, -100px) rotate(-${angle}deg)`,
                transitionDelay: `${index * 50}ms`,
              }}
              onClick={() => onSelectColor(option.value)}
              aria-label={`Select ${option.name}`}
              title={option.name}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shadow-inner"></div>
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

