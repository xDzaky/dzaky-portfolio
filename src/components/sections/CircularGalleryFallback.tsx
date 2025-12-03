'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface CircularGalleryFallbackProps {
  items?: { image: string; text: string }[];
}

/**
 * Lightweight fallback for CircularGallery on low-end devices
 * Uses simple CSS scrolling instead of WebGL
 * Features: 3-layer stack with depth effect
 */
type SlidePosition = 'left' | 'center' | 'right';

const slideVariants: Variants = {
  left: {
    opacity: 0.25,
    scale: 0.7,
    rotateY: 28,
    filter: 'brightness(0.55) blur(1px)',
  },
  center: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: 'brightness(1) blur(0px)',
  },
  right: {
    opacity: 0.25,
    scale: 0.7,
    rotateY: -28,
    filter: 'brightness(0.55) blur(1px)',
  },
  enterFromLeft: {
    x: '-20%',
    opacity: 0,
    scale: 0.6,
    rotateY: 45,
  },
  enterFromRight: {
    x: '20%',
    opacity: 0,
    scale: 0.6,
    rotateY: -45,
  },
  exitToLeft: {
    x: '-25%',
    opacity: 0,
    scale: 0.5,
    rotateY: 50,
  },
  exitToRight: {
    x: '25%',
    opacity: 0,
    scale: 0.5,
    rotateY: -50,
  },
};

const frameSizeClasses: Record<SlidePosition, string> = {
  left: 'h-[200px] w-[160px] md:h-[320px] md:w-[260px]',
  center: 'h-[360px] w-[90vw] max-w-[720px] md:h-[500px]',
  right: 'h-[200px] w-[160px] md:h-[320px] md:w-[260px]',
};

const positionClasses: Record<SlidePosition, string> = {
  left: 'left-[2%] md:left-[8%] pointer-events-none',
  center: 'left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing',
  right: 'right-[2%] md:right-[8%] pointer-events-none',
};

export default function CircularGalleryFallback({ items = [] }: CircularGalleryFallbackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [pageDirection, setPageDirection] = useState(0);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setPageDirection(1);
    setCurrentIndex(newIndex);
    setIsAutoPlaying(false);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setPageDirection(-1);
    setCurrentIndex(newIndex);
    setIsAutoPlaying(false);
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || items.length === 0) return;

    const interval = setInterval(() => {
      setPageDirection(1);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  const handleDotClick = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setPageDirection(newDirection);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (newDirection === 1) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex h-[600px] items-center justify-center">
        <p className="text-muted-foreground">No achievements to display</p>
      </div>
    );
  }

  const desiredOffsets: number[] = [0, -1, 1];
  const seen = new Set<number>();
  const visibleSlides = desiredOffsets.reduce<{ index: number; position: SlidePosition; data: { image: string; text: string } }[]>((acc, offset) => {
    const index = (currentIndex + offset + items.length) % items.length;
    if (seen.has(index)) {
      return acc;
    }

    const position: SlidePosition = offset === 0 ? 'center' : offset < 0 ? 'left' : 'right';
    acc.push({ index, position, data: items[index] });
    seen.add(index);
    return acc;
  }, []);

  const enteringIndex =
    pageDirection === 0
      ? null
      : pageDirection === 1
        ? (currentIndex + 1) % items.length
        : (currentIndex - 1 + items.length) % items.length;

  const activeSide: SlidePosition | null = pageDirection === 0 ? null : pageDirection === 1 ? 'right' : 'left';

  const slideTransition = {
    duration: 0.65,
    ease: [0.22, 0.68, 0, 1],
  } as const;

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg bg-background/50">
      {/* Main gallery - 3-layer carousel with simultaneous sliding */}
      <div className="relative h-full w-full flex items-center justify-center">
        <AnimatePresence initial={false} mode="sync">
          {visibleSlides.map((slide) => {
            const isCenter = slide.position === 'center';
            const isEntering =
              enteringIndex !== null &&
              slide.index === enteringIndex &&
              ((pageDirection === 1 && slide.position === 'right') ||
                (pageDirection === -1 && slide.position === 'left'));

            const initialVariant = isEntering
              ? pageDirection === 1
                ? 'enterFromRight'
                : 'enterFromLeft'
              : false;

            const exitVariant = pageDirection === 1 ? 'exitToLeft' : pageDirection === -1 ? 'exitToRight' : undefined;

            const baseClasses = `absolute top-1/2 -translate-y-1/2 ${positionClasses[slide.position]}`;

            return (
              <motion.div
                key={slide.index}
                layout
                variants={slideVariants}
                initial={initialVariant}
                animate={slide.position}
                exit={exitVariant}
                transition={slideTransition}
                className={baseClasses}
                style={{
                  zIndex: slide.position === 'center' ? 30 : slide.position === activeSide ? 20 : 10,
                  pointerEvents: isCenter ? 'auto' : 'none',
                  transformStyle: 'preserve-3d',
                }}
                drag={isCenter ? 'x' : false}
                dragConstraints={isCenter ? { left: 0, right: 0 } : undefined}
                dragElastic={1}
                onDragEnd={
                  isCenter
                    ? (e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                          paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                          paginate(-1);
                        }
                      }
                    : undefined
                }
              >
                <motion.div
                  layout
                  className={`relative overflow-hidden rounded-2xl border border-border/30 bg-background/70 shadow-2xl ${frameSizeClasses[slide.position]}`}
                >
                  <Image
                    src={slide.data.image}
                    alt={slide.data.text}
                    fill
                    className="object-cover"
                    sizes={
                      slide.position === 'center'
                        ? '(max-width: 768px) 90vw, 720px'
                        : '(max-width: 768px) 160px, 260px'
                    }
                    priority={slide.position === 'center' && currentIndex === 0}
                    draggable={false}
                  />
                </motion.div>

                {isCenter && (
                  <motion.p
                    className="mt-4 rounded-lg bg-background/95 px-4 md:px-6 py-2 md:py-3 text-center text-base md:text-lg font-semibold text-foreground backdrop-blur-sm border border-border/50 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35 }}
                  >
                    {slide.data.text}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'w-8 bg-primary'
                : 'w-2 bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/90 p-3 text-foreground backdrop-blur-sm transition-all hover:bg-background hover:scale-110 border border-border/50 shadow-lg"
        aria-label="Previous slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/90 p-3 text-foreground backdrop-blur-sm transition-all hover:bg-background hover:scale-110 border border-border/50 shadow-lg"
        aria-label="Next slide"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute right-4 top-4 z-20 rounded-full bg-background/90 px-3 py-1 text-sm text-foreground backdrop-blur-sm border border-border/50">
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  );
}
