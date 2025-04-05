import React, { useRef, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: true,
  });
  
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedModelIndex = models.findIndex(model => model.id === selectedModel);

  useEffect(() => {
    if (emblaApi) {
      const handleSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };
      
      setScrollSnaps(emblaApi.scrollSnapList());
      emblaApi.on("select", handleSelect);
      emblaApi.scrollTo(selectedModelIndex !== -1 ? selectedModelIndex : 0);
      
      return () => {
        emblaApi.off("select", handleSelect);
      };
    }
  }, [emblaApi, selectedModelIndex]);

  const getPositionClass = (index: number) => {
    const diff = (index - selectedIndex + models.length) % models.length;
    
    // Model is selected (3 o'clock position)
    if (diff === 0) {
      return "opacity-100 text-base font-semibold scale-110 translate-x-0";
    }
    
    // Model is at 1 o'clock (above)
    if (diff === models.length - 1 || diff === -1) {
      return "opacity-50 text-sm font-normal scale-90 translate-y-[-1rem] translate-x-[-0.5rem]";
    }
    
    // Model is at 5 o'clock (below)
    if (diff === 1) {
      return "opacity-50 text-sm font-normal scale-90 translate-y-[1rem] translate-x-[-0.5rem]";
    }
    
    // Other models are further away and less visible
    return "opacity-30 text-xs font-light scale-75";
  };

  return (
    <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30">
      <div className="relative h-40 w-24 overflow-hidden">
        <div className="h-full w-full" ref={emblaRef}>
          <div className="flex flex-col h-full">
            {models.map((model, index) => (
              <div 
                key={model.id} 
                className={`
                  flex items-center justify-start transition-all duration-300 my-2
                  cursor-pointer p-2 min-h-[3rem]
                  ${getPositionClass(index)}
                `}
                onClick={() => {
                  onSelectModel(model.id);
                  emblaApi?.scrollTo(index);
                }}
              >
                <span className="whitespace-nowrap">{model.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Connecting line to the fan */}
        <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
          <div className="h-px w-6 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
