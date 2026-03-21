import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Brand } from '../constants';
import BookingForm from './BookingForm';
import GallerySlider from './GallerySlider';

interface BrandModalProps {
  brand: Brand | null;
  onClose: () => void;
}

const BrandModal: React.FC<BrandModalProps> = ({ brand, onClose }) => {
  const [activeSectionId, setActiveSectionId] = React.useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  if (!brand) return null;

  const bookingFields = [
    { label: '姓名', name: 'name', type: 'text' as const, required: true, placeholder: '请输入您的姓名' },
    { label: '联系方式', name: 'contact', type: 'text' as const, required: true, placeholder: '手机号或微信号' },
    { 
      label: '定制类型', 
      name: 'type', 
      type: 'select' as const, 
      required: true, 
      options: ['旗袍高定', '男装定制', '珠宝定制', '其他'] 
    },
    { label: '预算范围', name: 'budget', type: 'text' as const, placeholder: '例如：5000-10000' },
    { label: '邮轮船期/航次', name: 'voyage', type: 'text' as const, required: true, placeholder: '例如：20240415-上海' },
    { label: '风格偏好/尺寸信息', name: 'details', type: 'textarea' as const, placeholder: '请描述您的风格偏好或提供初步尺寸信息' },
  ];

  const activeSection = activeSectionId 
    ? brand.subSections?.find(s => s.id === activeSectionId) 
    : null;

  const displayData = activeSection || {
    name: brand.name,
    description: brand.description,
    story: brand.story,
    gallery: brand.gallery,
    image: brand.image,
    category: brand.category,
    objectPosition: brand.objectPosition,
    showBespoke: brand.showBespoke
  };

  const handleBack = () => {
    if (activeSectionId) {
      setActiveSectionId(null);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-brand-cream overflow-y-auto custom-scrollbar shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={handleBack}
            className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-brand-navy/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-brand-navy" />
          </button>

          <div className="flex flex-col md:flex-row min-h-full">
            {/* Image Section */}
            <div className="w-full md:w-[35%] h-80 md:h-auto overflow-hidden flex-shrink-0">
              <img
                src={'image' in displayData ? (displayData.image as string) : brand.image}
                alt={displayData.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: (displayData as any).objectPosition || 'center' }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-[65%] p-8 md:p-12">
              <div className="mb-8">
                <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-bold mb-2 block">
                  {('category' in displayData ? (displayData as any).category : brand.category)}
                  {(('categoryEn' in displayData ? (displayData as any).categoryEn : brand.categoryEn)) && (
                    <span className="block text-[10px] opacity-60 tracking-widest mt-1">
                      {('categoryEn' in displayData ? (displayData as any).categoryEn : brand.categoryEn)}
                    </span>
                  )}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
                  {displayData.name}
                  {(displayData as any).nameEn && (
                    <span className="block text-xl opacity-60 font-light mt-2">{(displayData as any).nameEn}</span>
                  )}
                </h2>
                <div className="w-12 h-1 bg-brand-gold mt-4"></div>
              </div>

              <div className="max-w-none">
                {displayData.story ? (
                  <div className="markdown-body">
                    <ReactMarkdown>{displayData.story}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-slate-600 italic">
                    品牌故事正在整理中，敬请期待...
                  </p>
                )}
              </div>

              {/* Sub-sections Links */}
              {!activeSectionId && brand.subSections && brand.subSections.length > 0 && (
                <div className="mt-12 pt-8 border-t border-brand-navy/10">
                  <h4 className="text-brand-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Explore More</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {brand.subSections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSectionId(section.id)}
                        className="group flex items-center justify-between p-6 bg-white border border-brand-navy/5 hover:border-brand-gold transition-all duration-500"
                      >
                        <div className="text-left">
                          <h5 className="text-brand-navy font-bold text-sm mb-1 group-hover:text-brand-gold transition-colors">
                            {section.name}
                            {section.nameEn && (
                              <span className="block text-xs opacity-60 font-normal mt-0.5">{section.nameEn}</span>
                            )}
                          </h5>
                          <p className="text-[10px] text-brand-ink/60 uppercase tracking-widest">
                            {section.description}
                            {section.descriptionEn && (
                              <span className="block text-[8px] opacity-70 mt-0.5">{section.descriptionEn}</span>
                            )}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Section */}
              {displayData.gallery && displayData.gallery.length > 0 && (
                <div className="mt-12">
                  <div className="relative group/slider">
                    <div className="overflow-hidden luxury-card bg-white/20 backdrop-blur-sm aspect-[3/4] sm:aspect-[4/5] relative">
                      <GallerySlider images={displayData.gallery} name={displayData.name} />
                    </div>
                  </div>
                </div>
              )}

              {/* Bespoke Booking Button */}
              {displayData.showBespoke && (
                <div className="mt-12 p-8 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                      <h4 className="text-xl font-bold text-brand-navy mb-2">
                        高级定制预约
                        <span className="block text-sm opacity-60 font-medium mt-1">Bespoke Appointment</span>
                      </h4>
                      <p className="text-sm text-brand-ink/60 italic">
                        量身打造，独一无二的匠心之作
                        <span className="block text-xs opacity-70 mt-1">Tailor-made, unique masterpieces of craftsmanship</span>
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowBooking(true)}
                      className="flex items-center gap-3 bg-brand-navy text-white px-8 py-4 rounded-full hover:bg-brand-gold transition-all duration-500 shadow-xl group"
                    >
                      <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-sm font-bold uppercase tracking-widest">立即预约</span>
                        <span className="text-[10px] opacity-60 uppercase tracking-widest">Book Now</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
              
              <div className="mt-12 pt-8 border-t border-brand-navy/10 flex justify-between items-center">
                {activeSectionId ? (
                  <button 
                    onClick={() => setActiveSectionId(null)}
                    className="flex items-center gap-2 text-brand-navy font-bold text-sm uppercase tracking-widest hover:text-brand-gold transition-colors group"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <div className="flex flex-col items-start leading-tight">
                      <span>返回品牌主页</span>
                      <span className="text-[10px] opacity-60">Back to Brand</span>
                    </div>
                  </button>
                ) : (
                  <div />
                )}
                <button 
                  onClick={onClose}
                  className="text-brand-navy font-bold text-sm uppercase tracking-widest hover:text-brand-gold transition-colors"
                >
                  <div className="flex flex-col items-end leading-tight">
                    <span>返回列表</span>
                    <span className="text-[10px] opacity-60">Back to List</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal Overlay */}
      <AnimatePresence>
        {showBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBooking(false)}
              className="absolute inset-0 bg-brand-navy/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button
                onClick={() => setShowBooking(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-brand-navy/10 hover:bg-brand-navy/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-brand-navy" />
              </button>
              <BookingForm 
                title={`${displayData.name} 高级定制`}
                subtitle="量身打造，独一无二的匠心之作"
                fields={bookingFields}
                submitText="提交高定需求"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default BrandModal;
