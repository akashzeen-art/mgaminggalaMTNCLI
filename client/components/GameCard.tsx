import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
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
        className="group relative cursor-pointer rounded-xl overflow-hidden"
        style={{
          boxShadow: isHovered ? `0 12px 32px ${glowColor}` : '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s',
        }}
      >
        {/* Thumbnail with title overlay */}
        <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
          <motion.img
            src={game.thumbnail}
            alt={localized.title}
            className="w-full h-full object-contain object-center"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform"
              style={{ background: 'rgba(139, 92, 246, 0.9)', boxShadow: 'rgba(139, 92, 246, 0.6) 0px 0px 30px' }}
            >
              <Play className="w-5 h-5 text-white fill-white ml-0.5" aria-hidden="true" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-3 py-2 sm:py-2.5 z-10 pointer-events-none bg-gradient-to-t from-black/85 via-black/45 to-transparent">
            <h3
              className="text-white font-semibold leading-snug line-clamp-2 text-sm sm:text-[15px] tracking-wide"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.45)' }}
            >
              {localized.title}
            </h3>
          </div>
        </div>
      </motion.div>

      {showModal && <GameModal game={game} onClose={() => setShowModal(false)} />}
    </>
  );
}
