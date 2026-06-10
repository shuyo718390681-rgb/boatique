import React, { useRef, useEffect, useState } from "react";
import { CityMarker, GlobePoint } from "../types";
import { CITIES_DATA } from "../data";

interface GlobeProps {
  activeCityId: string | null;
  onSelectCity: (cityId: string) => void;
  hoveredCityId: string | null;
  onHoverCity: (cityId: string | null) => void;
}

export default function Globe({
  activeCityId,
  onSelectCity,
  hoveredCityId,
  onHoverCity,
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. 初始化码头 3D 旋转角度 (默认面对欧亚大陆)
  const [rotationY, setRotationY] = useState(4.2);
  const [rotationX, setRotationX] = useState(0.2); 
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const lastMouseYRef = useRef(0);
  const rotationYRef = useRef(4.2);
  const rotationXRef = useRef(0.2);

  useEffect(() => { rotationYRef.current = rotationY; }, [rotationY]);
  useEffect(() => { rotationXRef.current = rotationX; }, [rotationX]);

  const [globeDots, setGlobeDots] = useState<GlobePoint[]>([]);

  // 自适应容器容器缩放
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const size = Math.min(width, height) || 500;
        setDimensions({ width: size, height: size });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 自研矢量大陆轮廓高速缓存粒子生成器
  useEffect(() => {
    const mapW = 180;
    const mapH = 90;
    const offCanvas = document.createElement("canvas");
    offCanvas.width = mapW;
    offCanvas.height = mapH;
    const offCtx = offCanvas.getContext("2d");

    if (!offCtx) return;

    const drawLandContour = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, mapW, mapH);
      ctx.fillStyle = "#ffffff";

      // 北美板块范围
      ctx.beginPath();
      ctx.moveTo(mapW * 0.08, mapH * 0.15);
      ctx.lineTo(mapW * 0.28, mapH * 0.12);
      ctx.lineTo(mapW * 0.32, mapH * 0.18);
      ctx.lineTo(mapW * 0.28, mapH * 0.45);
      ctx.lineTo(mapW * 0.22, mapH * 0.45);
      ctx.lineTo(mapW * 0.12, mapH * 0.35);
      ctx.closePath();
      ctx.fill();

      // 格陵兰
      ctx.beginPath();
      ctx.ellipse(mapW * 0.35, mapH * 0.12, mapW * 0.04, mapH * 0.05, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // 南美板块
      ctx.beginPath();
      ctx.moveTo(mapW * 0.25, mapH * 0.43);
      ctx.lineTo(mapW * 0.32, mapH * 0.45);
      ctx.lineTo(mapW * 0.28, mapH * 0.78);
      ctx.lineTo(mapW * 0.24, mapH * 0.65);
      ctx.lineTo(mapW * 0.22, mapH * 0.50);
      ctx.closePath();
      ctx.fill();

      // 非洲板块
      ctx.beginPath();
      ctx.moveTo(mapW * 0.46, mapH * 0.35);
      ctx.lineTo(mapW * 0.58, mapH * 0.35);
      ctx.lineTo(mapW * 0.64, mapH * 0.48);
      ctx.lineTo(mapW * 0.58, mapH * 0.75);
      ctx.lineTo(mapW * 0.48, mapH * 0.55);
      ctx.closePath();
      ctx.fill();

      // 欧亚大板块
      ctx.beginPath();
      ctx.moveTo(mapW * 0.45, mapH * 0.25);
      ctx.lineTo(mapW * 0.55, mapH * 0.15);
      ctx.lineTo(mapW * 0.75, mapH * 0.10);
      ctx.lineTo(mapW * 0.90, mapH * 0.15);
      ctx.lineTo(mapW * 0.88, mapH * 0.42);
      ctx.lineTo(mapW * 0.82, mapH * 0.45);
      ctx.lineTo(mapW * 0.74, mapH * 0.45);
      ctx.lineTo(mapW * 0.64, mapH * 0.42);
      ctx.lineTo(mapW * 0.52, mapH * 0.38);
      ctx.closePath();
      ctx.fill();

      // 澳洲板块
      ctx.beginPath();
      ctx.ellipse(mapW * 0.82, mapH * 0.65, mapW * 0.06, mapH * 0.05, -0.1, 0, Math.PI * 2);
      ctx.fill();
    };

    drawLandContour(offCtx);

    const generateDots = () => {
      const imgData = offCtx.getImageData(0, 0, mapW, mapH);
      const pixels = imgData.data;
      const dotsPool: GlobePoint[] = [];

      const latStep = 2.4; 
      const lonStep = 2.8;

      for (let lat = -80; lat <= 80; lat += latStep) {
        const radLat = (lat * Math.PI) / 180;
        const numPointsOnParallel = Math.ceil(360 / lonStep * Math.cos(radLat));
        if (numPointsOnParallel < 3) continue;

        const currentLonStep = 360 / numPointsOnParallel;

        for (let i = 0; i < numPointsOnParallel; i++) {
          const lon = -180 + i * currentLonStep;
          const u = Math.floor(((lon + 180) / 360) * mapW);
          const v = Math.floor(((90 - lat) / 180) * mapH);
          
          if (u >= 0 && u < mapW && v >= 0 && v < mapH) {
            const idx = (v * mapW + u) * 4;
            if (pixels[idx] > 100) {
              const radLon = (lon * Math.PI) / 180;
              const x = Math.cos(radLat) * Math.sin(radLon);
              const y = -Math.sin(radLat);
              const z = Math.cos(radLat) * Math.cos(radLon);

              dotsPool.push({
                x, y, z,
                px: 0, py: 0, pz: 0,
                opacity: 0
              });
            }
          }
        }
      }
      setGlobeDots(dotsPool);
    };

    generateDots();
  }, []);

  // 核心帧频 3D 渲染器 (含 z-buffer 背面剔除算法)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      const globeRadius = dimensions.width * 0.43;

      let rotY = rotationYRef.current;
      let rotX = rotationXRef.current;

      if (!isDraggingRef.current && !isHovered) {
        rotY += 0.0018; 
        setRotationY(rotY);
      }

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      pulseTime += 0.035;

      // 氛围光效
      const depthGlow = ctx.createRadialGradient(cx, cy, globeRadius * 0.1, cx, cy, globeRadius * 1.1);
      depthGlow.addColorStop(0, "#080c18");
      depthGlow.addColorStop(0.5, "#04070e");
      depthGlow.addColorStop(1, "rgba(2, 4, 8, 0)");
      ctx.fillStyle = depthGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.fill();

      const projectedDots: GlobePoint[] = [];
      const len = globeDots.length;

      for (let i = 0; i < len; i++) {
        const dot = globeDots[i];
        const rx1 = dot.x * cosY - dot.z * sinY;
        const ry1 = dot.y;
        const rz1 = dot.x * sinY + dot.z * cosY;

        const rx2 = rx1;
        const ry2 = ry1 * cosX - rz1 * sinX;
        const rz2 = ry1 * sinX + rz1 * cosX;

        const px = cx + rx2 * globeRadius;
        const py = cy + ry2 * globeRadius;
        
        projectedDots.push({
          x: dot.x, y: dot.y, z: dot.z,
          px, py, pz: rz2,
          opacity: rz2 > 0 ? (0.2 + rz2 * 0.4) : (0.05 + (1 + rz2) * 0.05) 
        });
      }

      // 1. 简笔绘制背面粒子
      ctx.fillStyle = "rgba(75, 85, 99, 0.15)";
      for (let i = 0; i < projectedDots.length; i++) {
        const pd = projectedDots[i];
        if (pd.pz <= 0) {
          ctx.beginPath();
          ctx.arc(pd.px, pd.py, 0.7 * (1.2 + pd.pz), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 边界切线环
      ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 2. 绘制正面粒子 (星空莹蓝)
      for (let i = 0; i < projectedDots.length; i++) {
        const pd = projectedDots[i];
        if (pd.pz > 0) {
          ctx.fillStyle = `rgba(186, 230, 253, ${pd.opacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(pd.px, pd.py, 1.1 * (1.1 + pd.pz), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. 完美结合名匠代表座和名城标志针 (上海、绍兴、佛罗伦萨、威尼斯)
      CITIES_DATA.forEach((city) => {
        const radLat = (city.lat * Math.PI) / 180;
        const radLon = (city.lon * Math.PI) / 180;

        const cx3d = Math.cos(radLat) * Math.sin(radLon);
        const cy3d = -Math.sin(radLat);
        const cz3d = Math.cos(radLat) * Math.cos(radLon);

        const crx1 = cx3d * cosY - cz3d * sinY;
        const cry1 = cy3d;
        const crz1 = cx3d * sinY + cz3d * cosY;

        const crx2 = crx1;
        const cry2 = cry1 * cosX - crz1 * sinX;
        const crz2 = cry1 * sinX + crz1 * cosX;

        if (crz2 <= 0.05) return;

        const pinX = cx + crx2 * globeRadius;
        const pinY = cy + cry2 * globeRadius;

        const isCityActive = city.id === activeCityId;
        const isCityHovered = city.id === hoveredCityId;

        // 金色多圈呼吸涟漪波动
        const rippleCount = 3;
        for (let r = 0; r < rippleCount; r++) {
          const rSpeed = 0.015;
          const rPhase = (pulseTime * rSpeed + r / rippleCount) % 1;
          const rRadius = 8 + rPhase * 26;
          const rOpacity = (1 - rPhase) * (isCityActive || isCityHovered ? 0.8 : 0.3);

          ctx.strokeStyle = isCityActive || isCityHovered ? `rgba(212, 175, 55, ${rOpacity})` : `rgba(56, 189, 248, ${rOpacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pinX, pinY, rRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 实体核心金针
        ctx.fillStyle = isCityActive || isCityHovered ? "#d4af37" : "#e0f2fe";
        ctx.beginPath();
        ctx.arc(pinX, pinY, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pinX, pinY, 6, 0, Math.PI * 2);
        ctx.stroke();

        // 极美中式折线引索
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pinX, pinY);
        const angleDir = pinX > cx ? 1 : -1;
        ctx.lineTo(pinX + angleDir * 18, pinY - 14);
        ctx.lineTo(pinX + angleDir * 50, pinY - 14);
        ctx.stroke();

        // 文字排版
        ctx.font = "normal 14px sans-serif";
        ctx.fillStyle = isCityActive || isCityHovered ? "#d4af37" : "#f8fafc";
        ctx.textAlign = angleDir === 1 ? "left" : "right";
        ctx.textBaseline = "bottom";
        
        ctx.fillText(city.nameCn, pinX + angleDir * 55, pinY - 16);
        ctx.font = "500 11px monospace";
        ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
        ctx.fillText(city.nameEn, pinX + angleDir * 55, pinY - 4);
      });

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => { cancelAnimationFrame(animFrameId); };
  }, [globeDots, dimensions, activeCityId, hoveredCityId, isHovered]);

  // 4. 捕捉交互事件
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    lastMouseYRef.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (!isDraggingRef.current) {
      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      const globeRadius = dimensions.width * 0.43;

      const cosY = Math.cos(rotationYRef.current);
      const sinY = Math.sin(rotationYRef.current);
      const cosX = Math.cos(rotationXRef.current);
      const sinX = Math.sin(rotationXRef.current);

      let foundHoverId: string | null = null;

      for (let i = 0; i < CITIES_DATA.length; i++) {
        const city = CITIES_DATA[i];
        const radLat = (city.lat * Math.PI) / 180;
        const radLon = (city.lon * Math.PI) / 180;

        const cx3d = Math.cos(radLat) * Math.sin(radLon);
        const cy3d = -Math.sin(radLat);
        const cz3d = Math.cos(radLat) * Math.cos(radLon);

        const crx1 = cx3d * cosY - cz3d * sinY;
        const cry1 = cy3d;
        const crz1 = cx3d * sinY + cz3d * cosY;

        const crx2 = crx1;
        const cry2 = cry1 * cosX - crz1 * sinX;
        const crz2 = cry1 * sinX + crz1 * cosX;

        if (crz2 > 0.05) {
          const pinX = cx + crx2 * globeRadius;
          const pinY = cy + cry2 * globeRadius;
          const dx = mouseX - pinX;
          const dy = mouseY - pinY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= 16) {
            foundHoverId = city.id;
            break;
          }
        }
      }
      onHoverCity(foundHoverId);
    } else {
      const deltaX = e.clientX - lastMouseXRef.current;
      const deltaY = e.clientY - lastMouseYRef.current;

      const speedFactor = 0.005;
      const nextRotY = rotationYRef.current + deltaX * speedFactor;
      const nextRotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotationXRef.current + deltaY * speedFactor));

      setRotationY(nextRotY);
      setRotationX(nextRotX);

      lastMouseXRef.current = e.clientX;
      lastMouseYRef.current = e.clientY;
    }
  };

  const handleMouseUp = () => { isDraggingRef.current = false; };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const globeRadius = dimensions.width * 0.43;

    const cosY = Math.cos(rotationYRef.current);
    const sinY = Math.sin(rotationYRef.current);
    const cosX = Math.cos(rotationXRef.current);
    const sinX = Math.sin(rotationXRef.current);

    for (let i = 0; i < CITIES_DATA.length; i++) {
      const city = CITIES_DATA[i];
      const radLat = (city.lat * Math.PI) / 180;
      const radLon = (city.lon * Math.PI) / 180;

      const cx3d = Math.cos(radLat) * Math.sin(radLon);
      const cy3d = -Math.sin(radLat);
      const cz3d = Math.cos(radLat) * Math.cos(radLon);

      const crx1 = cx3d * cosY - cz3d * sinY;
      const cry1 = cy3d;
      const crz1 = cx3d * sinY + cz3d * cosY;

      const crx2 = crx1;
      const cry2 = cry1 * cosX - crz1 * sinX;
      const crz2 = cry1 * sinX + crz1 * cosX;

      if (crz2 > 0.05) {
        const pinX = cx + crx2 * globeRadius;
        const pinY = cy + cry2 * globeRadius;
        const dx = mouseX - pinX;
        const dy = mouseY - pinY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= 16) {
          onSelectCity(city.id);
          break;
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full aspect-square cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDraggingRef.current = false;
        onHoverCity(null);
      }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        className="block touch-none"
      />
    </div>
  );
}
