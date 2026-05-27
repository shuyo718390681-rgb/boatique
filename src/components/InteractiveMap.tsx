import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { motion, AnimatePresence } from 'motion/react';
import { BRANDS, Brand } from '../constants';

interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  brands: Brand[];
}

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
  const pointerInteractionMovement = useRef(0);
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const phiRef = useRef(0);

  const HUB_IDS = ['hanyi', 'taoguafang', 'artedimurano', 'sarabyjg'];
  const HUBS = BRANDS.filter(b => HUB_IDS.includes(b.id));

  // 动态跟踪容器尺寸，实现对不同屏幕大小的响应式适配与精确对齐
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

    // 初始化 Cobe 3D 渲染地球仪
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2,
      height: 800 * 2,
      phi: 0,
      theta: 0.3, // 倾斜角度配置
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.04, 0.07, 0.16], // 经典幽蓝背景色
      markerColor: [0.77, 0.63, 0.35], // 经典金色地标色
      glowColor: [0.04, 0.07, 0.16],
      markers: [],
      onRender: (state) => {
        // 当用户没有在拖拽且没有悬停暂停时，顺滑进行自转
        if (!pointerInteracting.current) {
          if (!isPausedRef.current) {
            phiRef.current += 0.005;
          }
        }
        state.phi = phiRef.current + pointerInteractionMovement.current;
        setRotation(state.phi); // 实时同步弧度状态，供地标投影计算使用
      },
    });

    return () => {
      globe.destroy();
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // 1. 拖拽开始：锁定指针，将自转标志置为暂停
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grabbing';
    }
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    isPausedRef.current = true;
  };

  // 2. 释放指针：解锁定，并注册重新自转的防抖定时器
  const handlePointerUp = () => {
    if (pointerInteracting.current !== null) {
      phiRef.current += pointerInteractionMovement.current;
      pointerInteractionMovement.current = 0;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
    }
    
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 2000);
  };

  // 3. 拖拽移动：实时计算位移偏移度
  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta / 200;
    }
  };

  // 4. 当鼠标悬停地标时：立刻暂停旋转
  const handleMouseEnterMarker = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    isPausedRef.current = true;
  };

  // 5. 鼠标离开地标时：重置超时并在此后恢复自转
  const handleMouseLeaveMarker = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1500);
  };

  // 3D 墨卡托/球面极坐标投影转换函数（带 0.3 弧度轴向倾斜校正，使 2D 面板严丝合缝对齐 3D 陆地）
  const getPointPosition = (lat: number, lng: number) => {
    const scale = containerWidth / 800;
    const r = 275 * scale; // 契合 Cobe 的半径
    const latRad = (lat * Math.PI) / 180;
    
    // 融入实时自转角 rotation
    const lngRad = (lng * Math.PI) / 180 + rotation;
    
    // 球面坐标
    const xSphere = r * Math.cos(latRad) * Math.sin(lngRad);
    const ySphere = -r * Math.sin(latRad);
    const zSphere = r * Math.cos(latRad) * Math.cos(lngRad);
    
    // Y & Z 轴按 0.3 弧度倾斜变换
    const theta = 0.3;
    const x = xSphere;
    const y = ySphere * Math.cos(theta) - zSphere * Math.sin(theta);
    const z = ySphere * Math.sin(theta) + zSphere * Math.cos(theta);

    return { x, y, z };
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[800px] mx-auto aspect-square flex items-center justify-center">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{ width: 800, height: 800, maxWidth: '100%', aspectRatio: '1', touchAction: 'none' }}
        className="cursor-grab active:cursor-grabbing"
      />

      {/* 地标浮层 */}
      <div className="absolute inset-0 pointer-events-none">
        {HUBS.map((brand) => {
          const pos = getPointPosition(brand.lat, brand.lng);
          const isFront = pos.z > 0; // 仅渲染面对着我们这一侧（背面不显示地标，防止穿透遮挡）
          
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
                {/* 城市中英双语标签 */}
                <div className={`mb-2 px-2 py-0.5 bg-brand-navy/40 backdrop-blur-sm border border-white/10 rounded text-[8px] text-brand-gold uppercase tracking-widest whitespace-nowrap transition-transform duration-500 ${
                  brand.id === 'taoguafang' ? '-translate-x-4' : 
                  brand.id === 'hanyi' ? 'translate-x-4' : 
                  brand.id === 'artedimurano' ? 'translate-x-4' : 
                  brand.id === 'sarabyjg' ? '-translate-x-4' : ''
                }`}>
                  {BILINGUAL_LOCATIONS[brand.location] || brand.location}
                </div>

                {/* 脉冲地标点 */}
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${selectedCity === brand.location ? 'bg-white scale-125' : 'bg-brand-gold'}`} />
                
                {/* 炫酷的品牌精选气泡弹窗 */}
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
