
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
    containScroll: false,
  });

  const selectedModelIndex = models.findIndex(model => model.id === selectedModel);

  // Set initial slide
  useEffect(() => {
    if (emblaApi && selectedModelIndex !== -1) {
      emblaApi.scrollTo(selectedModelIndex);
    }
  }, [emblaApi, selectedModelIndex]);

  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-20">
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        orientation="vertical"
        className="h-48 rounded-full"
      >
        <CarouselContent className="h-full -mt-3">
          {models.map((model, index) => {
            const isActive = model.id === selectedModel;
            
            return (
              <CarouselItem 
                key={model.id} 
                className="pt-3 basis-12 h-12"
              >
                <button
                  onClick={() => onSelectModel(model.id)}
                  className={`
                    w-full h-full flex items-center justify-center transition-all
                    ${isActive 
                      ? 'opacity-100 font-semibold text-base' 
                      : 'opacity-60 text-sm font-normal'}
                  `}
                >
                  {model.name}
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        
        <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
          <div className="h-px w-6 bg-gray-300"></div>
        </div>
        
        <CarouselPrevious 
          className="left-1/2 -translate-x-1/2 -top-6 rotate-0" 
          variant="ghost"
          size="sm"
        />
        <CarouselNext 
          className="left-1/2 -translate-x-1/2 -bottom-6 rotate-0" 
          variant="ghost"
          size="sm"
        />
      </Carousel>
    </div>
  );
};

export default ModelSelector;
