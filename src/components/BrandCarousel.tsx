import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BRANDS } from '../constants';

const BrandCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const coreBrands = BRANDS.slice(0, 5); // Show first 5 as core brands

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % coreBrands.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + coreBrands.length) % coreBrands.length);
  };

  return (
    <div className="relative overflow-hidden bg-brand-gold-light/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">核心品牌</h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto"></div>
        </div>

        <div className="relative h-[500px] md:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 md:gap-16"
            >
              <div className="w-full md:w-1/2 h-64 md:h-full">
                <img
                  src={coreBrands[currentIndex].image}
                  alt={coreBrands[currentIndex].name}
                  className="w-full h-full object-cover shadow-2xl"
                  style={{ objectPosition: coreBrands[currentIndex].objectPosition || 'center' }}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2 text-left space-y-6">
                <span className="text-brand-gold font-medium tracking-widest uppercase text-sm">
                  {coreBrands[currentIndex].category}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold text-brand-navy whitespace-pre-line">
                  {coreBrands[currentIndex].displayName || coreBrands[currentIndex].name}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed italic">
                  "{coreBrands[currentIndex].description}"
                </p>
                <button className="btn-outline">了解更多</button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-0 right-0 flex space-x-4">
            <button
              onClick={prev}
              className="p-4 bg-brand-navy text-white hover:bg-brand-gold transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="p-4 bg-brand-navy text-white hover:bg-brand-gold transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
