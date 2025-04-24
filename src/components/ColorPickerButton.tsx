
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorTheme {
  name: string;
  value: string;
  className: string;
}

interface ColorPickerButtonProps {
  title: string;
  selectedColor: string;
  onColorSelect: (color: string) => void;
  position: "left" | "right";
}

const colorThemes: ColorTheme[] = [
  { name: "Dark", value: "dark", className: "bg-amber-800 hover:bg-amber-700" },
  { name: "Black", value: "black", className: "bg-black hover:bg-gray-800" },
  { name: "Silver", value: "silver", className: "bg-[#a0a0a0] hover:bg-[#909090]" },
  { name: "White", value: "white", className: "bg-white hover:bg-gray-100 text-gray-800" }
];

const ColorPickerButton = ({ title, selectedColor, onColorSelect, position }: ColorPickerButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-gray-700 mb-2">{title}</span>
        
        {/* Main color button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-12 h-12 rounded-full p-0 transition-all duration-300",
            colorThemes.find(t => t.value === selectedColor)?.className
          )}
          aria-label={`Select ${title} color`}
        />
      </div>

      {/* Color options */}
      <div className={cn(
        "absolute bottom-0 transform transition-all duration-300",
        position === "left" ? "left-16" : "right-16",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
      )}>
        <div className="flex gap-2">
          {colorThemes.map((theme) => (
            <Button
              key={theme.value}
              className={cn(
                "w-10 h-10 rounded-full p-0 transform transition-all hover:scale-110",
                theme.className,
                selectedColor === theme.value && "ring-2 ring-blue-500"
              )}
              onClick={() => {
                onColorSelect(theme.value);
                setIsOpen(false);
              }}
              aria-label={`Select ${theme.name} color`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPickerButton;
