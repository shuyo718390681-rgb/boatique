import React from 'react';
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import { BRANDS, EVENTS } from '../constants';
import InteractiveMap from '../components/InteractiveMap';

interface HomeProps {
  setPage: (page: string) => void;
  onBrandClick: (brandId: string) => void;
}

const Home: React.FC<HomeProps> = ({ setPage, onBrandClick }) => {
  const onShop = () => setPage('shop');
  const onEvents = () => setPage('events');

  return (
    <div className="bg-brand-cream overflow-hidden">
      {/* Interactive 3D Globe Section - Top of Homepage */}
      <section className="pt-40 pb-20 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#C5A059_0%,transparent_70%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="editorial-label !text-brand-gold-light !mb-4">Global Craftsmanship Network</span>
              <h2 className="editorial-title !text-white !text-6xl md:!text-8xl !leading-[0.8] flex flex-col items-center">
                <span>全球匠心版图</span>
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative z-20"
          >
            <div className="absolute top-0 left-0 md:top-4 md:left-4 z-30 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.8, x: 0 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-[1px] bg-brand-gold/60"></div>
                <span className="text-[9px] md:text-[10px] text-brand-gold-light font-medium tracking-[0.4em] uppercase whitespace-nowrap flex flex-col">
                  <span>拖动地球探索更多内容</span>
                  <span className="text-[7px] opacity-50 mt-1">Drag the globe to explore more</span>
                </span>
              </motion.div>
            </div>
            <InteractiveMap onBrandClick={onBrandClick} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-center mt-8"
          >
            <p className="text-white text-xs font-light tracking-[0.3em] uppercase flex flex-col items-center gap-2">
              <span>跨越海洋的匠心对话 • 链接全球顶级手工艺</span>
              <span className="text-[9px] opacity-40">A Dialogue of Craftsmanship Across Oceans • Connecting Global Masterpieces</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Section with New Poster Background */}
      <section className="poster-bg" style={{ '--bg-image': 'url("/舶物志首页海报.jpg")' } as React.CSSProperties}>
        <div className="relative z-10 w-full">
          <Hero onBooking={onEvents} onShop={onShop} />
        </div>
      </section>

      {/* Philosophy Section - Restored and Refined */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/3"
            >
              <span className="editorial-label">Our Philosophy</span>
              <h2 className="editorial-title text-brand-navy mb-8 flex flex-col">
                <span>选品</span>
                <span>哲学</span>
              </h2>
              <p className="text-lg font-light text-brand-ink/70 leading-relaxed mb-12 max-w-md">
                我们穿梭于全球各地的隐秘工坊，只为寻找那些能够抵御时间流逝的杰作。
                每一件入选“舶物志”的物品，都承载着匠人的温度与时代的灵魂。
                <span className="block text-sm text-brand-ink/40 mt-4 italic">
                  We travel through hidden workshops worldwide to find masterpieces that withstand time. 
                  Every piece in "Boatique" carries the warmth of the artisan and the soul of the era.
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:w-2/3 lg:pl-12 border-l border-brand-gold/20"
            >
              <div className="space-y-8">
                <p className="text-3xl md:text-4xl font-light text-brand-navy leading-tight italic flex flex-col gap-4">
                  <span>我们相信 “材质是基础，审美是跨度，文化是灵魂”</span>
                  <span className="text-xl md:text-2xl text-brand-navy/40 not-italic">We believe that "Material is the foundation, Aesthetics is the span, and Culture is the soul"</span>
                </p>
                <p className="text-xl font-light text-brand-ink/50 leading-relaxed max-w-2xl">
                  We believe that “Quality materials form the foundation, artistic expression defines the breadth, and cultural depth gives it soul.”
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: '材出有名', en: 'Renowned Materials', desc: '我们坚持追根溯源，只选取材质纯正、来源清晰的艺术品，无论是波罗的海的琥珀，还是托斯卡纳的植鞣革。', enDesc: 'We insist on traceability, selecting only authentic artworks with clear origins, from Baltic amber to Tuscan vegetable-tanned leather.' },
              { title: '艺趣兼得', en: 'Art & Joy', desc: '好的设计应当是艺术性与趣味性的完美结合。我们寻找那些既能体现大师技艺，又能为日常生活增添情趣的作品。', enDesc: 'Great design should be a perfect blend of artistry and fun. We look for pieces that showcase master skills and add joy to daily life.' },
              { title: '文化为用', en: 'Culture in Use', desc: '艺术不应束之高阁。我们致力于将传统文化与现代生活相结合，让每一件好物都能在日常使用中焕发新生。', enDesc: 'Art should not be kept on a high shelf. We are committed to integrating traditional culture with modern life, letting every masterpiece find new life in daily use.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="p-12 glass-panel !bg-white luxury-card"
              >
                <span className="text-brand-gold font-display text-sm font-bold mb-6 block">0{idx + 1}</span>
                <h3 className="text-2xl text-brand-navy mb-1">{item.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-brand-navy/40 mb-4 font-medium">{item.en}</p>
                <p className="text-sm font-light text-brand-ink/70 leading-relaxed mb-4">{item.desc}</p>
                <p className="text-[11px] font-light text-brand-ink/40 leading-relaxed italic">{item.enDesc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Preview - Modern Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-24">
            <div>
              <span className="editorial-label">Experiences</span>
              <h2 className="editorial-title text-brand-navy !text-6xl md:!text-8xl flex flex-col">
                <span>精彩活动</span>
              </h2>
            </div>
            <div className="hidden md:block w-32 h-px bg-brand-gold mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {EVENTS.slice(0, 2).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={onEvents}
              >
                <div className="relative aspect-[16/9] overflow-hidden luxury-card mb-8">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em] border border-white/30 px-8 py-3 hover:bg-white hover:text-brand-navy transition-all flex flex-col items-center gap-1">
                      <span>查看详情</span>
                      <span className="text-[8px] opacity-60">View Details</span>
                    </span>
                  </div>
                </div>
                <span className="text-[9px] text-brand-gold uppercase tracking-[0.4em] font-bold mb-3 block">
                  {event.type}
                </span>
                <h3 className="text-3xl text-brand-navy group-hover:text-brand-gold transition-colors duration-500">
                  {event.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact - Minimalist Dashboard Style */}
      <section className="py-32 bg-brand-cream border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-12 glass-panel !bg-white/50 luxury-card">
              <span className="editorial-label">Visit Us</span>
              <h4 className="text-xl text-brand-navy mb-1">线下精品店</h4>
              <p className="text-[10px] uppercase tracking-widest text-brand-navy/40 mb-4 font-medium">Boutique Store</p>
              <p className="text-sm font-light text-brand-ink/70">
                鼓浪屿号邮轮，7楼船中 船长酒廊
                <span className="block text-xs text-brand-ink/40 mt-1 italic">Piano Land Cruise, 7F Midship, Captain's Lounge</span>
              </p>
            </div>
            <div className="p-12 glass-panel !bg-white/50 luxury-card">
              <span className="editorial-label">Hours</span>
              <h4 className="text-xl text-brand-navy mb-1">营业时间</h4>
              <p className="text-[10px] uppercase tracking-widest text-brand-navy/40 mb-4 font-medium">Opening Hours</p>
              <p className="text-sm font-light text-brand-ink/70">
                09:00 - 22:00<br />
                (航行日)
                <span className="block text-xs text-brand-ink/40 mt-1 italic">(Sailing Days)</span>
              </p>
            </div>
            <div className="p-12 glass-panel !bg-white/50 luxury-card">
              <span className="editorial-label">Connect</span>
              <h4 className="text-xl text-brand-navy mb-1">联系我们</h4>
              <p className="text-[10px] uppercase tracking-widest text-brand-navy/40 mb-4 font-medium">Contact Us</p>
              <p className="text-sm font-light text-brand-ink/70">
                电话：+86 13512131966<br />
                邮箱：xiaoah@spccd.org
                <span className="block text-xs text-brand-ink/40 mt-1 italic">Tel: +86 13512131966<br />Email: xiaoah@spccd.org</span>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
