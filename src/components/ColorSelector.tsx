
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
    <div className="flex justify-center gap-4 mt-8">
      {options.map((option) => (
        <button
          key={option.name}
          className={`w-12 h-12 rounded-full border-2 ${
            selectedColor === option.value
              ? "border-blue-500"
              : "border-transparent"
          } ${option.className}`}
          onClick={() => onSelectColor(option.value)}
          aria-label={`Select ${option.name} color`}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
