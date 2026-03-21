/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BrandStory from './pages/BrandStory';
import Brands from './pages/Brands';
import Events from './pages/Events';
import CorporateServices from './pages/CorporateServices';
// import Shop from './pages/Shop';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [isFromMap, setIsFromMap] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Reset "from map" state if we navigate away from brands page manually
    if (currentPage !== 'brands' && isFromMap) {
      setIsFromMap(false);
      setSelectedBrandId(null);
    }
  }, [currentPage, isFromMap]);

  const navigateToBrand = (brandId: string) => {
    setSelectedBrandId(brandId);
    setIsFromMap(true);
    setCurrentPage('brands');
  };

  const handleModalClose = () => {
    setSelectedBrandId(null);
    if (isFromMap) {
      setIsFromMap(false);
      setCurrentPage('home');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={setCurrentPage} onBrandClick={navigateToBrand} />;
      case 'story':
        return <BrandStory />;
      case 'brands':
        return <Brands initialBrandId={selectedBrandId} onModalClose={handleModalClose} />;
      case 'events':
        return <Events setPage={setCurrentPage} />;
      case 'corporate':
        return <CorporateServices />;
      // case 'shop':
      //   return <Shop />;
      default:
        return <Home setPage={setCurrentPage} onBrandClick={navigateToBrand} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={setCurrentPage} />
    </div>
  );
}
