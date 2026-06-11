import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { motion, AnimatePresence } from 'motion/react';
import { BRANDS, Brand } from '../constants';

interface InteractiveMapProps {
  onBrandClick?: (brandId: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onBrandClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const phiRef = useRef(0);

  // 从 BRANDS 中筛选出枢纽城市（上海、宜兴、威尼斯、佛罗伦萨）
  // 注意：瀚艺的 id 已经改为 'HANART'
  const HUB_IDS = ['HANART', 'taoguafang', 'artedimurano', 'sarabyjg'];
  const HUBS = BRANDS.filter(b => HUB_IDS.includes(b.id));

  const BILINGUAL_LOCATIONS: Record<string, string> = {
    'Shanghai': '上海 SHANGHAI',
    'Yixing': '宜兴 YIXING',
    'Venice': '威尼斯 VENICE',
    'Florence': '佛罗伦萨 FLORENCE'
  };

  const getBrandsInCity = (city: string) => {
    return BRANDS.filter(b => b.location === city);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2,
      height: 800 * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 24000,
      mapBrightness: 6,
      baseColor: [0.2, 0.3, 0.6],
      markerColor: [0.77, 0.63, 0.35],
      glowColor: [0.3, 0.5, 0.8],
      map: 'https://unpkg.com/cobe@0.6.3/map.jpg',
      markers: [],
      onRender: (state) => {
        if (!pointerInteracting.current && !isPausedRef.current) {
          phiRef.current += 0.004;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current;
        setRotation(state.phi);
      },
    });

    return () => {
      globe.destroy();
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX;
    canvasRef.current!.style.cursor = 'grabbing';
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    isPausedRef.current = true;
  };

  const handlePointerUp = () => {
    if (pointerInteracting.current !== null) {
      phiRef.current += pointerInteractionMovement.current;
      pointerInteractionMovement.current = 0;
    }
    pointerInteracting.current = null;
    canvasRef.current!.style.cursor = 'grab';
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 2000);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta / 200;
    }
  };

  // 【测试2】强制写死屏幕坐标，用于验证标记点是否能够被移动
  const getPointPosition = (lat: number, lng: number, brandId: string) => {
    // 上海（HANART）固定在画布左上角（相对于画布中心 -250, -200）
    if (brandId === 'HANART') return { x: -250, y: -200, z: 1 };
    // 宜兴固定在画布右下角
    if (brandId === 'taoguafang') return { x: 200, y: 180, z: 1 };
    
    // 其他城市（威尼斯、佛罗伦萨）保持正常经纬度转换（以便对比）
    const r = 300;
    const latRad = (lat * Math.PI) / 180;
    const lngRad = ((lng + (rotation * 180) / Math.PI) * Math.PI) / 180;
    const x = r * Math.cos(latRad) * Math.sin(lngRad);
    const y = -r * Math.sin(latRad);
    const z = r * Math.cos(latRad) * Math.cos(lngRad);
    return { x, y, z };
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto aspect-square flex items-center justify-center">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{ width: '100%', height: '100%', display: 'block' }}
        className="cursor-grab active:cursor-grabbing"
      />
      <div className="absolute inset-0 pointer-events-none">
        {HUBS.map((brand) => {
          const pos = getPointPosition(brand.lat, brand.lng, brand.id);
          const isFront = pos.z > 0;
          return (
            <motion.div
              key={brand.id}
              className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `calc(50% + ${pos.x}px)`, 
                top: `calc(50% + ${pos.y}px)`,
                zIndex: isFront ? 50 : 0
              }}
              initial={false}
              animate={{ 
                opacity: isFront ? 1 : 0,
                scale: isFront ? 1 : 0.5,
              }}
            >
              <div 
                className="relative group cursor-pointer flex flex-col items-center"
                onClick={() => setSelectedCity(selectedCity === brand.location ? null : brand.location)}
              >
                <div className={`mb-2 px-2 py-0.5 bg-brand-navy/40 backdrop-blur-sm border border-white/10 rounded text-[8px] text-brand-gold uppercase tracking-widest whitespace-nowrap`}>
                  {BILINGUAL_LOCATIONS[brand.location] || brand.location}
                </div>
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${selectedCity === brand.location ? 'bg-white scale-125' : 'bg-brand-gold'}`} />
                <AnimatePresence>
                  {selectedCity === brand.location && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 w-[320px] glass-panel overflow-hidden rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/20 z-[100]"
                    >
                      <div className="p-4 bg-brand-navy/90 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                          <span className="text-[10px] text-brand-gold uppercase tracking-[0.2em] font-bold">
                            {BILINGUAL_LOCATIONS[brand.location] || brand.location}
                          </span>
                          <span className="text-[9px] text-white/40">
                            {getBrandsInCity(brand.location).length} 个品牌
                          </span>
                        </div>
                        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                          {getBrandsInCity(brand.location).map((cityBrand) => (
                            <div 
                              key={cityBrand.id} 
                              className="group/item flex gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onBrandClick) onBrandClick(cityBrand.id);
                              }}
                            >
                              <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded-md border border-white/10">
                                <img 
                                  src={cityBrand.image} 
                                  alt={cityBrand.name} 
                                  className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-500"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <span className="text-[8px] text-brand-gold uppercase tracking-widest mb-1">
                                  {cityBrand.category}
                                </span>
                                <h5 className="text-sm text-white mb-1 whitespace-pre-line">
                                  {cityBrand.displayName || cityBrand.name}
                                </h5>
                                <p className="text-[9px] text-white/50 line-clamp-2 leading-relaxed">
                                  {cityBrand.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveMap;
