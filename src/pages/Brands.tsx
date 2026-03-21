import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BRANDS, Brand } from '../constants';
import BrandModal from '../components/BrandModal';

interface BrandsProps {
  initialBrandId?: string | null;
  onModalClose?: () => void;
}

const Brands: React.FC<BrandsProps> = ({ initialBrandId, onModalClose }) => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  useEffect(() => {
    if (initialBrandId) {
      const brand = BRANDS.find(b => b.id === initialBrandId);
      if (brand) {
        setSelectedBrand(brand);
      }
    }
  }, [initialBrandId]);

  const handleCloseModal = () => {
    setSelectedBrand(null);
    if (onModalClose) onModalClose();
  };

  return (
    <div className="pt-48 pb-32 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="editorial-label">The Collective</span>
          <h1 className="editorial-title text-brand-navy mb-12">合作品牌</h1>
          <div className="w-12 h-px bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {BRANDS.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedBrand(brand)}
            >
              <div className="relative overflow-hidden mb-8 aspect-[3/4] luxury-card">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  style={{ objectPosition: brand.objectPosition || 'center' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-8">
                  <span className="w-full bg-white text-brand-navy py-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    Discover Story
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] text-brand-gold uppercase tracking-[0.4em] font-bold">
                    {brand.category}
                    {brand.categoryEn && (
                      <span className="block text-[7px] opacity-60 tracking-widest mt-0.5">{brand.categoryEn}</span>
                    )}
                  </span>
                  <div className="flex-grow h-px bg-black/5"></div>
                </div>
                <h3 className="text-3xl text-brand-navy group-hover:text-brand-gold transition-colors duration-500 whitespace-pre-line">
                  {brand.displayName || brand.name}
                  {(brand.displayNameEn || brand.nameEn) && (
                    <span className="block text-sm opacity-60 font-light mt-1">
                      {brand.displayNameEn || brand.nameEn}
                    </span>
                  )}
                </h3>
                <p className="text-sm font-light text-brand-ink/60 leading-relaxed line-clamp-2">
                  {brand.description}
                  {brand.descriptionEn && (
                    <span className="block text-xs opacity-70 mt-1">{brand.descriptionEn}</span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BrandModal 
        brand={selectedBrand} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Brands;
