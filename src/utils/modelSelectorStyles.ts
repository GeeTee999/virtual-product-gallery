
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

// Enhanced circular menu styles inspired by the reference image
export const circularMenuStyles = {
  container: "relative w-14 h-14",
  menu: "absolute z-30",
  trigger: "block w-14 h-14 rounded-full shadow-md text-center cursor-pointer outline-none transition-all duration-300 absolute top-0 left-0 z-10",
  menuWrapper: "absolute top-0 left-0 w-60 h-60 transform scale-0 opacity-0 transition-all duration-500 origin-center",
  menuWrapperActive: "scale-100 opacity-100",
  menuBackdrop: "absolute w-full h-full rounded-full transition-all duration-500 ease-in-out opacity-0 scale-0"
};

// Function to get positions for color options in a quarter-circle arrangement
export const getCircularPosition = (index: number, totalItems: number, radius: number = 80) => {
  // Quarter-circle arrangement with swapped positions
  let angle;
  
  // Place items in specific segments with top and bottom swapped as requested
  switch (index) {
    case 0: angle = 225; break; // Bottom-left
    case 1: angle = 315; break; // Bottom-right
    case 2: angle = 135; break; // Top-left
    case 3: angle = 45; break;  // Top-right
    default: angle = 0;
  }
  
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;
  
  return {
    transform: `translate(${x}px, ${y}px)`,
    transitionDelay: `${index * 60}ms`
  };
};

// Quarter-circle menu item styling with proper border radius
export const getQuarterCircleStyle = (index: number) => {
  // Border radius depends on which quadrant (with swapped positions)
  switch (index) {
    case 0: return "rounded-bl-full"; // Bottom-left
    case 1: return "rounded-br-full"; // Bottom-right
    case 2: return "rounded-tl-full"; // Top-left
    case 3: return "rounded-tr-full"; // Top-right
    default: return "";
  }
};

// Color options configuration
export const COLOR_OPTIONS = [
  { name: "Brown", value: "dark", className: "bg-amber-800" },
  { name: "Black", value: "black", className: "bg-black" },
  { name: "Silver", value: "silver", className: "bg-[#a0a0a0]" },
  { name: "White", value: "white", className: "bg-white" },
];
