import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Preloader } from '../components/Preloader';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { GameLibrary } from '../components/GameLibrary';
import { CategoriesSection } from '../components/CategoriesSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { Footer } from '../components/Footer';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { GameFullscreenProvider } from '../lib/gameFullscreen';

export default function Index() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const gamesRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (name: string) => {
    if (name === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (name === 'Games') {
      setSelectedCategory('All');
      setTimeout(() => {
        gamesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else if (name === 'Categories') {
      setTimeout(() => {
        categoriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else if (name === 'Trending') {
      setSelectedCategory('Top 10 Games');
      setTimeout(() => {
        gamesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setTimeout(() => {
      gamesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  useEffect(() => {
    document.body.style.overflow = showPreloader ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showPreloader]);

  return (
    <GameFullscreenProvider>
    <div className="bg-white min-h-screen">
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {!showPreloader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedBackground />
          <Navbar onNavClick={handleNavClick} />
          <main className="pt-16 relative z-10">
            <HeroSection onPlayClick={() => handleNavClick('Games')} />
            <FeaturedCarousel />
            <div ref={categoriesRef}>
              <CategoriesSection onCategorySelect={handleCategorySelect} />
            </div>
            <div ref={gamesRef}>
              <GameLibrary selectedCategory={selectedCategory} onCategoryChange={handleCategorySelect} />
            </div>
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
    </GameFullscreenProvider>
  );
}
