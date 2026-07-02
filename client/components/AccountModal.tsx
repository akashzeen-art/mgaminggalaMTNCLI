import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';

const PID = 3;
const UNSUB_API = (msisdn: string) => `/api/civmtn/unsub?pid=${PID}&msisdn=${msisdn}`;

type Screen = 'account' | 'confirm' | 'success' | 'fail';

interface AccountModalProps {
  onClose: () => void;
}

export function AccountModal({ onClose }: AccountModalProps) {
  const { user, logout } = useAuth();
  const [screen, setScreen] = useState<Screen>('account');
  const [loading, setLoading] = useState(false);
  const [failMsg, setFailMsg] = useState('');

  if (!user) return null;

  const handleUnsub = async () => {
    setLoading(true);
    try {
      const res = await fetch(UNSUB_API(user.msisdn));
      const data = await res.json();
      if (data.response === 'SUCCECSS' || data.response === 'SUCCESS') {
        logout();
        setScreen('success');
      } else {
        setFailMsg(data.errorMessage || 'Service Deactivation Failed');
        setScreen('fail');
      }
    } catch {
      setFailMsg('Connection error. Please try again.');
      setScreen('fail');
    } finally {
      setLoading(false);
    }
  };

  const headerTitle =
    screen === 'confirm' ? 'Unsubscribe' :
    screen === 'success' ? 'Unsubscribed' :
    screen === 'fail'    ? 'Failed' :
    'My Account';

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
            className="px-6 py-4 text-white flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
          >
            <span className="font-bold text-base">{headerTitle}</span>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
              <HiX className="text-white text-lg" />
            </button>
          </div>

          <div className="px-6 py-5">

            {/* Account details */}
            {screen === 'account' && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {[
                    { label: 'Mobile',    value: `+${user.msisdn}` },
                    { label: 'Status',    value: <span className="text-green-600 font-semibold">Active ✓</span> },
                    { label: 'Activated', value: user.actDate },
                    { label: 'Renews',    value: user.renewDate },
                    { label: 'Price',     value: user.pricePoint },
                    { label: 'Validity',  value: `${user.validity} day(s)` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500 text-xs">{label}</span>
                      <span className="text-slate-800 text-xs font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setScreen('confirm')}
                  className="w-full mt-1 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors"
                >
                  Unsubscribe
                </motion.button>
              </div>
            )}

            {/* Confirm screen */}
            {screen === 'confirm' && (
              <div className="space-y-4 text-center py-2">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                  <span className="text-2xl">⚠️</span>
                </div>
                <p className="text-slate-700 font-semibold text-sm">Are you sure you want to unsubscribe?</p>
                <p className="text-slate-500 text-xs">You will lose access to all games.</p>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setScreen('account')}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleUnsub}
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Yes, Unsubscribe'}
                  </motion.button>
                </div>
              </div>
            )}

            {/* Success screen */}
            {screen === 'success' && (
              <div className="space-y-4 text-center py-2">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-slate-700 font-semibold text-sm">Service Deactivated Successfully</p>
                <p className="text-slate-500 text-xs">You have been unsubscribed from the service.</p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-white text-sm font-semibold"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}
                >
                  Close
                </motion.button>
              </div>
            )}

            {/* Fail screen */}
            {screen === 'fail' && (
              <div className="space-y-4 text-center py-2">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                  <span className="text-2xl">❌</span>
                </div>
                <p className="text-slate-700 font-semibold text-sm">{failMsg}</p>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setScreen('account')}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleUnsub}
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Retrying...' : 'Try Again'}
                  </motion.button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
