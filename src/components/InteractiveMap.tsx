import React, { useState } from "react";
import Globe from "./Globe";
import { CITIES_DATA } from "../data";
import { Brand, CityMarker } from "../types";
import { MapPin, Globe2, Sparkles, X, ArrowRight, Award, Compass, HelpCircle } from "lucide-react";
import CraftThumbnail from "./CraftThumbnail";

export default function InteractiveMap() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const selectedCity = CITIES_DATA.find((c) => c.id === selectedCityId);

  // 快捷重置
  const handleReset = () => {
    setSelectedCityId(null);
    setSelectedBrand(null);
  };

  return (
    <div 
      className="w-full flex flex-col items-center justify-center relative min-h-[500px]" 
      id="interactive-map-page-wrapper"
    >
      {/* 顶部标题组 */}
      <div className="w-full text-center mb-6 select-none z-10">
        <span className="text-[10px] tracking-[0.3em] font-mono text-[#d4af37] font-bold block mb-1.5 uppercase">
          CURATED GLOBAL BRAND ARCHIVE DIRECTORY
        </span>
        <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-widest text-[#f8fafc] font-sans">
          全球手工匠旅 · 品牌互动星图
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-2 rounded-full" />
        <p className="text-slate-400 text-xs max-w-xl mx-auto mt-2.5 leading-relaxed font-sans">
          拖拽并旋转 3D 地球仪，或点击下方名城；深探意大利佛罗伦萨、威尼斯、中国上海与绍兴等顶级非遗工研大作
        </p>
      </div>

      {/* 主画布布局：左侧城市侧边栏、中间/主屏幕3D球体、右侧/浮动品牌展示卡 */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 relative z-10">
        
        {/* 左边：名城联动捷径导引轨（Hover同步地球点位） */}
        <div 
          className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 shrink-0 custom-scrollbar select-none order-2 lg:order-1"
          id="cities-rail-container"
        >
          <div className="hidden lg:flex items-center gap-2 mb-2 px-3 py-1 bg-slate-950/40 border border-slate-900 rounded-lg">
            <Compass className="w-3.5 h-3.5 text-[#d4af37] animate-spin-slow" />
            <span className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">名匠联动捷径 RAIL</span>
          </div>

          {CITIES_DATA.map((city) => {
            const isCityActive = city.id === selectedCityId;
            const isCityHovered = city.id === hoveredCityId;

            return (
              <button
                key={city.id}
                onMouseEnter={() => setHoveredCityId(city.id)}
                onMouseLeave={() => setHoveredCityId(null)}
                onClick={() => {
                  setSelectedCityId(city.id);
                  if (selectedCityId !== city.id) {
                    setSelectedBrand(null); // 切换城市时自动收起故事长卷
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 border shrink-0 cursor-pointer ${
                  isCityActive
                    ? "bg-[#d4af37]/10 border-[#d4af37] shadow-lg shadow-[#d4af37]/5"
                    : isCityHovered
                    ? "bg-slate-950 border-slate-800 text-slate-100"
                    : "bg-[#070b16]/40 border-slate-900/60 text-slate-400"
                }`}
                id={`city-button-${city.id}`}
              >
                <div className={`p-1.5 rounded-md transition-colors ${
                  isCityActive ? "bg-[#d4af37] text-black" : "bg-slate-900 text-[#d4af37]"
                }`}>
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className={`text-xs font-bold font-sans transition-colors ${isCityActive ? "text-[#d4af37]" : "text-slate-200"}`}>
                    {city.nameCn}
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 font-medium tracking-wide uppercase mt-0.5">
                    {city.nameEn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 中间/主要部分：3D 地球仪 */}
        <div 
          className="flex-1 w-full max-w-[450px] md:max-w-[500px] aspect-square relative z-10 flex items-center justify-center order-1 lg:order-2" 
          id="globe-container-viewport"
        >
          {/* 星球轨道环装饰 */}
          <div className="absolute w-[112%] h-[112%] border border-slate-900/15 rounded-full pointer-events-none" />
          <div className="absolute w-[95%] h-[95%] border border-slate-900/10 rounded-full pointer-events-none" />
          <div className="absolute w-[78%] h-[78%] border border-slate-900/5 rounded-full pointer-events-none" />

          <Globe
            activeCityId={selectedCityId}
            onSelectCity={(cityId) => {
              setSelectedCityId(cityId);
              setSelectedBrand(null); // 点击切换时清卷
            }}
            hoveredCityId={hoveredCityId}
            onHoverCity={(cityId) => setHoveredCityId(cityId)}
          />

          {/* 右下角鼠标操作指引提示 */}
          <div className="absolute bottom-2 right-4 flex items-center gap-1.5 bg-slate-950/60 border border-slate-900/60 px-2.5 py-1 rounded-full pointer-events-none select-none text-[9px] text-slate-500 font-mono">
            <Globe2 className="w-3 h-3 text-[#d4af37]" />
            <span>DRAG ROTATE · HOVER PIN · CLICK CITY</span>
          </div>
        </div>

        {/* 右边/抽屉：当点击城市时展示对应的名匠名坊列表 */}
        <div 
          className="w-full lg:w-80 flex flex-col gap-4 shrink-0 order-3 z-20"
          id="map-detail-card-panel"
        >
          {selectedCity ? (
            <div
              className="w-full bg-[#070b16]/95 border border-slate-800 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/90 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
              id="brand-detail-sidebar"
            >
              {/* 金彩流光 */}
              <div className="h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

              {/* 卡片头部 */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-slate-900 bg-slate-950/20">
                <div>
                  <span className="text-[9px] tracking-[0.25em] font-mono text-[#d4af37] uppercase font-bold block mb-0.5">
                    名邦匠访 CURATED CITY
                  </span>
                  <h2 className="text-base font-bold font-sans text-slate-100 flex items-center gap-1">
                    {selectedCity.nameCn}
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-850 px-1.5 py-0.5 rounded">
                    {selectedCity.brands.length} 席
                  </span>
                  <button
                    onClick={handleReset}
                    className="text-slate-400 hover:text-[#d4af37] p-1 rounded-full hover:bg-slate-900 transition-colors focus:outline-none cursor-pointer"
                    aria-label="关闭"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 品牌列表区域 */}
              <div className="p-4 max-h-[320px] overflow-y-auto space-y-3 custom-scrollbar">
                {selectedCity.brands.map((brand) => (
                  <div
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand)}
                    className="group relative flex items-start gap-3 p-3 rounded-lg bg-slate-950/40 border border-slate-900 hover:bg-slate-950/80 hover:border-[#d4af37]/35 cursor-pointer transition-all duration-300"
                    id={`sidebar-brand-item-${brand.id}`}
                  >
                    <CraftThumbnail type={brand.detailImage} />

                    <div className="flex-1 min-w-0 pr-1 select-none">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[8px] font-bold tracking-widest text-[#d4af37] bg-[#d4af37]/5 border border-[#d4af37]/20 px-1 py-0.5 rounded uppercase">
                          {brand.category}
                        </span>
                        <span className="text-[8px] font-mono text-[#94a3b8] font-semibold">
                          {brand.founded}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-200 group-hover:text-[#d4af37] tracking-wider transition-colors duration-200">
                        {brand.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {brand.description}
                      </p>
                    </div>

                    <div className="self-center flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 border border-slate-850 group-hover:bg-[#d4af37] group-hover:border-[#d4af37] text-slate-400 group-hover:text-black transition-all duration-300 transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                  </div>
                ))}
              </div>

              {/* 特色底饰 */}
              <div className="px-5 py-3.5 bg-slate-950/75 border-t border-slate-900/80 flex items-center justify-between text-[10px] text-slate-500 font-sans">
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#d4af37]" />
                  传承经典，东方风致与意国流光
                </span>
              </div>
            </div>
          ) : (
            // 未选中城市的指引占位
            <div className="w-full bg-[#070b16]/30 border border-dashed border-slate-800/80 rounded-xl p-6 text-center flex flex-col items-center justify-center min-h-[160px] select-none">
              <div className="w-10 h-10 rounded-full bg-slate-950/60 border border-slate-900 flex items-center justify-center text-slate-500 mb-3">
                <HelpCircle className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-300 font-bold font-sans">
                点击地球名城探索大师
              </p>
              <p className="text-[10px] text-slate-500 font-sans mt-1 max-w-[200px]">
                名城连接着上海的盘扣大漆、绍兴红泥彩绘、以及佛罗伦萨植鞣皮与威尼斯吹璃
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. 点击具体品牌时，展开一个尊贵精致的手工故事长图细节面板 */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div 
            className="relative w-full max-w-lg bg-[#070b16] border border-slate-800 rounded-xl shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
            id={`brand-story-modal-${selectedBrand.id}`}
          >
            {/* 卡片大金顶 */}
            <div className="h-1 bg-gradient-to-r from-[#d4af37]/40 via-[#d4af37] to-[#d4af37]/40" />

            {/* 顶栏 */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-slate-900 bg-slate-950/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
                <span className="text-[11px] font-mono text-[#d4af37] font-bold tracking-[0.2em] uppercase">手工绝艺档案 MASTERPIECE</span>
              </div>
              <button
                onClick={() => setSelectedBrand(null)}
                className="text-slate-400 hover:text-[#d4af37] p-1 rounded-full hover:bg-slate-900 transition-all cursor-pointer"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 内容区 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
              
              {/* 品牌名称头 */}
              <div className="border-b border-slate-900/60 pb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] uppercase tracking-widest bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] px-2 py-0.5 rounded font-bold">
                    {selectedBrand.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {selectedBrand.founded}
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-widest text-[#f8fafc] font-sans">
                  {selectedBrand.name}
                </h3>
                <p className="text-xs font-medium text-slate-400 mt-1">
                  发源名邦: <span className="text-slate-300 font-mono text-[11px] font-semibold bg-slate-900 px-1.5 py-0.5 rounded ml-1 uppercase">{selectedBrand.origin}</span>
                </p>
              </div>

              {/* 奢华质感小插图 */}
              <div className="relative h-44 rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center p-4 border border-slate-900">
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none z-10" />
                <div className="scale-[2.4] opacity-90 relative z-0">
                  <CraftThumbnail type={selectedBrand.detailImage} />
                </div>
                
                {/* 浮动饰纹 */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-[#03050a]/80 border border-slate-900/80 px-2 py-0.5 rounded font-mono text-[9px] text-[#d4af37]">
                  <Award className="w-3 h-3" />
                  <span>PRECISE CRAFT IN DETAIL</span>
                </div>
              </div>

              {/* 故事详情 */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 tracking-wider mb-1.5 font-sans">
                    核心匠造工艺 Core Craftsmanship
                  </h4>
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-900 text-xs text-slate-300 leading-relaxed italic text-center font-sans">
                    "{selectedBrand.craftsmanship}"
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 tracking-wider mb-1.5 font-sans">
                    世代承袭长卷 Artisan Legacy
                  </h4>
                  <p className="text-xs md:text-[13px] text-slate-300 leading-relaxed font-sans text-justify">
                    {selectedBrand.fullStory}
                  </p>
                </div>
              </div>
            </div>

            {/* 底栏 */}
            <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400 font-sans">
              <span className="text-[10px] text-slate-500 font-mono">
                BOATICUE · SELECT HERITAGE
              </span>
              <button
                onClick={() => setSelectedBrand(null)}
                className="bg-[#d4af37] text-black font-bold px-4 py-1.5 rounded text-[11px] hover:bg-[#d4af37]/90 active:scale-95 transition-all cursor-pointer"
              >
                深谙此艺 Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
