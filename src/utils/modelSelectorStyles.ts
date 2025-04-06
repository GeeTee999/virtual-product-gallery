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

// Enhanced circular menu styles inspired by CodePen example
export const circularMenuStyles = {
  container: "relative",
  menu: "absolute z-30",
  trigger: "block w-14 h-14 rounded-full shadow-md text-white text-center cursor-pointer outline-none transition-all duration-300",
  menuWrapper: "absolute top-0 left-0 w-60 h-60 transform scale-0 opacity-0 transition-all duration-300 origin-center",
  menuWrapperActive: "scale-100 opacity-100",
  menuItem: "absolute w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform",
  menuBackdrop: "absolute w-14 h-14 rounded-full transition-all duration-500 ease-in-out opacity-30 -z-10"
};

// Function to get positions for color options in a circle
export const getCircularPosition = (index: number, totalItems: number, radius: number = 70) => {
  const angle = ((index * (360 / totalItems)) * Math.PI) / 180;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  return {
    transform: `translate(${x}px, ${y}px)`,
    transitionDelay: `${index * 50}ms`
  };
};

// Color options configuration
export const COLOR_OPTIONS = [
  { name: "Black", value: "black", className: "bg-black" },
  { name: "Dark Wood", value: "dark", className: "bg-[#3a2618]" },
  { name: "Silver", value: "silver", className: "bg-[#a0a0a0]" },
  { name: "White", value: "white", className: "bg-white" },
];
