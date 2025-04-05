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
  return;
};
export default ColorSelector;