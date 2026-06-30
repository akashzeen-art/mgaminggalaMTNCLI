import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../lib/i18n';

interface PreloaderProps {
  onComplete: () => void;
}

const GAME_ICONS = ['🎮', '🕹️', '👾', '🎯', '🏆', '⭐', '🎲', '⚡'];
const RING_SIZE = 240;
const RING_RADIUS = 108;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function Preloader({ onComplete }: PreloaderProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const { t } = useI18n();

  useEffect(() => {
    const duration = 4000;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, (elapsed / duration) * 100);
      setProgress(next);
      if (next < 100) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white via-slate-50 to-purple-50 overflow-hidden"
        >
          {/* Pixel grid — retro game feel */}
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(168,85,247,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.12) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Floating game icons */}
          {GAME_ICONS.map((icon, i) => (
            <motion.span
              key={i}
              className="absolute text-2xl sm:text-3xl select-none pointer-events-none opacity-20"
              style={{
                left: `${8 + (i * 11) % 84}%`,
                top: `${12 + (i * 13) % 76}%`,
              }}
              animate={{
                y: [0, -18, 0],
                rotate: [0, i % 2 === 0 ? 12 : -12, 0],
                opacity: [0.12, 0.28, 0.12],
              }}
              transition={{
                duration: 3.5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.35,
                ease: 'easeInOut',
              }}
            >
              {icon}
            </motion.span>
          ))}

          {/* Game tile blocks */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`tile-${i}`}
              className="absolute rounded-md border border-purple-200/50 bg-purple-100/30 pointer-events-none"
              style={{
                width: 28 + (i % 3) * 8,
                height: 28 + (i % 3) * 8,
                left: `${5 + i * 16}%`,
                bottom: `${8 + (i % 4) * 12}%`,
              }}
              animate={{ y: [0, -12, 0], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <div
              className="relative flex items-center justify-center"
              style={{ width: RING_SIZE, height: RING_SIZE }}
            >
              <svg
                className="absolute inset-0 -rotate-90"
                width={RING_SIZE}
                height={RING_SIZE}
                viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
              >
                <circle
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_RADIUS}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="5"
                />
                <motion.circle
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_RADIUS}
                  fill="none"
                  stroke="url(#preloaderGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  animate={{ strokeDashoffset: RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * progress) / 100 }}
                  transition={{ duration: 0.1 }}
                />
                <defs>
                  <linearGradient id="preloaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.img
                src="/gaminggala.png"
                alt="Gaming Gala"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-h-[72px] max-w-[150px] w-auto h-auto object-contain px-2"
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm font-semibold tracking-[0.3em] text-slate-500 uppercase"
              >
                {t('loading') as string}
              </motion.p>

              <div className="w-56 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-xs font-medium text-slate-400 tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
