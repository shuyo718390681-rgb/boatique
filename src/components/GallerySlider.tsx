import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GallerySliderProps {
  images: string[];
  name: string;
}

const GallerySlider: React.FC<GallerySliderProps> = ({ images, name }) => {
  const [index, setIndex] = React.useState(0);
  const [dragX, setDragX] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  // Auto-play
  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleDragEnd = (_: any, info: { offset: { x: number }, velocity: { x: number } }) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      setIndex((prev) => prev + 1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      setIndex((prev) => prev - 1);
    }
    setDragX(0);
  };

  return (
    <div 
      className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-gold/5 to-transparent pointer-events-none" />

      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((img, idx) => {
          // Calculate relative position in the infinite loop
          const count = images.length;
          const wrappedIndex = ((index % count) + count) % count;
          
          // Calculate distance from center (-1, 0, 1, etc.)
          let offset = idx - wrappedIndex;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          const isCenter = offset === 0;
          const isNeighbor = Math.abs(offset) === 1;
          
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                x: offset * 180 + dragX,
                scale: isCenter ? 1.1 : 0.7,
                zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                opacity: isCenter ? 1 : (isNeighbor ? 0.4 : 0),
                filter: isCenter ? 'blur(0px)' : 'blur(8px)',
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                opacity: { duration: 0.2 }
              }}
              className="absolute w-[70%] h-[80%] flex items-center justify-center"
            >
              <div className={`relative w-full h-full transition-all duration-700 ${isCenter ? 'drop-shadow-[0_20px_50px_rgba(184,148,94,0.3)]' : ''}`}>
                <img
                  src={img}
                  alt={`${name} product ${idx + 1}`}
                  className="w-full h-full object-contain select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Drag Surface */}
      <motion.div
        className="absolute inset-0 z-30 touch-none"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={(_, info) => setDragX(info.offset.x)}
        onDragEnd={handleDragEnd}
      />

      {/* Navigation Arrows */}
      <div className="absolute inset-x-2 z-40 flex justify-between pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex(prev => prev - 1);
          }}
          className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-brand-navy/20 hover:text-brand-navy/60 transition-all backdrop-blur-sm pointer-events-auto group"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex(prev => prev + 1);
          }}
          className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-brand-navy/20 hover:text-brand-navy/60 transition-all backdrop-blur-sm pointer-events-auto group"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {images.map((_, idx) => {
          const count = images.length;
          const wrappedIndex = ((index % count) + count) % count;
          return (
            <div 
              key={idx}
              className={`w-1 h-1 rounded-full transition-all duration-500 ${idx === wrappedIndex ? 'w-4 bg-brand-gold' : 'bg-brand-gold/30'}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GallerySlider;
