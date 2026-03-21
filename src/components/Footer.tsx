import React from 'react';

interface FooterProps {
  setPage?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => setPage?.('home')}>
              <img 
                src="/logo-main.png" 
                alt="舶物志 Logo" 
                className="h-10 w-10 object-contain mr-2 brightness-0 invert" 
                referrerPolicy="no-referrer" 
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter font-brand">舶物志</span>
                <span className="text-xs uppercase tracking-[0.3em] text-brand-gold/80">Boatique</span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              汇聚全球匠心，珍藏旅途时光。在邮轮之上，为您开启一场跨越国界的艺术与生活之约。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-gold">店铺信息</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>位置：鼓浪屿号邮轮，7楼船中 船长酒廊</p>
              <p>营业时间：09:00 - 22:00 (航行日)</p>
              <p>联系电话：+86 13512131966</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-gold">快速链接</h3>
            <div className="flex flex-col space-y-2 text-sm text-white/80">
              <button onClick={() => setPage?.('story')} className="text-left hover:text-brand-gold transition-colors">品牌故事</button>
              <button onClick={() => setPage?.('brands')} className="text-left hover:text-brand-gold transition-colors">合作品牌</button>
              <button onClick={() => setPage?.('events')} className="text-left hover:text-brand-gold transition-colors">最新活动</button>
              <button onClick={() => setPage?.('corporate')} className="text-left hover:text-brand-gold transition-colors">企业合作/集采服务</button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-gold">关注我们</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>微信公众号：舶物志 Boatique</p>
              <p>舶物志小红书号：5478672508</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-xs text-white/40">
          <p>&copy; 2024 舶物志 Boatique. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
