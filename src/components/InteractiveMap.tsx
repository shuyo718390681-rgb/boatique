import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { motion, AnimatePresence } from 'motion/react';
import { BRANDS, Brand } from '../constants';

interface InteractiveMapProps {
  onBrandClick?: (brandId: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onBrandClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [containerWidth, setContainerWidth] = useState(800);
  
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionPhiStart = useRef(0);
  const pointerInteractionMovement = useRef(0);
  const isHoveredRef = useRef(false);
  const phiRef = useRef(0);

  // 筛选出枢纽城市，并动态重写或校对真实的坐标数据（避免数据库/constants coordinate异常）
  const HUB_IDS = ['hanyi', 'taoguafang', 'artedimurano', 'sarabyjg'];
  const HUBS = BRANDS.filter(b => HUB_IDS.includes(b.id)).map(brand => {
    if (brand.id === 'hanyi') { // 上海 Shanghai
      return { ...brand, lat: 31.23, lng: 121.47 };
    }
    if (brand.id === 'taoguafang') { // 宜兴 Yixing
      return { ...brand, lat: 31.35, lng: 119.85 };
    }
    return brand;
  });

  // 监听容器大小，保证在响应式布局中 HTML 点位与 Canvas 物理像素毫无偏差
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateSize();
    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

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
      width: 1600,
      height: 1600,
      phi: phiRef.current,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 12, // 调优亮度以让金色的地表点高度清晰可见
      baseColor: [0.77, 0.63, 0.35], // 经典鎏金品牌本色陆地
      markerColor: [1, 1, 1], // 白色呼吸微光标记
      glowColor: [0.12, 0.18, 0.32], // 典雅的中世纪夜空外发光
      markers: [
        { location: [31.23, 121.47], size: 0.05 }, // 瀚艺 (上海)
        { location: [31.35, 119.85], size: 0.05 }, // 陶卦坊 (宜兴)
        { location: [42.5, 10.0], size: 0.05 },    // SARA BY JG (托斯卡纳/佛罗伦萨)
        { location: [46.5, 13.5], size: 0.05 }     // ARTE DI MURANO (威尼斯)
      ],
      onRender: (state: any) => {
        if (pointerInteracting.current === null) {
          if (!isHoveredRef.current) {
            phiRef.current += 0.003; // 平滑匀速转动
          }
        } else {
          phiRef.current = pointerInteractionMovement.current;
        }
        state.phi = phiRef.current;
        setRotation(state.phi);
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX;
    pointerInteractionPhiStart.current = phiRef.current;
    pointerInteractionMovement.current = phiRef.current;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
    }
  };

  const handlePointerUp = () => {
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      // 向右拖拽时，顺时针方向自转
      pointerInteractionMovement.current = pointerInteractionPhiStart.current - delta / 200;
    }
  };

  const handleMouseEnterMarker = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeaveMarker = () => {
    isHoveredRef.current = false;
  };

  // 🧮 完美高精度三维投影算法
  const getPointPosition = (lat: number, lng: number) => {
    const scale = containerWidth / 800;
    const r = 275 * scale; // 自适应视口尺寸调整球面半径
    const latRad = (lat * Math.PI) / 180;
    
    // 正确的旋转差值转换
    const lngRad = (lng * Math.PI) / 180 - rotation;
    
    // 未倾斜球面三维空间位置
    const xSphere = r * Math.cos(latRad) * Math.sin(lngRad);
    const ySphere = -r * Math.sin(latRad);
    const zSphere = r * Math.cos(latRad) * Math.cos(lngRad);
    
    // 配合 COBE 自身的 theta: 0.3 对 X 轴做 3D 乘积矩阵旋转变换实现倾斜面切角对齐
    const theta = 0.3;
    const x = xSphere;
    const y = ySphere * Math.cos(theta) + zSphere * Math.sin(theta);
    const z = -ySphere * Math.sin(theta) + zSphere * Math.cos(theta);

    return { x, y, z };
  };

  return (
    <div 
      ref={containerRef} 
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      className="relative w-full max-w-[800px] mx-auto aspect-square flex items-center justify-center overflow-visible"
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
        width={1600}
        height={1600}
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, touchAction: 'none' }}
        className="cursor-grab active:cursor-grabbing"
      />

      {/* HTML 浮动标签图层 */}
      <div className="absolute inset-0 pointer-events-none">
        {HUBS.map((brand) => {
          const pos = getPointPosition(brand.lat, brand.lng);
          const isFront = pos.z > 0; // 只对位于地球向光正面一侧的点进行完全显示
          
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
                onMouseEnter={handleMouseEnterMarker}
                onMouseLeave={handleMouseLeaveMarker}
              >
                {/* 城市中英文标注 */}
                <div className={`mb-2 px-2.5 py-1 bg-brand-navy/90 backdrop-blur-md border border-brand-gold/20 rounded-sm text-[8px] md:text-[9px] text-brand-gold-light uppercase tracking-[0.2em] whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center gap-1.5 font-display transition-all duration-300 ${
                  brand.id === 'taoguafang' ? '-translate-x-4' : 
                  brand.id === 'hanyi' ? 'translate-x-4' : 
                  brand.id === 'artedimurano' ? 'translate-x-4' : 
                  brand.id === 'sarabyjg' ? '-translate-x-4' : ''
                }`}>
                  <span className="w-1 h-1 rounded-full bg-brand-gold animate-pulse" />
                  {BILINGUAL_LOCATIONS[brand.location] || brand.location}
                </div>

                {/* 涟漪光圈标记点 */}
                <div className="relative flex items-center justify-center">
                  <div className={`absolute -inset-1.5 rounded-full bg-brand-gold/60 animate-ping opacity-75 transition-opacity duration-500 ${selectedCity === brand.location ? 'bg-white/40' : ''}`} />
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(197,160,89,0.8)] ${
                    selectedCity === brand.location 
                      ? 'bg-white scale-125 shadow-[0_0_20px_#fff]' 
                      : 'bg-brand-gold hover:scale-125'
                  }`} />
                </div>
                
                {/* 选择交互卡片弹窗 */}
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
                                  referrerPolicy="no-referrer"
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
                                <div className="mt-2 flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                  <span className="text-[7px] text-brand-gold uppercase tracking-widest">Discover Story</span>
                                  <div className="w-4 h-px bg-brand-gold"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-brand-navy/90" />
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
