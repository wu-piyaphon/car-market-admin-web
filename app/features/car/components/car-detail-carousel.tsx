import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";

type CarDetailCarouselProps = {
  images: string[];
  className?: string;
};

export default function CarDetailCarousel({
  images,
  className,
}: CarDetailCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setDialogOpen(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!api || images.length === 0) return;

      if (e.key === "ArrowLeft") {
        const prevIndex =
          selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;

        setSelectedImageIndex(prevIndex);
        api.scrollTo(prevIndex);
      } else if (e.key === "ArrowRight") {
        const nextIndex =
          selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
        setSelectedImageIndex(nextIndex);
        api.scrollTo(nextIndex);
      } else if (e.key === "Escape" && dialogOpen) {
        setDialogOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [api, images.length, dialogOpen, selectedImageIndex]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Carousel */}
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <button
                onClick={() => handleImageClick(index)}
                className="w-full cursor-zoom-in"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="h-[400px] w-full rounded-lg object-cover transition-opacity hover:opacity-90"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
          {current} / {images.length}
        </div>
      </Carousel>

      {/* Thumbnail Gallery Carousel */}
      <div
        ref={thumbnailRef}
        className="scrollbar-hide flex gap-2 overflow-x-auto pb-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "flex-shrink-0 rounded-md transition-all",
              current === index + 1
                ? "outline-2 outline-offset-1 outline-blue-500"
                : "cursor-pointer hover:opacity-80"
            )}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="h-16 w-20 rounded-md object-cover"
            />
          </button>
        ))}
      </div>

      {/* Image Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          showCloseButton
          className="!max-w-[90vw] border-none p-0"
        >
          <DialogTitle className="sr-only">Enlarged Image View</DialogTitle>
          <DialogDescription className="sr-only">
            Enlarged view of image {selectedImageIndex + 1} of {images.length}
          </DialogDescription>
          <img
            src={images[selectedImageIndex]}
            alt={`Enlarged view of image ${selectedImageIndex + 1}`}
            className="h-auto max-h-[90vh] w-full rounded-lg object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
