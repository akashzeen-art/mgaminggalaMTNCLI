import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMail } from 'react-icons/hi';
import { useI18n } from '../lib/i18n';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => { setEmail(''); setSubmitted(false); }, 3000);
    }
  };

  const features = [
    { icon: '🎮', text: t('newGames') as string },
    { icon: '🎁', text: t('exclusiveOffers') as string },
    { icon: '📊', text: t('trendingGames') as string },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-200 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-px rounded-2xl pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4, #ec4899, #a855f7)', backgroundSize: '300% 300%' }}
          />

          <div className="relative bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xl">
            <div className="text-center mb-8">
              <img
                src="/gaminggala.png"
                alt="Gaming Gala"
                className="h-12 w-auto object-contain mx-auto mb-4"
              />
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl font-black text-slate-900 mb-2"
              >
                {t('newsletterTitle') as string}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500"
              >
                {t('newsletterSub') as string}
              </motion.p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
            >
              <div className="flex-1 relative group">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-xl z-10" />
                <input
                  type="email"
                  placeholder={t('emailPlaceholder') as string}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-purple-400 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-300"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168,85,247,0.4)' }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-3 font-bold rounded-xl text-white whitespace-nowrap transition-all"
                style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.span key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      ✓ {t('subscribed') as string}
                    </motion.span>
                  ) : (
                    <motion.span key="sub" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      {t('subscribe') as string}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-slate-200"
            >
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, color: '#06b6d4' }}
                  className="flex items-center gap-2 text-slate-500 cursor-default"
                >
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-sm">{f.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
