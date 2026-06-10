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

  // 旋转角度
  const [rotationY, setRotationY] = useState(4.2);
  const [rotationX, setRotationX] = useState(0.2);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  // 拖拽引用
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const lastMouseYRef = useRef(0);
  const rotationYRef = useRef(4.2);
  const rotationXRef = useRef(0.2);

  useEffect(() => { rotationYRef.current = rotationY; }, [rotationY]);
  useEffect(() => { rotationXRef.current = rotationX; }, [rotationX]);

  // 粒子集
  const [globeDots, setGlobeDots] = useState<GlobePoint[]>([]);

  // 容器尺寸自适应
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

  // 生成粒子（修复版）
  useEffect(() => {
    const mapW = 360;   // 提高经度分辨率
    const mapH = 180;   // 提高纬度分辨率
    const offCanvas = document.createElement("canvas");
    offCanvas.width = mapW;
    offCanvas.height = mapH;
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    // 绘制陆地（白色）
    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, mapW, mapH);
    offCtx.fillStyle = "#ffffff";

    // 更精确的陆地轮廓（简化的多边形，覆盖主要大陆）
    const drawContinent = (points: [number, number][]) => {
      offCtx.beginPath();
      const first = points[0];
      offCtx.moveTo((first[0] + 180) / 360 * mapW, (90 - first[1]) / 180 * mapH);
      for (let i = 1; i < points.length; i++) {
        offCtx.lineTo((points[i][0] + 180) / 360 * mapW, (90 - points[i][1]) / 180 * mapH);
      }
      offCtx.closePath();
      offCtx.fill();
    };

    // 非洲
    drawContinent([
      [-20, 35], [15, 35], [25, 5], [12, -35], [-10, -35], [-20, 5], [-20, 35]
    ]);
    // 欧亚大陆
    drawContinent([
      [30, 70], [60, 70], [100, 65], [130, 45], [120, 20], [70, 15], [40, 25], [30, 70]
    ]);
    // 北美洲
    drawContinent([
      [-170, 60], [-100, 60], [-80, 30], [-100, 15], [-130, 15], [-170, 30], [-170, 60]
    ]);
    // 南美洲
    drawContinent([
      [-80, 10], [-35, 10], [-40, -40], [-70, -40], [-80, 10]
    ]);
    // 澳大利亚
    drawContinent([
      [110, -10], [155, -10], [155, -35], [110, -35], [110, -10]
    ]);
    // 南极洲
    drawContinent([
      [-180, -82], [-120, -82], [-60, -82], [0, -82], [60, -82], [120, -82], [180, -82], [180, -70], [-180, -70]
    ]);

    // 扫描像素生成粒子
    const imgData = offCtx.getImageData(0, 0, mapW, mapH);
    const pixels = imgData.data;
    const dotsPool: GlobePoint[] = [];

    // 步长 2 度（密度适中）
    const latStep = 2;
    const lonStep = 2;

    for (let lat = -80; lat <= 80; lat += latStep) {
      const radLat = (lat * Math.PI) / 180;
      const cosLat = Math.cos(radLat);
      // 根据纬度调整经度步长，保持点距均匀
      let numLon = Math.max(12, Math.floor(360 / lonStep * cosLat));
      if (numLon % 2 !== 0) numLon++;
      const stepLon = 360 / numLon;

      for (let i = 0; i < numLon; i++) {
        let lon = -180 + i * stepLon;
        const u = Math.floor(((lon + 180) / 360) * mapW);
        const v = Math.floor(((90 - lat) / 180) * mapH);
        if (u >= 0 && u < mapW && v >= 0 && v < mapH) {
          const idx = (v * mapW + u) * 4;
          // 检测白色（陆地）
          if (pixels[idx] > 200) {
            const radLon = (lon * Math.PI) / 180;
            const x = Math.cos(radLat) * Math.sin(radLon);
            const y = -Math.sin(radLat);
            const z = Math.cos(radLat) * Math.cos(radLon);
            dotsPool.push({ x, y, z, px: 0, py: 0, pz: 0, opacity: 0 });
          }
        }
      }
    }

    console.log(`🌍 Generated ${dotsPool.length} globe dots`);
    setGlobeDots(dotsPool);
  }, []);

  // 渲染循环（与之前相同，保留所有交互）
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

      // 自转：未拖拽且未悬停时
      if (!isDraggingRef.current && !isHovered) {
        rotY += 0.0018;
        setRotationY(rotY);
      }

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      pulseTime += 0.035;

      // 背景光晕
      const depthGlow = ctx.createRadialGradient(cx, cy, globeRadius * 0.1, cx, cy, globeRadius * 1.1);
      depthGlow.addColorStop(0, "#080c18");
      depthGlow.addColorStop(0.5, "#04070e");
      depthGlow.addColorStop(1, "rgba(2, 4, 8, 0)");
      ctx.fillStyle = depthGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.fill();

      // 投影所有粒子
      const projectedDots: GlobePoint[] = [];
      for (let i = 0; i < globeDots.length; i++) {
        const dot = globeDots[i];
        // Y轴旋转
        let rx = dot.x * cosY - dot.z * sinY;
        let rz = dot.x * sinY + dot.z * cosY;
        let ry = dot.y;
        // X轴旋转
        let finalX = rx;
        let finalY = ry * cosX - rz * sinX;
        let finalZ = ry * sinX + rz * cosX;

        const px = cx + finalX * globeRadius;
        const py = cy + finalY * globeRadius;
        projectedDots.push({
          ...dot,
          px, py, pz: finalZ,
          opacity: finalZ > 0 ? 0.3 + finalZ * 0.5 : 0.05,
        });
      }

      // 背面粒子（暗色）
      ctx.fillStyle = "rgba(75, 85, 99, 0.15)";
      for (const pd of projectedDots) {
        if (pd.pz <= 0) {
          ctx.beginPath();
          ctx.arc(pd.px, pd.py, 0.7 * (1.2 + pd.pz), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 正面粒子（亮色）
      for (const pd of projectedDots) {
        if (pd.pz > 0) {
          ctx.fillStyle = `rgba(186, 230, 253, ${pd.opacity * 0.9})`;
          ctx.beginPath();
          ctx.arc(pd.px, pd.py, 1.0 * (1.0 + pd.pz), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 绘制城市标记（与原始代码相同，保留完整交互）
      CITIES_DATA.forEach((city) => {
        const radLat = (city.lat * Math.PI) / 180;
        const radLon = (city.lon * Math.PI) / 180;
        let x0 = Math.cos(radLat) * Math.sin(radLon);
        let y0 = -Math.sin(radLat);
        let z0 = Math.cos(radLat) * Math.cos(radLon);
        // 旋转
        let rx = x0 * cosY - z0 * sinY;
        let rz = x0 * sinY + z0 * cosY;
        let ry = y0;
        let fx = rx;
        let fy = ry * cosX - rz * sinX;
        let fz = ry * sinX + rz * cosX;

        if (fz <= 0.05) return;

        const pinX = cx + fx * globeRadius;
        const pinY = cy + fy * globeRadius;

        const isActive = city.id === activeCityId;
        const isHover = city.id === hoveredCityId;

        // 波纹
        for (let r = 0; r < 3; r++) {
          const phase = (pulseTime * 0.015 + r / 3) % 1;
          const rad = 8 + phase * 26;
          const opacity = (1 - phase) * (isActive || isHover ? 0.8 : 0.3);
          ctx.strokeStyle = isActive || isHover ? `rgba(212, 175, 55, ${opacity})` : `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(pinX, pinY, rad, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 中心点
        ctx.fillStyle = isActive || isHover ? "#d4af37" : "#e0f2fe";
        ctx.beginPath();
        ctx.arc(pinX, pinY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pinX, pinY, 6, 0, Math.PI * 2);
        ctx.stroke();

        // 引线
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pinX, pinY);
        const dir = pinX > cx ? 1 : -1;
        ctx.lineTo(pinX + dir * 18, pinY - 14);
        ctx.lineTo(pinX + dir * 50, pinY - 14);
        ctx.stroke();

        // 文字
        ctx.font = "normal 14px sans-serif";
        ctx.fillStyle = isActive || isHover ? "#d4af37" : "#f8fafc";
        ctx.textAlign = dir === 1 ? "left" : "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(city.nameCn, pinX + dir * 55, pinY - 16);
        ctx.font = "500 11px monospace";
        ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
        ctx.fillText(city.nameEn, pinX + dir * 55, pinY - 4);
      });

      animFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameId);
  }, [globeDots, dimensions, activeCityId, hoveredCityId, isHovered]);

  // 鼠标事件（与原始相同）
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    lastMouseYRef.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (!isDraggingRef.current) {
      // 悬停检测
      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      const radius = dimensions.width * 0.43;
      const rotY = rotationYRef.current;
      const rotX = rotationXRef.current;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      let found: string | null = null;
      for (const city of CITIES_DATA) {
        const radLat = (city.lat * Math.PI) / 180;
        const radLon = (city.lon * Math.PI) / 180;
        let x0 = Math.cos(radLat) * Math.sin(radLon);
        let y0 = -Math.sin(radLat);
        let z0 = Math.cos(radLat) * Math.cos(radLon);
        let rx = x0 * cosY - z0 * sinY;
        let rz = x0 * sinY + z0 * cosY;
        let ry = y0;
        let fx = rx;
        let fy = ry * cosX - rz * sinX;
        let fz = ry * sinX + rz * cosX;
        if (fz > 0.05) {
          const px = cx + fx * radius;
          const py = cy + fy * radius;
          const dx = mouseX - px;
          const dy = mouseY - py;
          if (Math.hypot(dx, dy) <= 16) {
            found = city.id;
            break;
          }
        }
      }
      onHoverCity(found);
    } else {
      const deltaX = e.clientX - lastMouseXRef.current;
      const deltaY = e.clientY - lastMouseYRef.current;
      const speed = 0.005;
      let newY = rotationYRef.current + deltaX * speed;
      let newX = rotationXRef.current + deltaY * speed;
      newX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, newX));
      setRotationY(newY);
      setRotationX(newX);
      lastMouseXRef.current = e.clientX;
      lastMouseYRef.current = e.clientY;
    }
  };

  const handleMouseUp = () => { isDraggingRef.current = false; };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const radius = dimensions.width * 0.43;
    const rotY = rotationYRef.current;
    const rotX = rotationXRef.current;
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    for (const city of CITIES_DATA) {
      const radLat = (city.lat * Math.PI) / 180;
      const radLon = (city.lon * Math.PI) / 180;
      let x0 = Math.cos(radLat) * Math.sin(radLon);
      let y0 = -Math.sin(radLat);
      let z0 = Math.cos(radLat) * Math.cos(radLon);
      let rx = x0 * cosY - z0 * sinY;
      let rz = x0 * sinY + z0 * cosY;
      let ry = y0;
      let fx = rx;
      let fy = ry * cosX - rz * sinX;
      let fz = ry * sinX + rz * cosX;
      if (fz > 0.05) {
        const px = cx + fx * radius;
        const py = cy + fy * radius;
        if (Math.hypot(mouseX - px, mouseY - py) <= 16) {
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
