import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '首页', en: 'Home', id: 'home' },
    { name: '品牌故事', en: 'Story', id: 'story' },
    { name: '合作品牌', en: 'Brands', id: 'brands' },
    { name: '最新活动', en: 'Events', id: 'events' },
    { name: '企业需求', en: 'Corporate', id: 'corporate' },
  ];

  const isDark = (currentPage === 'home' || currentPage === 'story' || currentPage === 'events' || currentPage === 'corporate') && !scrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl py-4 shadow-[0_1px_0_rgba(0,0,0,0.05)]' 
        : 'bg-transparent py-8'
    }`}>
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => setPage('home')}>
            <img 
              src="/logo-main.png" 
              alt="舶物志 Logo" 
              className={`h-10 w-auto mr-4 transition-all duration-700 ${isDark ? 'brightness-0 invert' : ''}`}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col items-start">
              <span className={`text-2xl font-bold tracking-[-0.05em] transition-colors duration-700 font-brand ${
                isDark ? 'text-white' : 'text-brand-navy'
              }`}>舶物志</span>
              <span className={`text-[8px] uppercase tracking-[0.5em] transition-colors duration-700 -mt-1 ${
                isDark ? 'text-brand-gold' : 'text-brand-gold'
              }`}>Boatique</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`nav-link relative group flex flex-col items-center ${
                  isDark ? 'text-white/80' : 'text-brand-navy/80'
                } ${currentPage === item.id ? '!text-brand-gold' : ''}`}
              >
                <span className="text-sm font-medium">{item.name}</span>
                <span className={`text-[10px] uppercase tracking-wider opacity-60 -mt-0.5 ${
                  currentPage === item.id ? 'text-brand-gold' : ''
                }`}>{item.en}</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-500 group-hover:w-full ${
                  currentPage === item.id ? 'w-full' : ''
                }`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={isDark ? 'text-white' : 'text-brand-navy'}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-black/5 overflow-hidden shadow-2xl"
          >
            <div className="px-8 py-12 space-y-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-center group ${
                    currentPage === item.id ? 'text-brand-gold' : 'text-brand-navy'
                  }`}
                >
                  <span className="block text-sm uppercase tracking-[0.3em] font-medium">{item.name}</span>
                  <span className="block text-[10px] uppercase tracking-[0.2em] opacity-50 mt-1">{item.en}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
