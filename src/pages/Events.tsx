import React from 'react';
import { motion } from 'motion/react';
import { EVENTS } from '../constants';
import { MapPin, ChevronRight } from 'lucide-react';
import GallerySlider from '../components/GallerySlider';

interface EventsProps {
  setPage?: (page: string) => void;
}

const Events: React.FC<EventsProps> = ({ setPage }) => {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header with Poster Background */}
      <section className="poster-bg" style={{ '--bg-image': 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920")' } as React.CSSProperties}>
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="editorial-label !text-brand-gold-light">Experiences</span>
            <h1 className="editorial-title !text-white">
              最新活动
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 gap-32">
          {EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-1/2">
                <div className={`relative overflow-hidden luxury-card ${event.gallery ? 'aspect-[3/4] bg-white/20 backdrop-blur-sm' : 'aspect-[4/3]'}`}>
                  {event.gallery && event.gallery.length > 0 ? (
                    <GallerySlider images={event.gallery} name={event.title} />
                  ) : (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute top-8 left-8 bg-brand-gold text-white px-4 py-1 flex flex-col items-start z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">{event.type}</span>
                    {event.typeEn && (
                      <span className="text-[8px] opacity-80 uppercase tracking-widest leading-tight">{event.typeEn}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-8">
                <div className="flex items-center gap-4 text-brand-gold">
                  <MapPin size={16} />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-xs font-bold uppercase tracking-[0.3em]">{event.location || '鼓浪屿号邮轮 7楼船中 船长酒廊'}</span>
                    <span className="text-[9px] opacity-70 uppercase tracking-[0.3em]">{event.locationEn || 'Piano Land, 7F Captain\'s Lounge'}</span>
                  </div>
                </div>
                <h2 className="text-4xl text-brand-navy leading-tight">
                  {event.title}
                  {event.titleEn && (
                    <span className="block text-xl opacity-60 font-light mt-2">{event.titleEn}</span>
                  )}
                </h2>
                <div className="w-12 h-px bg-brand-gold"></div>
                <p className="text-lg font-light text-brand-ink/70 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
                <div className="p-6 glass-panel !bg-brand-gold/5 border-l-2 border-brand-gold">
                  <p className="text-xs text-brand-navy/60 italic leading-relaxed">
                    活动已结束，更多活动资讯请关注舶物志公众号以及舶物志小红书。
                  </p>
                  <p className="text-[10px] text-brand-navy/40 italic leading-relaxed mt-2">
                    The event has ended. For more event information, please follow the Boatique official account and Xiaohongshu.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
