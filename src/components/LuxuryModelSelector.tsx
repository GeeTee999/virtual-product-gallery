
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  // Ensure activeIndex matches selectedModel
  useEffect(() => {
    const index = models.findIndex(model => model.id === selectedModel);
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [selectedModel, models, activeIndex]);

  const handleModelSelect = (index: number) => {
    setActiveIndex(index);
    onSelectModel(models[index].id);
  };

  return (
    <div className="absolute bottom-24 left-0 right-0 z-40 px-8 py-2">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Custom navigation arrows */}
          <button 
            onClick={() => {
              const newIndex = activeIndex > 0 ? activeIndex - 1 : models.length - 1;
              handleModelSelect(newIndex);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
            aria-label="Previous model"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          
          <button 
            onClick={() => {
              const newIndex = activeIndex < models.length - 1 ? activeIndex + 1 : 0;
              handleModelSelect(newIndex);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
            aria-label="Next model"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
          
          <CarouselContent className="py-4">
            {models.map((model, index) => (
              <CarouselItem 
                key={model.id}
                className={`flex items-center justify-center cursor-pointer px-4 ${
                  activeIndex === index ? 'basis-1/2' : 'basis-1/4'
                } md:${
                  activeIndex === index ? 'basis-1/3' : 'basis-1/6'
                }`}
                onClick={() => handleModelSelect(index)}
              >
                <div 
                  className={`
                    relative rounded-lg bg-gradient-to-br
                    ${index === activeIndex ? 
                      'from-amber-100 to-amber-300 shadow-lg scale-110 border border-amber-200' :
                      'from-gray-100 to-gray-300 opacity-70'}
                    transition-all duration-500 ease-out
                    p-4 w-full h-full flex items-center justify-center
                  `}
                >
                  {/* Add subtle animation for selected model */}
                  {index === activeIndex && (
                    <>
                      <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-amber-400 rounded-lg opacity-30 blur-sm"></div>
                    </>
                  )}
                  
                  <span 
                    className={`
                      font-medium z-10 text-center py-2 px-4 rounded
                      ${index === activeIndex ? 
                        'text-gray-900 text-lg md:text-xl' : 
                        'text-gray-700 text-sm md:text-base'}
                    `}
                  >
                    {model.name}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
};

export default LuxuryModelSelector;
