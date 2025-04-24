
import React, { useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css"; // Import default styles
import { cn } from "@/lib/utils";

interface ColorTheme {
  name: string;
  type: string;
  className: string;
}

interface ColorPickerButtonProps {
  title: string;
  selectedColor: string;
  onColorSelect: (color: string) => void;
  position: "left" | "right";
}

const colorThemes: ColorTheme[] = [
  { name: "Blue", type: "primary", className: "blue-theme" },
  { name: "Red", type: "danger", className: "red-theme" },
  { name: "Green", type: "secondary", className: "green-theme" },
  { name: "Purple", type: "anchor", className: "purple-theme" }
];

// Map theme names to actual color values for the 3D model
const colorThemeToModelColor = {
  "Blue": "silver",
  "Red": "dark",
  "Green": "white",
  "Purple": "black"
};

const ColorPickerButton = ({ title, selectedColor, onColorSelect, position }: ColorPickerButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Find the theme name from model color value
  const getThemeNameFromColor = (modelColor: string) => {
    const entry = Object.entries(colorThemeToModelColor).find(([_, value]) => value === modelColor);
    return entry ? entry[0] : "Blue"; // Default to Blue
  };

  // Get the current theme name based on selected color
  const currentThemeName = getThemeNameFromColor(selectedColor);
  const currentTheme = colorThemes.find(theme => theme.name === currentThemeName) || colorThemes[0];

  return (
    <div style={{ padding: '10px', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '10px', fontSize: '14px' }}>{title}</h3>
      
      {/* Main color button */}
      <AwesomeButton
        type={currentTheme.type}
        className={cn(currentTheme.className, "main-button")}
        onPress={() => setIsOpen(!isOpen)}
      >
        {currentThemeName}
      </AwesomeButton>

      {/* Color options */}
      <div className={cn(
        "color-options",
        position === "left" ? "left-position" : "right-position",
        isOpen ? "options-visible" : "options-hidden"
      )}
      style={{
        display: isOpen ? 'flex' : 'none',
        position: 'absolute',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '10px',
        transition: 'all 0.3s ease',
        zIndex: 100,
      }}>
        {colorThemes.map((theme) => (
          <AwesomeButton
            key={theme.name}
            type={theme.type}
            className={theme.className}
            size="small"
            onPress={() => {
              onColorSelect(colorThemeToModelColor[theme.name]);
              setIsOpen(false);
            }}
            style={{ minWidth: '100px' }}
          >
            {theme.name}
          </AwesomeButton>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerButton;
