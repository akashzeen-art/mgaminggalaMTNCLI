import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { GAMES } from '../data/games';
import { FaStar } from 'react-icons/fa';
import { HiChevronLeft, HiOutlineArrowsExpand } from 'react-icons/hi';
import { IoPlay } from 'react-icons/io5';

export default function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = GAMES.find((g) => g.id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  if (!game) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Game Not Found</h1>
          <p className="text-slate-500 mb-8">The game you're looking for doesn't exist.</p>
          <Link to="/">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold rounded-lg">
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const relatedGames = GAMES.filter((g) => g.category === game.category && g.id !== game.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-colors">
            <HiChevronLeft className="text-xl" /> Back
          </button>
          <h1 className="text-xl font-bold text-slate-900">{game.title}</h1>
          <div className="w-12" />
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Inline Game iframe */}
        {game.iframeUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-xl overflow-hidden border border-slate-200 mb-8 relative shadow-lg bg-slate-900 min-h-[55vh] sm:min-h-[65vh]"
          >
            {!gameStarted ? (
              <div className="relative w-full h-full min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain p-6"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(168,85,247,0.8)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGameStarted(true)}
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
                  >
                    <IoPlay className="ml-1" />
                  </motion.button>
                  <p className="text-white font-bold text-xl drop-shadow-lg">Click to Play</p>
                </div>
              </div>
            ) : (
              <iframe
                src={game.iframeUrl}
                title={game.title}
                className="absolute inset-0 w-full h-full min-h-[55vh] sm:min-h-[65vh] border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            )}

            {/* Fullscreen button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsFullscreen(true)}
              className="absolute top-3 right-3 p-2 bg-slate-950/70 hover:bg-slate-900 text-white rounded-lg backdrop-blur-sm transition-colors z-10"
            >
              <HiOutlineArrowsExpand className="text-xl" />
            </motion.button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-3xl font-black text-slate-900 mb-2">{game.title}</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500" />
                <span className="text-slate-800 font-bold">{game.rating}</span>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold border border-purple-200">
                {game.category}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(6,182,212,0.7)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setGameStarted(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 px-8 py-3 text-white font-bold rounded-xl mb-6"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
            >
              <IoPlay /> Play Now
            </motion.button>

            <div className="grid grid-cols-3 gap-4 text-sm">
              {[
                { label: 'Developer', value: 'GameStudio Pro' },
                { label: 'Released', value: '2026' },
                { label: 'Plays', value: '12,345' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <p className="text-slate-500 text-xs mb-1">{item.label}</p>
                  <p className="text-slate-800 font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Related Games */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-slate-200 rounded-xl p-6 h-fit shadow-sm"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">Related Games</h3>
            <div className="space-y-3">
              {relatedGames.map((g) => (
                <Link key={g.id} to={`/game/${g.id}`}>
                  <motion.div whileHover={{ x: 5 }} className="flex gap-3 cursor-pointer group mb-3">
                    <img src={g.thumbnail} alt={g.title}
                      className="w-24 aspect-video rounded-lg object-cover object-center group-hover:opacity-80 transition-opacity flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 font-semibold text-sm line-clamp-2 group-hover:text-purple-600 transition-colors">{g.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <FaStar className="text-yellow-500 text-xs" />
                        <span className="text-slate-500 text-xs">{g.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black"
          style={{ width: '100vw', height: '100dvh' }}
        >
          <button onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white text-3xl z-50 hover:text-neon-cyan transition-colors bg-black/50 rounded-lg px-2 py-1">
            ✕
          </button>
          <iframe
            src={game.iframeUrl}
            title={game.title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </motion.div>
      )}
    </div>
  );
}
