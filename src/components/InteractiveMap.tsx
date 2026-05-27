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
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const isPausedRef = useRef(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const phiRef = useRef(0);

  const HUB_IDS = ['hanyi', 'taoguafang', 'artedimurano', 'sarabyjg'];
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

    // 使用国内可访问的 CDN 纹理图片
    const textureUrl = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg';

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800 * 2,
      height: 800 * 2,
      phi: 0,
      theta: 0.3,
      dark: 0.8,        // 降低暗度使纹理更明显
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.04, 0.07, 0.16],
      markerColor: [0.77, 0.63, 0.35],
      glowColor: [0.04, 0.07, 0.16],
      markers: [],
      map: textureUrl,  // 关键：指定纹理图片
      onRender: (state) => {
        if (!pointerInteracting.current) {
          if (!isPausedRef.current) {
            phiRef.current += 0.005;
          }
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

  // ... 其余的交互处理函数、getPointPosition 等保持不变（与您之前的代码一致）...
  // 由于代码太长，这里省略，但您可以使用之前正常工作的版本中的这些函数。
  // 为了节省篇幅，请保留您原有文件中的 handlePointerDown, handlePointerUp, handlePointerMove, handleMouseEnterMarker, handleMouseLeaveMarker, getPointPosition 以及 return 部分。
  // 下面我仅提供正确的骨架，您可以直接复制我之前提供的完整代码（但替换其中的 textureUrl 为上面这个新的）。
};

export default InteractiveMap;
