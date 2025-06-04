import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card"; // Optional: if slides are complex
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: string | number;
  src: string;
  alt: string;
  content?: React.ReactNode; // Optional custom content per slide
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  showArrows?: boolean;
  showDots?: boolean;
  autoplayDelay?: number; // in ms
  aspectRatio?: number; // e.g. 16/9 or 1/1
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  showArrows = true,
  showDots = true,
  autoplayDelay = 4000,
  aspectRatio = 16/9,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect(); // Set initial selected index
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  console.log("Rendering Carousel with", slides.length, "slides. Selected index:", selectedIndex);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="relative embla w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
              {slide.content ? (
                <Card className="m-1">
                  <CardContent className="flex items-center justify-center p-1">
                    {slide.content}
                  </CardContent>
                </Card>
              ) : (
                <AspectRatio ratio={aspectRatio} className="bg-muted">
                  <img
                    src={slide.src || '/placeholder.svg'}
                    alt={slide.alt}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                        console.warn(`Failed to load carousel image: ${slide.src}`);
                    }}
                  />
                </AspectRatio>
              )}
            </div>
          ))}
        </div>
      </div>

      {showArrows && emblaApi && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
            onClick={scrollPrev}
            disabled={!emblaApi?.canScrollPrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
            onClick={scrollNext}
            disabled={!emblaApi?.canScrollNext()}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </>
      )}

      {showDots && emblaApi && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === selectedIndex ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;