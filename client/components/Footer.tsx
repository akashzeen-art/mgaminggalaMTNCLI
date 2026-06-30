import { motion } from 'framer-motion';
import { useI18n } from '../lib/i18n';

export function Footer() {
  const { t } = useI18n();
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="flex flex-col items-center gap-3 mb-8"
        >
          <img
            src="/gaminggala.png"
            alt="Gaming Gala"
            className="h-10 w-auto object-contain"
          />
          <p className="text-slate-500 text-sm text-center max-w-sm">
            {t('footerDesc') as string}
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mb-8"
          style={{ originX: 0 }}
        />

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          className="flex flex-col sm:flex-row justify-between items-center text-slate-500 text-sm"
        >
          <p>&copy; 2026 {t('gamePro') as string}. {t('allRights') as string}</p>
          <p>{t('designedFor') as string}</p>
        </motion.div>
      </div>
    </footer>
  );
}
