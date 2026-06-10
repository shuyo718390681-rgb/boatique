import React, { useState } from "react";
import Globe from "./Globe"; // 导入您的 3D 地球仪组件
import { CITIES_DATA } from "../data"; // 导入定制数据源（仅含沪、绍、威、佛）
import { CityMarker, Brand } from "../types";
import BrandDetail from "./BrandDetail"; // 导入品牌列表气泡卡片

interface InteractiveMapProps {
  // 如果您的工程需要将选中的品牌传至更外层的父组件（如控制全屏展示 Presentation 组件），可声明此回调
  onSelectBrandGlobal?: (brand: Brand) => void;
}

export default function InteractiveMap({ onSelectBrandGlobal }: InteractiveMapProps) {
  // 1. 本地状态管理
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);
  const [activeBrand, setActiveBrand] = useState<Brand | null>(null);

  // 2. 根据地球仪交互选中的 ID 过滤出对应的城市数据
  const selectedCity = CITIES_DATA.find((city) => city.id === selectedCityId);

  // 3. 点击卡片内的具体品牌时的后续联动与页面跳转方法
  const handleSelectBrand = (brand: Brand) => {
    setActiveBrand(brand);
    
    // 📢 【💡 这里就是您要定制的品牌详情跳转或者路由逻辑！】
    // ==========================================
    // 方案 A: 如果您使用的是 SPA 传统前端路由（React Router）
    // navigate(`/brands/${brand.id}`); 
    
    // 方案 B: 如果您是传统直接跳转或链接方式
    // window.location.href = `/brand-detail?name=${brand.id}`;
    
    // 方案 C: 将选中的品牌返回给更外层的 Grandfather 组件以便触发全屏古艺故事长图 Overlay
    if (onSelectBrandGlobal) {
      onSelectBrandGlobal(brand);
    }
    
    console.log("🔗 联动唤醒成功！用户点击了品牌：", brand.name, "，ID为：", brand.id);
  };

  return (
    <div 
      id="interactive-map-universe"
      className="relative w-full h-full min-h-[650px] flex flex-col items-center justify-center bg-[#020408] overflow-hidden select-none"
    >
      {/* 极简高奢背景深邃星空效果 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,#0a1224_0%,#020408_100%)] opacity-90 pointer-events-none" />
      
      {/* 顶部视觉定调文案 */}
      <div className="absolute top-8 text-center z-10 pointer-events-none">
        <span className="text-[10px] tracking-[0.35em] font-mono text-[#d4af37] font-bold block mb-1.5 uppercase animate-pulse">
          Craft & Heritage World Atlas
        </span>
        <h2 className="text-xl md:text-3xl font-extrabold tracking-widest text-slate-100 font-sans">
          全球非遗与手工匠人版图
        </h2>
        <p className="text-slate-500 text-[11px] mt-1.5 font-sans">
          鼠标滑动拖拽地球旋转视角 • 点击金色光环探索对应城市合作品牌
        </p>
      </div>

      {/* 核心地球仪容器，自适应弹性伸缩 */}
      <div className="w-full max-w-[620px] aspect-square relative z-10 flex items-center justify-center">
        {/* 背景梦幻光影饰线 */}
        <div className="absolute w-[108%] h-[108%] border border-indigo-900/10 rounded-full pointer-events-none z-0" />
        <div className="absolute w-[85%] h-[85%] border border-indigo-950/10 rounded-full pointer-events-none z-0" />

        {/* 🚀 联动调用地球仪 */}
        <Globe
          activeCityId={selectedCityId}
          onSelectCity={(cityId) => {
            setSelectedCityId(cityId); // 绑定点击选中
            setActiveBrand(null); // 清除上一步品牌暂存
          }}
          hoveredCityId={hoveredCityId}
          onHoverCity={(cityId) => setHoveredCityId(cityId)} // 绑定悬停波纹
        />
      </div>

      {/* 🚀 卡片浮窗联动：当城市被选中时，在地球仪下方划入一个优雅的高质感名气卡片 */}
      {selectedCity && (
        <div className="absolute z-20 bottom-6 px-4 w-full max-w-sm animate-in fade-in slide-in-from-bottom-6 duration-300">
          <BrandDetail
            city={selectedCity}
            onClose={() => setSelectedCityId(null)} // 关闭卡片
            onSelectBrand={handleSelectBrand} // 联动跳转
          />
        </div>
      )}
    </div>
  );
}
