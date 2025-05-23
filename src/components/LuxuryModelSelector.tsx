
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ModelItem from "./ModelItem";
import { cn } from "@/lib/utils";

export interface FanModel {
  id: string;
  name: string;
  description?: string;
}

interface ModelSelectorProps {
  models: FanModel[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

const LuxuryModelSelector: React.FC<ModelSelectorProps> = ({ 
  models, 
  selectedModel, 
  onSelectModel 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Ensure activeIndex matches selectedModel
  useEffect(() => {
    const index = models.findIndex(model => model.id === selectedModel);
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [selectedModel, models, activeIndex]);

  const handleNext = () => {
    const newIndex = activeIndex < models.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(newIndex);
    onSelectModel(models[newIndex].id);
  };

  const handlePrev = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : models.length - 1;
    setActiveIndex(newIndex);
    onSelectModel(models[newIndex].id);
  };

  return (
    <div className="relative h-24 flex items-center justify-center w-full">
      <div className="relative flex items-center justify-center max-w-md w-full">
        {/* Left arrow navigation - positioned further to the left */}
        <button 
          onClick={handlePrev}
          className={cn(
            "absolute left-0 md:-left-32 p-2 rounded-full bg-white/90 hover:bg-amber-100 shadow-md",
            "transition-all duration-200 hover:scale-110 z-20"
          )}
          aria-label="Previous model"
        >
          <ChevronLeft className="h-4 w-4 text-gray-700" />
        </button>
        
        {/* Model content */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            {models.map((model, index) => (
              <ModelItem
                key={model.id}
                model={model}
                index={index}
                activeIndex={activeIndex}
                itemCount={models.length}
                onSelect={() => {
                  setActiveIndex(index);
                  onSelectModel(model.id);
                }}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* Right arrow navigation - positioned further to the right */}
        <button 
          onClick={handleNext}
          className={cn(
            "absolute right-0 md:-right-32 p-2 rounded-full bg-white/90 hover:bg-amber-100 shadow-md",
            "transition-all duration-200 hover:scale-110 z-20"
          )}
          aria-label="Next model"
        >
          <ChevronRight className="h-4 w-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default LuxuryModelSelector;
