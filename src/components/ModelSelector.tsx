
import React, { useEffect } from "react";
import { useDialRotation } from "../hooks/useDialRotation";
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

const ModelSelector = ({ models, selectedModel, onSelectModel }: ModelSelectorProps) => {
  // Find index of the selected model
  const initialIndex = models.findIndex(model => model.id === selectedModel);
  
  const {
    dialRef,
    activeIndex,
    handleStart,
    handleMove,
    handleEnd,
    rotateToIndex
  } = useDialRotation({
    itemCount: models.length,
    initialIndex: initialIndex !== -1 ? initialIndex : 0,
    onRotate: (index) => onSelectModel(models[index].id)
  });

  // Setup event listeners
  useEffect(() => {
    const dialElement = dialRef.current;
    if (!dialElement) return;
    
    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (e.preventDefault) e.preventDefault();
      handleMove(e.clientX, e.clientY);
    };
    
    const onMouseUp = () => handleEnd();
    
    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    
    const onTouchMove = (e: TouchEvent) => {
      if (e.preventDefault) e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    
    const onTouchEnd = () => handleEnd();
    
    dialElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    dialElement.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    
    return () => {
      dialElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      
      dialElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [models, activeIndex, handleStart, handleMove, handleEnd]);

  return (
    <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30">
      <div className="relative h-48 w-48">
        {/* Outer circle for visual guidance */}
        <div className="absolute left-1/2 top-1/2 w-40 h-40 border border-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Circular dial menu */}
        <div 
          ref={dialRef}
          className="absolute left-1/2 top-1/2 w-40 h-40 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
        >
          {models.map((model, index) => (
            <ModelItem
              key={model.id}
              model={model}
              index={index}
              activeIndex={activeIndex}
              itemCount={models.length}
              onSelect={() => rotateToIndex(index)}
            />
          ))}
        </div>
        
        {/* Indicator for active selection - 3 o'clock position */}
        <div className="absolute right-0 top-1/2 h-4 w-4 bg-primary transform -translate-y-1/2 translate-x-1/2 rounded-full"></div>
        
        {/* Connecting line to the fan */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <div className="h-px w-6 bg-gray-300"></div>
        </div>
        
        {/* Hint text */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 mt-2">
          Drag to rotate
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
