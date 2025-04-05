
import { useRef, useState, useEffect } from "react";

interface UseDialRotationProps {
  itemCount: number;
  initialIndex: number;
  onRotate: (index: number) => void;
}

export const useDialRotation = ({ 
  itemCount, 
  initialIndex, 
  onRotate 
}: UseDialRotationProps) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const dialRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentRotation = useRef(0);
  const lastRotation = useRef(0);

  // Set initial rotation based on selected index
  useEffect(() => {
    if (initialIndex !== activeIndex) {
      setActiveIndex(initialIndex);
      const rotation = -initialIndex * (360 / itemCount);
      currentRotation.current = rotation;
      lastRotation.current = rotation;
      updateDialRotation(rotation);
    }
  }, [initialIndex, itemCount, activeIndex]);

  // Calculate angle between two points
  const getAngle = (clientX: number, clientY: number) => {
    if (!dialRef.current) return 0;
    
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  };

  // Handle start of drag
  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    startX.current = clientX;
    startY.current = clientY;
    if (dialRef.current) dialRef.current.style.transition = 'none';
  };

  // Handle movement during drag
  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    
    const startAngle = getAngle(startX.current, startY.current);
    const currentAngle = getAngle(clientX, clientY);
    const angleDelta = currentAngle - startAngle;
    
    const newRotation = lastRotation.current + angleDelta;
    currentRotation.current = newRotation;
    updateDialRotation(newRotation);
    
    startX.current = clientX;
    startY.current = clientY;
    lastRotation.current = newRotation;
    
    // Calculate new active index based on rotation
    const itemAngle = 360 / itemCount;
    const normalizedRotation = ((newRotation % 360) + 360) % 360;
    const calculatedIndex = Math.round(normalizedRotation / itemAngle) % itemCount;
    const newIndex = (itemCount - calculatedIndex) % itemCount;
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      onRotate(newIndex);
    }
  };

  // Handle end of drag
  const handleEnd = () => {
    if (!isDragging.current) return;
    
    isDragging.current = false;
    
    // Snap to the closest model position
    const itemAngle = 360 / itemCount;
    const targetRotation = Math.round(currentRotation.current / itemAngle) * itemAngle;
    
    currentRotation.current = targetRotation;
    lastRotation.current = targetRotation;
    
    if (dialRef.current) {
      dialRef.current.style.transition = 'transform 0.3s ease-out';
      updateDialRotation(targetRotation);
    }
  };

  // Update the visual rotation of the dial
  const updateDialRotation = (rotation: number) => {
    if (dialRef.current) {
      dialRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  };

  // Manually rotate to specific index
  const rotateToIndex = (index: number) => {
    const targetRotation = -index * (360 / itemCount);
    currentRotation.current = targetRotation;
    lastRotation.current = targetRotation;
    
    if (dialRef.current) {
      dialRef.current.style.transition = 'transform 0.3s ease-out';
      updateDialRotation(targetRotation);
    }
    
    setActiveIndex(index);
    onRotate(index);
  };

  return {
    dialRef,
    activeIndex,
    handleStart,
    handleMove,
    handleEnd,
    rotateToIndex
  };
};
