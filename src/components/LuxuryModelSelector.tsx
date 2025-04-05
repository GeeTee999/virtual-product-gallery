
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ModelItem from "./ModelItem";

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
    <div className="relative h-24">
      <AnimatePresence mode="wait">
        {models.map((model, index) => (
          <ModelItem
            key={model.id}
            model={model}
            index={index}
            activeIndex={activeIndex}
            itemCount={models.length}
            onSelect={() => {}}
          />
        ))}
      </AnimatePresence>
      
      {/* Model navigation */}
      <div className="flex items-center space-x-4 mt-2">
        <button 
          onClick={handlePrev}
          className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-amber-800" />
        </button>
        
        <div className="h-0.5 flex-grow bg-gradient-to-r from-amber-200 to-amber-500 rounded-full relative">
          {models.map((_, idx) => (
            <motion.div 
              key={idx}
              className={`absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full 
                ${idx === activeIndex ? 'bg-amber-600' : 'bg-amber-300'}`}
              style={{ left: `${(idx / (models.length - 1)) * 100}%` }}
            />
          ))}
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-amber-600 rounded-full shadow-md"
            animate={{ left: `${(activeIndex / (models.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        <button 
          onClick={handleNext}
          className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-amber-800" />
        </button>
      </div>
    </div>
  );
};

export default LuxuryModelSelector;
