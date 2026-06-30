import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoPlay } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { Game } from '../data/games';
import { GameModal } from './GameModal';
import { useLocalizedGame } from '../lib/localizedGames';

interface GameCardProps {
  game: Game;
  index?: number;
  compact?: boolean;
  static?: boolean;
}

export function GameCard({ game, index = 0, compact = false, static: isStatic = false }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const localized = useLocalizedGame(game);

  const glowColor = index % 3 === 0 ? 'rgba(6,182,212,0.5)' : index % 3 === 1 ? 'rgba(168,85,247,0.5)' : 'rgba(236,72,153,0.5)';

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={isStatic ? false : { opacity: 0, y: 20 }}
        whileInView={isStatic ? undefined : { opacity: 1, y: 0 }}
        viewport={isStatic ? undefined : { once: true }}
        transition={isStatic ? undefined : { delay: (index % 8) * 0.04, duration: 0.4 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
        whileHover={{ y: -4 }}
        className="relative cursor-pointer rounded-xl overflow-hidden bg-white border border-slate-200"
        style={{
          boxShadow: isHovered ? `0 12px 32px ${glowColor}` : '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s',
        }}
      >
        {/* Thumbnail — full image visible, no crop */}
        <div className="relative w-full aspect-video min-h-[140px] sm:min-h-[180px] lg:min-h-[200px] bg-slate-100 flex items-center justify-center overflow-hidden">
          <motion.img
            src={game.thumbnail}
            alt={localized.title}
            className="w-full h-full object-contain object-center p-1"
            animate={{ scale: isHovered ? 1.03 : 1 }}
            transition={{ duration: 0.4 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {game.featured && (
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full"
              style={{ fontSize: '10px' }}>
              ⭐ TOP 10
            </div>
          )}

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)', boxShadow: '0 0 20px rgba(6,182,212,0.8)' }}
            >
              <IoPlay className="text-lg ml-0.5" />
            </div>
          </motion.div>
        </div>

        {/* Title below image */}
        <div className="px-3 py-2.5 sm:py-3">
          <h3
            className="text-slate-900 font-bold leading-tight line-clamp-2"
            style={{ fontSize: compact ? '12px' : '14px' }}
          >
            {localized.title}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <FaStar className="text-yellow-500" style={{ fontSize: '10px' }} />
            <span className="text-slate-500" style={{ fontSize: '11px' }}>{game.rating}</span>
          </div>
        </div>
      </motion.div>

      {showModal && <GameModal game={game} onClose={() => setShowModal(false)} />}
    </>
  );
}
