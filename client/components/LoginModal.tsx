import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';

const PID = 3;
const LOGIN_API = (msisdn: string) => `/api/civmtn/login?pid=${PID}&msisdn=${msisdn}`;
const SUBSCRIBE_URL = 'http://168.144.122.72/prod/LP/landing?creatid=3&hash=CIVMTN';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inactive, setInactive] = useState(false);
  const [insufficient, setInsufficient] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!number.trim()) return;

    const msisdn = `225${number.trim()}`;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(LOGIN_API(msisdn));
      const data = await res.json();

      if (data.response === 'ACTIVE') {
        login({
          msisdn,
          actDate: data.actDate,
          renewDate: data.renewDate,
          pricePoint: data.pricePoint,
          validity: data.validity,
          unsubUrl: data.unsubUrl,
        });
        onSuccess();
        onClose();
      } else if (data.response === 'INSUFFICIENT') {
        setInsufficient(true);
      } else {
        setInactive(true);
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="px-6 py-5 text-white text-center relative"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <HiX className="text-white text-lg" />
            </button>
            <img src="/gaminggala.png" alt="Gaming Gala" className="h-8 mx-auto mb-2 object-contain" />
            <p className="text-white/90 text-sm">
              {insufficient ? 'Insufficient Balance' : inactive ? 'Subscription Required' : 'Enter your mobile number to play'}
            </p>
          </div>

          {insufficient ? (
            /* Insufficient balance screen */
            <div className="px-6 py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                <span className="text-2xl">💳</span>
              </div>
              <p className="text-slate-700 font-semibold text-sm">Insufficient Balance</p>
              <p className="text-slate-500 text-xs">You don't have enough balance to subscribe. Please recharge and try again.</p>
              <motion.a
                href={SUBSCRIBE_URL}
                whileTap={{ scale: 0.97 }}
                className="block w-full py-2.5 rounded-xl text-white font-semibold text-sm text-center"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
              >
                Click here to subscribe
              </motion.a>
              <button
                onClick={() => setInsufficient(false)}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                ← Try another number
              </button>
            </div>
          ) : inactive ? (
            /* Inactive screen */
            <div className="px-6 py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-slate-700 font-semibold text-sm">Your subscription is not active.</p>
              <p className="text-slate-500 text-xs">Click below to activate.</p>
              <motion.a
                href={SUBSCRIBE_URL}
                whileTap={{ scale: 0.97 }}
                className="block w-full py-2.5 rounded-xl text-white font-semibold text-sm text-center"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
              >
                Click here to subscribe
              </motion.a>
              <button
                onClick={() => setInactive(false)}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                ← Try another number
              </button>
            </div>
          ) : (
            /* Login form */
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Mobile Number
                </label>
                <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                  <span className="flex items-center px-3 bg-slate-50 text-slate-600 text-sm font-semibold border-r border-slate-200 whitespace-nowrap">
                    +225
                  </span>
                  <input
                    type="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="0507954479"
                    className="flex-1 px-3 py-2.5 text-sm outline-none bg-white"
                    maxLength={10}
                    autoFocus
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs text-center">{error}</p>}

              <motion.button
                type="submit"
                disabled={loading || !number.trim()}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
              >
                {loading ? 'Checking...' : 'Play Now'}
              </motion.button>

              <p className="text-xs text-slate-400 text-center">
                By continuing, you agree to the subscription terms.
              </p>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
