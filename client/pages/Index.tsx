import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Preloader } from '../components/Preloader';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { GameLibrary } from '../components/GameLibrary';
import { CategoriesSection } from '../components/CategoriesSection';
import { Footer } from '../components/Footer';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { GameFullscreenProvider } from '../lib/gameFullscreen';
import { useAuth } from '../hooks/useAuth';
import {
  checkCivMtnLogin,
  normalizeMsisdn,
  getLandingMsisdn,
  clearLandingMsisdnFromUrl,
} from '../lib/civmtnLogin';

import { getSubscribeUrl } from '@shared/civmtnConfig';

export default function Index() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [landingPopup, setLandingPopup] = useState<'inactive' | 'insufficient' | null>(null);
  const [scrollToGamesAfterLanding, setScrollToGamesAfterLanding] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const landingHandled = useRef(false);

  const gamesRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Landing page redirect: ?msisdn=... — if ACTIVE, log in and enter the site
  useEffect(() => {
    if (landingHandled.current) return;

    const msisdn = getLandingMsisdn();
    if (!msisdn) return;

    landingHandled.current = true;

    if (isAuthenticated) {
      clearLandingMsisdnFromUrl();
      setShowPreloader(false);
      return;
    }

    checkCivMtnLogin(msisdn)
      .then(({ ok, data }) => {
        clearLandingMsisdnFromUrl();
        setShowPreloader(false);

        if (ok && data.response === 'ACTIVE') {
          login({
            msisdn: normalizeMsisdn(msisdn),
            actDate: data.actDate ?? '',
            renewDate: data.renewDate ?? '',
            pricePoint: data.pricePoint ?? '',
            validity: data.validity ?? '',
            unsubUrl: data.unsubUrl ?? '',
          });
          setScrollToGamesAfterLanding(true);
          return;
        }

        if (ok && data.response === 'INSUFFICIENT') {
          setLandingPopup('insufficient');
        } else {
          setLandingPopup('inactive');
        }
      })
      .catch(() => {
        clearLandingMsisdnFromUrl();
        setShowPreloader(false);
        setLandingPopup('inactive');
      });
  }, [isAuthenticated, login]);

  // After active landing login, scroll user into the game library
  useEffect(() => {
    if (!scrollToGamesAfterLanding || showPreloader) return;

    setSelectedCategory('All');
    const timer = setTimeout(() => {
      gamesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setScrollToGamesAfterLanding(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [scrollToGamesAfterLanding, showPreloader]);

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

          {landingPopup && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
            >
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div
                  className="px-6 py-5 text-white text-center"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
                >
                  <img src="/gaminggala.png" alt="Gaming Gala" className="h-8 mx-auto mb-2 object-contain" />
                  <p className="text-white/90 text-sm">
                    {landingPopup === 'insufficient' ? 'Insufficient Balance' : 'Subscription Required'}
                  </p>
                </div>
                <div className="px-6 py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: landingPopup === 'insufficient' ? '#fee2e2' : '#ffedd5' }}
                  >
                    <span className="text-2xl">{landingPopup === 'insufficient' ? '💳' : '⚠️'}</span>
                  </div>
                  <p className="text-slate-700 font-semibold text-sm">
                    {landingPopup === 'insufficient'
                      ? 'Dear Customer, we were unable to activate your service mgaminggala due to insufficient balance.'
                      : 'Your subscription is not active.'}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {landingPopup === 'insufficient'
                      ? 'Please recharge your account and try again.'
                      : 'Please subscribe to access all games.'}
                  </p>
                  <a
                    href={getSubscribeUrl()}
                    className="block w-full py-2.5 rounded-xl text-white font-semibold text-sm text-center"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
                  >
                    Click here to subscribe
                  </a>
                  <button
                    onClick={() => setLandingPopup(null)}
                    className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Continue browsing
                  </button>
                </div>
              </div>
            </div>
          )}
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
