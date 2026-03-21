import React from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onBooking: () => void;
  onShop: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBooking, onShop }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          
          <h1 className="editorial-title text-white mb-8">
            原产地<br />
            <span className="text-brand-gold">好物精选</span>
            <span className="block text-sm md:text-base text-white/40 font-light tracking-[0.2em] mt-4 uppercase">Origin's Finest</span>
          </h1>

          <div className="flex flex-col items-center justify-center mt-16">
            <div className="max-w-2xl text-center">
              <div className="mb-10">
                <p className="text-white/70 font-light leading-relaxed tracking-wide mb-2 mx-auto">
                  汇聚全球匠心，珍藏旅途时光。在蔚蓝的大海上，为您精选全球顶级手工艺品与生活好物。
                </p>
                <p className="text-white/40 text-xs font-light leading-relaxed tracking-wide mx-auto italic">
                  Gathering global craftsmanship, cherishing the moments of your journey. On the azure sea, we curate the world's finest handicrafts and lifestyle goods for you.
                </p>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={onBooking}
                  className="px-12 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-brand-navy transition-all duration-700"
                >
                  查看活动
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Vertical Rail Text */}
      <div className="absolute left-8 bottom-24 hidden lg:block">
        <div className="flex items-center gap-4 origin-left -rotate-90 translate-y-full">
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold whitespace-nowrap">ESTABLISHED 2024</span>
          <div className="w-12 h-px bg-white/20"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
