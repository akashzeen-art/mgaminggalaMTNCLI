import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { HiUserCircle } from 'react-icons/hi';
import { useI18n } from '../lib/i18n';
import { useGameFullscreen } from '../lib/gameFullscreen';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AccountModal } from './AccountModal';
import { useAuth } from '../hooks/useAuth';

export function Navbar({ onNavClick }: { onNavClick: (name: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const { t } = useI18n();
  const { isFullscreen } = useGameFullscreen();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { key: 'Home', label: t('home') as string },
    { key: 'Games', label: t('games') as string },
    { key: 'Categories', label: t('categories') as string },
    { key: 'Trending', label: t('trending') as string },
  ];

  if (isFullscreen) return null;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-white/60 backdrop-blur-sm'
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="group cursor-pointer" onClick={() => onNavClick('Home')}>
            <motion.img
              src="/gaminggala.png"
              alt="Gaming Gala"
              whileHover={{ scale: 1.05 }}
              className="h-8 w-auto object-contain transition-all"
            />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {menuItems.map((item) => (
              <motion.div
                key={item.key}
                className="relative px-3 py-2 text-slate-600 hover:text-slate-900 cursor-pointer group"
                whileHover={{ y: -2 }}
                onClick={() => onNavClick(item.key)}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
            <LanguageSwitcher />
            {isAuthenticated && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAccount(true)}
                className="p-1.5 text-slate-600 hover:text-purple-600 transition-colors rounded-lg hover:bg-slate-100"
                title="My Account"
              >
                <HiUserCircle className="text-2xl" />
              </motion.button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            {isAuthenticated && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAccount(true)}
                className="p-1.5 text-slate-600 hover:text-purple-600 transition-colors"
              >
                <HiUserCircle className="text-2xl" />
              </motion.button>
            )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-700 text-2xl"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-lg"
          >
            {menuItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { onNavClick(item.key); setIsOpen(false); }}
                className="block py-2 text-slate-600 hover:text-neon-purple transition-colors cursor-pointer"
              >
                {item.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {showAccount && <AccountModal onClose={() => setShowAccount(false)} />}
    </motion.nav>
  );
}
