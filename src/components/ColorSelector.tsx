
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
    <div className="my-6 max-w-md mx-auto">
      <div className="text-right mb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      
      <p className="text-sm text-gray-500 mb-2">{englishCaption}</p>
      
      <div className="flex justify-center gap-4 mt-2">
        {options.map((option) => (
          <button
            key={option.value}
            className={`
              w-10 h-10 rounded-full border-2 transition-all duration-200 transform
              ${selectedColor === option.value 
                ? 'border-blue-500 scale-110 shadow-lg' 
                : 'border-gray-300 hover:scale-105'}
              ${option.className}
            `}
            onClick={() => onSelectColor(option.value)}
            aria-label={`Select ${option.name}`}
            title={option.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
