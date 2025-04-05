
import React from "react";
import { Switch } from "@/components/ui/switch";

interface FeatureToggleProps {
  label: string;
  isActive: boolean;
  onToggle: () => void;
  isSelected?: boolean;
}

const FeatureToggle = ({ label, isActive, onToggle, isSelected = false }: FeatureToggleProps) => {
  return (
    <div 
      className={`flex items-center justify-between px-6 py-4 rounded-md ${
        isSelected ? "bg-gray-800 text-white" : "bg-gray-200"
      }`}
    >
      <span className="text-lg font-medium">{label}</span>
      <Switch 
        checked={isActive} 
        onCheckedChange={onToggle} 
      />
    </div>
  );
};

export default FeatureToggle;
