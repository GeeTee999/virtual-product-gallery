
import React, { useRef, useEffect, useState } from "react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const currentRotation = useRef(0);
  const lastRotation = useRef(0);
  const sensitivity = 0.25; // Lower means more sensitive rotation
  
  // Find index of the selected model
  useEffect(() => {
    const index = models.findIndex(model => model.id === selectedModel);
    if (index !== -1) {
      setActiveIndex(index);
      // Set initial rotation to position selected model at 3 o'clock
      const rotation = -index * (360 / models.length);
      currentRotation.current = rotation;
      lastRotation.current = rotation;
      updateMenuRotation(rotation);
    }
  }, [selectedModel, models]);

  // Handle mouse/touch events for the dial
  useEffect(() => {
    const menuElement = menuRef.current;
    if (!menuElement) return;

    const handleStart = (clientY: number) => {
      isDragging.current = true;
      startY.current = clientY;
      menuElement.style.transition = 'none';
    };

    const handleMove = (clientY: number) => {
      if (!isDragging.current) return;
      
      const deltaY = clientY - startY.current;
      const rotationDelta = deltaY * sensitivity;
      
      const newRotation = lastRotation.current + rotationDelta;
      currentRotation.current = newRotation;
      updateMenuRotation(newRotation);
      
      // Calculate new active index based on rotation
      const itemAngle = 360 / models.length;
      const normalizedRotation = ((newRotation % 360) + 360) % 360; // Keep between 0 and 360
      const calculatedIndex = Math.round(normalizedRotation / itemAngle) % models.length;
      const newIndex = (models.length - calculatedIndex) % models.length;
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        onSelectModel(models[newIndex].id);
      }
    };

    const handleEnd = () => {
      if (!isDragging.current) return;
      
      isDragging.current = false;
      lastRotation.current = currentRotation.current;
      
      // Snap to the closest model
      const itemAngle = 360 / models.length;
      const targetRotation = Math.round(currentRotation.current / itemAngle) * itemAngle;
      
      currentRotation.current = targetRotation;
      lastRotation.current = targetRotation;
      
      menuElement.style.transition = 'transform 0.3s ease-out';
      updateMenuRotation(targetRotation);
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => handleStart(e.clientY);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const onMouseUp = () => handleEnd();
    
    // Touch events
    const onTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientY);
    const onTouchEnd = () => handleEnd();
    
    menuElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    menuElement.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    
    return () => {
      menuElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      
      menuElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [models, activeIndex, onSelectModel]);

  // Update the visual rotation of the menu
  const updateMenuRotation = (rotation: number) => {
    if (menuRef.current) {
      menuRef.current.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    }
  };

  // Calculate position and style for each model item
  const getItemStyle = (index: number) => {
    const itemCount = models.length;
    const angle = (index * 360) / itemCount;
    const isActive = index === activeIndex;
    
    // Determine visual style based on position relative to active item
    const getVisualStyle = () => {
      if (isActive) {
        return "scale-110 opacity-100 font-semibold text-base z-20";
      }
      
      // Calculate position relative to active item (handle wrapping)
      const distance = Math.abs(
        ((index - activeIndex + itemCount) % itemCount) - 
        ((activeIndex - index + itemCount) % itemCount)
      );
      
      // Items at positions 1 o'clock and 5 o'clock
      if (distance === 1) {
        return "scale-90 opacity-60 text-sm z-10";
      }
      
      // Further away items
      return "scale-75 opacity-30 text-xs z-0";
    };

    return {
      transform: `rotate(${-angle}deg) translate(80px) rotate(${angle}deg)`,
      className: `absolute transform transition-all duration-300 p-2 cursor-pointer ${getVisualStyle()}`
    };
  };

  return (
    <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30">
      <div className="relative h-40 w-24">
        {/* Circular dial menu */}
        <div 
          ref={menuRef}
          className="absolute left-1/2 top-1/2 w-40 h-40 transform -translate-x-1/2 -translate-y-1/2 transition-transform"
          style={{ transform: "translate(-50%, -50%) rotate(0deg)" }}
        >
          {models.map((model, index) => {
            const { transform, className } = getItemStyle(index);
            return (
              <div
                key={model.id}
                style={{ transform }}
                className={className}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectModel(model.id);
                }}
              >
                <span className="whitespace-nowrap">{model.name}</span>
              </div>
            );
          })}
        </div>
        
        {/* Connecting line to the fan */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <div className="h-px w-6 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
