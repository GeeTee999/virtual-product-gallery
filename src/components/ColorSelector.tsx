
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
      <div 
        className={`
          relative overflow-hidden rounded-xl shadow-lg transition-all duration-300
          bg-gradient-to-r from-slate-200 to-slate-300
          cursor-pointer
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">{englishCaption}</p>
          </div>
          
          <div className="text-right">
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-700">{description}</p>
          </div>
        </div>
        
        <div className="p-4 flex justify-center gap-4">
          {options.map((option) => (
            <button
              key={option.value}
              className={`
                w-8 h-8 rounded-full border-2 transition-all duration-200 transform
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
        
        <div className={`absolute bottom-0 left-0 h-1 transition-all duration-300 bg-gradient-to-r from-blue-400 to-blue-500 w-full`}></div>
      </div>
    </div>
  );
};

export default ColorSelector;
