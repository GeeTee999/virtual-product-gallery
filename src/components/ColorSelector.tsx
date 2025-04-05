
import React from "react";

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
    <div className="my-3 max-w-xs mx-auto">
      <div 
        className={`
          relative overflow-hidden rounded-xl shadow-md transition-all duration-300
          bg-gradient-to-r from-slate-100 to-slate-200
        `}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
          
          <div className="flex justify-center gap-3">
            {options.map((option) => (
              <button
                key={option.value}
                className={`
                  w-7 h-7 rounded-full border-2 transition-all duration-200 transform
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
        
        <div className={`absolute bottom-0 left-0 h-1 transition-all duration-300 bg-gradient-to-r from-blue-400 to-blue-500 w-full`}></div>
      </div>
    </div>
  );
};

export default ColorSelector;
