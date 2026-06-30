import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/games';
import { useI18n } from '../lib/i18n';
import { getCategoryLabel } from '../lib/localizedGames';

export function CategoriesSection({ onCategorySelect }: { onCategorySelect: (category: string) => void }) {
  const { t, lang } = useI18n();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            {t('gameCategories') as string}
          </h2>
          <p className="text-slate-500">
            {t('exploreGenres') as string}
          </p>
        </motion.div>

        {/* Categories grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {CATEGORIES.map((category, i) => {
            return (
              <motion.button
                key={category.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
                onClick={() => onCategorySelect(category.name)}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-neon-purple/30 to-neon-pink/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative bg-white border border-slate-200 group-hover:border-purple-300 group-hover:shadow-lg rounded-xl p-6 sm:p-8 text-center transition-all duration-300 h-full flex flex-col justify-center items-center shadow-sm">
                  <div className="text-4xl sm:text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">
                    {category.icon}
                  </div>
                  <h3 className="text-slate-800 font-bold text-lg">
                    {getCategoryLabel(category.name, lang)}
                  </h3>
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
                    initial={{ width: '0%' }}
                    whileHover={{ width: '80%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
