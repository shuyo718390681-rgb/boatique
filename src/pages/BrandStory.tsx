import React from 'react';
import { motion } from 'motion/react';

const BrandStory: React.FC = () => {
  return (
    <div className="bg-brand-cream">
      {/* Header with Poster Background */}
      <section className="poster-bg" style={{ '--bg-image': 'url("https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1920")' } as React.CSSProperties}>
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="editorial-label !text-brand-gold-light">Our Heritage</span>
            <h1 className="editorial-title !text-white flex flex-col items-center">
              <span>品牌故事</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-32">
        {/* Intro Section */}
        <div className="max-w-5xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-brand-navy mb-12 leading-tight font-brand md:whitespace-nowrap flex flex-col items-center">
              <span>舶物志｜原产地好物精选平台</span>
              <span className="text-lg md:text-xl font-light tracking-[0.1em] text-brand-navy/40 mt-4 uppercase">Boatique | Origin's Finest</span>
            </h2>
            <div className="w-12 h-px bg-brand-gold mx-auto mb-12"></div>
          </motion.div>
        </div>

        {/* Large Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative mb-32"
        >
          <div className="aspect-video w-full overflow-hidden luxury-card bg-brand-navy/5 shadow-2xl">
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
              poster="https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=1000"
            >
              <source src="/舶物志品牌宣传片1.mp4" type="video/mp4" />
              <div className="flex flex-col items-center">
                <span>您的浏览器不支持视频播放。</span>
                <span className="text-xs opacity-50">Your browser does not support video playback.</span>
              </div>
            </video>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-8 -left-8 w-32 h-32 border-l-2 border-t-2 border-brand-gold/30 -z-10"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 border-r-2 border-b-2 border-brand-gold/30 -z-10"></div>
        </motion.div>

        {/* Detailed Text Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl font-light text-brand-ink/80 leading-relaxed">
              舶物志「Boatique」是以邮轮商业空间为基础，以“原产地好物精选”为核心价值的线上线下商业平台。
            </p>
            <p className="text-sm text-brand-ink/50 leading-relaxed uppercase tracking-wider">
              Boatique is an omnichannel marketplace based in cruise ship commercial spaces, with "Origin's Finest Finds" as its core concept.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl font-light text-brand-ink/80 leading-relaxed">
              生于邮轮，连接世界。我们以“材出有名、艺趣兼得、文化为用”为选物哲学，将全球匠心好物汇聚于此。从大师手作到当代设计，每一件都是可收藏的时光，可陪伴的旅途记忆。
            </p>
            <p className="text-sm text-brand-ink/50 leading-relaxed uppercase tracking-wider">
              Born on cruise ships, connecting the world. Guided by the philosophy of "Authentic Materials, Artful Living, Cultural Purpose," we gather exceptional craftsmanship from across the globe. From master artisans to contemporary design—each piece is time collected, memories curated.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BrandStory;
