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
  const dialRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentRotation = useRef(0);
  const lastRotation = useRef(0);
  
  // Find index of the selected model
  useEffect(() => {
    const index = models.findIndex(model => model.id === selectedModel);
    if (index !== -1) {
      setActiveIndex(index);
      // Set initial rotation to position selected model at 3 o'clock
      const rotation = -index * (360 / models.length);
      currentRotation.current = rotation;
      lastRotation.current = rotation;
      updateDialRotation(rotation);
    }
  }, [selectedModel, models]);

  // Handle mouse/touch events for the dial
  useEffect(() => {
    const dialElement = dialRef.current;
    if (!dialElement) return;

    const getAngle = (clientX: number, clientY: number) => {
      if (!dialElement) return 0;
      
      // Get dial center coordinates
      const rect = dialElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle between center and pointer
      return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    };

    const handleStart = (clientX: number, clientY: number) => {
      isDragging.current = true;
      startX.current = clientX;
      startY.current = clientY;
      dialElement.style.transition = 'none';
    };

    const handleMove = (clientX: number, clientY: number) => {
      if (!isDragging.current) return;
      
      const startAngle = getAngle(startX.current, startY.current);
      const currentAngle = getAngle(clientX, clientY);
      const angleDelta = currentAngle - startAngle;
      
      // Update rotation based on angle change
      const newRotation = lastRotation.current + angleDelta;
      currentRotation.current = newRotation;
      updateDialRotation(newRotation);
      
      // Update start position for next move
      startX.current = clientX;
      startY.current = clientY;
      lastRotation.current = newRotation;
      
      // Calculate new active index based on rotation
      const itemAngle = 360 / models.length;
      const normalizedRotation = ((newRotation % 360) + 360) % 360;
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
      
      // Snap to the closest model position
      const itemAngle = 360 / models.length;
      const targetRotation = Math.round(currentRotation.current / itemAngle) * itemAngle;
      
      currentRotation.current = targetRotation;
      lastRotation.current = targetRotation;
      
      dialElement.style.transition = 'transform 0.3s ease-out';
      updateDialRotation(targetRotation);
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        e.preventDefault();
        handleMove(e.clientX, e.clientY);
      }
    };
    
    const onMouseUp = () => handleEnd();
    
    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
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
  }, [models, activeIndex, onSelectModel]);

  // Update the visual rotation of the dial
  const updateDialRotation = (rotation: number) => {
    if (dialRef.current) {
      dialRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  };

  // Calculate position and style for each model item
  const getItemStyle = (index: number) => {
    const itemCount = models.length;
    const angle = (index * 360) / itemCount;
    const radian = (angle * Math.PI) / 180;
    const radius = 80; // Distance from center
    
    // Calculate position
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    
    const isActive = index === activeIndex;
    
    // Keep text upright regardless of dial rotation
    const counterRotation = `rotate(${-angle}deg)`;
    
    // Determine visual style based on position relative to active item
    const getVisualStyle = () => {
      if (isActive) {
        return "scale-110 opacity-100 font-semibold text-base z-20 bg-white/80 shadow-md";
      }
      
      // Calculate position relative to active item (handle wrapping)
      const distance = Math.min(
        (index - activeIndex + itemCount) % itemCount,
        (activeIndex - index + itemCount) % itemCount
      );
      
      if (distance === 1) {
        return "scale-90 opacity-70 text-sm z-10";
      }
      
      return "scale-75 opacity-30 text-xs z-0";
    };

    return {
      transform: `rotate(${angle}deg) translate(${radius}px) ${counterRotation}`,
      className: `absolute px-2 py-1 rounded-md transition-all duration-300 cursor-pointer text-center transform-origin-center ${getVisualStyle()}`
    };
  };

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
                  
                  // Rotate to center the selected model
                  const targetRotation = -index * (360 / models.length);
                  currentRotation.current = targetRotation;
                  lastRotation.current = targetRotation;
                  
                  if (dialRef.current) {
                    dialRef.current.style.transition = 'transform 0.3s ease-out';
                    updateDialRotation(targetRotation);
                  }
                }}
              >
                {model.name}
              </div>
            );
          })}
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
