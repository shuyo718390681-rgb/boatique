import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Search, Filter } from 'lucide-react';

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('热门');
  const categories = ['热门', ...new Set(PRODUCTS.map(p => p.brand))];

  const filteredProducts = selectedCategory === '热门' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.brand === selectedCategory);

  return (
    <div className="pt-48 pb-32 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <span className="editorial-label">The Boutique</span>
          <h1 className="text-5xl md:text-7xl text-brand-navy mb-8">
            舶物志线上精品店
            <span className="block text-2xl md:text-3xl opacity-60 font-light mt-4 tracking-normal">Boatique Online Boutique</span>
          </h1>
          <div className="w-12 h-px bg-brand-gold mb-8"></div>
          <p className="text-lg text-brand-ink/60 max-w-2xl font-light leading-relaxed">
            甄选全球匠心好物，让艺术走进日常生活。
            在线选购部分舶物志精选商品，尊享全球配送服务。
            <span className="block text-base opacity-60 mt-4">Curating global craftsmanship to bring art into daily life. Shop selected Boatique items online and enjoy worldwide delivery.</span>
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8 border-b border-black/5 pb-8">
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 relative py-2 ${
                  selectedCategory === category
                    ? 'text-brand-gold'
                    : 'text-brand-navy/40 hover:text-brand-navy'
                }`}
              >
                <div className="flex flex-col items-start leading-tight">
                  <span>{category}</span>
                  <span className="text-[8px] opacity-60 tracking-widest mt-0.5">
                    {category === '热门' ? 'POPULAR' : (PRODUCTS.find(p => p.brand === category)?.brandEn || category.toUpperCase())}
                  </span>
                </div>
                {selectedCategory === category && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold"
                  />
                )}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-72 group">
            <input
              type="text"
              placeholder="SEARCH COLLECTION..."
              className="w-full pl-0 pr-10 py-2 bg-transparent border-b border-black/10 text-[10px] tracking-[0.2em] font-bold focus:outline-none focus:border-brand-gold transition-colors placeholder:text-black/20"
            />
            <Search className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-black/20 group-focus-within:text-brand-gold transition-colors" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden relative bg-white mb-8 luxury-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-8">
                  <button className="w-full bg-white text-brand-navy py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-gold hover:text-white transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    Add to Collection
                  </button>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-brand-navy px-4 py-2 flex flex-col items-start leading-tight">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">{product.brand}</span>
                    {product.brandEn && (
                      <span className="text-[7px] opacity-60 uppercase tracking-[0.3em]">{product.brandEn}</span>
                    )}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col items-start leading-tight">
                    <p className="text-[9px] text-brand-gold uppercase tracking-[0.3em] font-bold">{product.category}</p>
                    {product.categoryEn && (
                      <p className="text-[7px] text-brand-gold/60 uppercase tracking-[0.3em]">{product.categoryEn}</p>
                    )}
                  </div>
                  <p className="text-sm font-medium text-brand-navy">{product.price}</p>
                </div>
                <h3 className="text-xl text-brand-navy group-hover:text-brand-gold transition-colors duration-500">
                  {product.name}
                  {product.nameEn && (
                    <span className="block text-xs opacity-60 font-light mt-1">{product.nameEn}</span>
                  )}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-48">
            <ShoppingBag className="h-12 w-12 text-brand-gold/20 mx-auto mb-8" />
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-navy/40">No items found in this collection</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
