
export const getModelItemStyle = (index: number, activeIndex: number, itemCount: number) => {
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

// New function for modern color button styles
export const getColorButtonStyle = (isSelected: boolean, colorClass: string) => {
  return {
    className: `
      relative w-12 h-12 rounded-full transition-all duration-300
      ${isSelected ? 'scale-110 shadow-lg z-20' : 'hover:scale-105 z-10'}
      before:content-[''] before:absolute before:inset-0 before:rounded-full before:shadow-inner
      after:content-[''] after:absolute after:inset-[3px] after:rounded-full after:${colorClass}
      after:transform after:transition-transform after:duration-300 after:ease-out
      ${isSelected ? 'ring-2 ring-amber-400 ring-offset-2' : ''}
    `
  };
};
