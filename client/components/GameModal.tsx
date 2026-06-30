import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoPlay } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { HiX, HiOutlineArrowsExpand, HiChevronLeft } from 'react-icons/hi';
import { Game } from '../data/games';
import { useI18n } from '../lib/i18n';
import { useGameFullscreen } from '../lib/gameFullscreen';
import { useLocalizedGame } from '../lib/localizedGames';

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

const iframeAllow =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';

function GameIframe({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      src={src}
      title={title}
      className="absolute inset-0 w-full h-full border-0"
      allow={iframeAllow}
      allowFullScreen
    />
  );
}

export function GameModal({ game, onClose }: GameModalProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { setIsFullscreen: setGlobalFullscreen } = useGameFullscreen();
  const { t } = useI18n();
  const localized = useLocalizedGame(game);

  useEffect(() => {
    setGlobalFullscreen(isFullscreen);
    document.body.style.overflow = isFullscreen ? 'hidden' : '';
    return () => {
      setGlobalFullscreen(false);
      document.body.style.overflow = '';
    };
  }, [isFullscreen, setGlobalFullscreen]);

  const exitFullscreen = () => setIsFullscreen(false);

  const fullscreenOverlay = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black"
      style={{ width: '100vw', height: '100dvh', zIndex: 9999 }}
    >
      <div className="absolute inset-0 w-full h-full">
        <GameIframe src={game.iframeUrl!} title={localized.title} />
      </div>

      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-end px-3 py-2 gap-2 z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75), transparent)' }}
      >
        <button
          onClick={exitFullscreen}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-semibold"
          style={{ background: 'rgba(10,5,25,0.85)', border: '1px solid rgba(168,85,247,0.5)' }}
        >
          {t('exitFullscreen') as string}
        </button>
      </div>

      <button
        onClick={exitFullscreen}
        className="absolute bottom-4 left-4 p-2 rounded-xl text-white z-10"
        style={{ background: 'rgba(10,5,25,0.85)', border: '1px solid rgba(168,85,247,0.5)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      </button>
    </motion.div>
  );

  return (
    <>
      {isFullscreen && createPortal(fullscreenOverlay, document.body)}

      {!isFullscreen && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="relative w-[98vw] max-w-5xl max-h-[96dvh] flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50 flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="flex items-center gap-1 px-2 py-1.5 text-slate-600 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100 text-sm font-semibold flex-shrink-0"
              >
                <HiChevronLeft className="text-lg" /> {t('back') as string}
              </motion.button>
              <div className="w-px h-4 bg-slate-200 flex-shrink-0" />
              <span className="text-slate-900 font-bold text-sm truncate">{localized.title}</span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <FaStar className="text-yellow-500 text-xs" />
                <span className="text-slate-500 text-xs">{game.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => { setGameStarted(true); setIsFullscreen(true); }}
                className="p-2 text-slate-600 hover:text-purple-600 transition-colors rounded-lg hover:bg-slate-100"
                title="Fullscreen"
              >
                <HiOutlineArrowsExpand className="text-lg" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 transition-colors rounded-lg hover:bg-slate-100"
              >
                <HiX className="text-base" />
              </motion.button>
            </div>
          </div>

          <div
            className="relative w-full flex-1 bg-slate-900 min-h-[55vh] sm:min-h-[65vh]"
            style={{ maxHeight: 'calc(96dvh - 56px)' }}
          >
            {!gameStarted ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                  <img
                    src={game.thumbnail}
                    alt={localized.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain p-4"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(168,85,247,0.9)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameStarted(true)}
                  className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
                >
                  <IoPlay className="text-2xl ml-1" />
                </motion.button>
                <p className="relative z-10 text-white font-bold text-lg sm:text-xl drop-shadow-lg">{localized.title}</p>
                <p className="relative z-10 text-white/80 text-xs drop-shadow">{t('tapToPlay') as string}</p>
              </div>
            ) : (
              <GameIframe src={game.iframeUrl!} title={localized.title} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
      )}
    </>
  );
}
