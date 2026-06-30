import { createContext, useContext, ReactNode } from 'react';

export type Lang = 'en' | 'fr' | 'ar';

export const translations = {
  en: {
    // Navbar
    home: 'Home',
    games: 'Games',
    categories: 'Categories',
    trending: 'Trending',
    gamePro: 'mgaminggala',
    // Hero
    heroPlay: 'Play',
    heroGamesOnline: 'Games Online',
    heroSub: 'Discover hundreds of games instantly. No downloads, no installs — just pure fun.',
    playNow: 'Play Now',
    browseGames: 'Browse Games',
    scrollToExplore: 'Scroll to explore',
    // Featured
    featuredGame: 'Featured Game',
    // Stats
    trustedBy: 'Trusted by',
    millions: 'Millions',
    joinCommunity: 'Join our growing gaming community',
    players: 'Players',
    totalPlays: 'Total Plays',
    // Categories
    gameCategories: 'Game Categories',
    exploreGenres: 'Explore different genres and find your favorite games',
    // Library
    gameLibrary: 'Game Library',
    browseByCategory: 'Browse games by category',
    seeAll: 'See All →',
    // Modal
    back: 'Back',
    tapToPlay: 'Tap to start playing',
    exitFullscreen: 'Exit Fullscreen',
    // Footer
    footerDesc: 'Premium gaming portal with 100+ amazing games for everyone.',
    allRights: 'All rights reserved.',
    designedFor: 'Designed with 🎮 for gamers worldwide',
    // Typewriter words
    words: ['Action', 'Puzzle', 'Arcade', 'Racing', 'Adventure'],
    // Preloader
    preloaderTitle: 'GAME PORTAL',
    preloaderSub: 'LOADING EXPERIENCE',
    // Game categories (translated names shown in cards)
    topTenGames: 'Top 10 Games',
    allGames: 'All Games',
    easyToPlay: 'Easy to Play',
    puzzle: 'Puzzle',
    action: 'Action',
    arcade: 'Arcade',
    // Language
    language: 'Language',
    langEn: 'English',
    langFr: 'French',
    loading: 'Loading',
    // Newsletter
    newsletterTitle: 'Stay Updated',
    newsletterSub: 'Get the latest games and exclusive offers delivered to your inbox',
    emailPlaceholder: 'Enter your email',
    subscribe: 'Subscribe',
    subscribed: 'Done!',
    newGames: 'New Games',
    exclusiveOffers: 'Exclusive Offers',
    trendingGames: 'Trending Games',
  },
  fr: {
    home: 'Accueil',
    games: 'Jeux',
    categories: 'Catégories',
    trending: 'Tendances',
    gamePro: 'mgaminggala',
    heroPlay: 'Jouez',
    heroGamesOnline: 'Jeux en Ligne',
    heroSub: 'Découvrez des centaines de jeux instantanément. Sans téléchargement, sans installation — que du plaisir.',
    playNow: 'Jouer',
    browseGames: 'Parcourir les Jeux',
    scrollToExplore: 'Faites défiler pour explorer',
    featuredGame: 'Jeu en Vedette',
    trustedBy: 'Approuvé par',
    millions: 'des Millions',
    joinCommunity: 'Rejoignez notre communauté de joueurs',
    players: 'Joueurs',
    totalPlays: 'Parties Jouées',
    gameCategories: 'Catégories de Jeux',
    exploreGenres: 'Explorez différents genres et trouvez vos jeux préférés',
    gameLibrary: 'Bibliothèque de Jeux',
    browseByCategory: 'Parcourir les jeux par catégorie',
    seeAll: 'Voir Tout →',
    back: 'Retour',
    tapToPlay: 'Appuyez pour jouer',
    exitFullscreen: 'Quitter le Plein Écran',
    footerDesc: 'Portail de jeux premium avec plus de 100 jeux incroyables pour tous.',
    allRights: 'Tous droits réservés.',
    designedFor: 'Conçu avec 🎮 pour les joueurs du monde entier',
    words: ['Action', 'Puzzle', 'Arcade', 'Course', 'Aventure'],
    preloaderTitle: 'PORTAIL DE JEUX',
    preloaderSub: 'CHARGEMENT',
    topTenGames: 'Top 10 Jeux',
    allGames: 'Tous les Jeux',
    easyToPlay: 'Facile à Jouer',
    puzzle: 'Puzzle',
    action: 'Action',
    arcade: 'Arcade',
    language: 'Langue',
    langEn: 'Anglais',
    langFr: 'Français',
    loading: 'Chargement',
    newsletterTitle: 'Restez Informé',
    newsletterSub: 'Recevez les derniers jeux et offres exclusives dans votre boîte mail',
    emailPlaceholder: 'Entrez votre e-mail',
    subscribe: "S'abonner",
    subscribed: 'Fait !',
    newGames: 'Nouveaux Jeux',
    exclusiveOffers: 'Offres Exclusives',
    trendingGames: 'Jeux Tendance',
  },
  ar: {
    // Navbar
    home: 'الرئيسية',
    games: 'الألعاب',
    categories: 'الفئات',
    trending: 'الأكثر شيوعاً',
    gamePro: 'mgaminggala',
    // Hero
    heroPlay: 'العب',
    heroGamesOnline: 'ألعاباً أونلاين',
    heroSub: 'اكتشف مئات الألعاب فوراً. بدون تنزيل، بدون تثبيت — متعة خالصة.',
    playNow: 'العب الآن',
    browseGames: 'تصفح الألعاب',
    scrollToExplore: 'مرر للاستكشاف',
    // Featured
    featuredGame: 'لعبة مميزة',
    // Stats
    trustedBy: 'موثوق به من قِبَل',
    millions: 'الملايين',
    joinCommunity: 'انضم إلى مجتمع الألعاب المتنامي',
    players: 'اللاعبون',
    totalPlays: 'إجمالي الجلسات',
    // Categories
    gameCategories: 'فئات الألعاب',
    exploreGenres: 'استكشف الأنواع المختلفة وابحث عن ألعابك المفضلة',
    // Library
    gameLibrary: 'مكتبة الألعاب',
    browseByCategory: 'تصفح الألعاب حسب الفئة',
    seeAll: 'عرض الكل →',
    // Modal
    back: 'رجوع',
    tapToPlay: 'اضغط للبدء',
    exitFullscreen: 'خروج من ملء الشاشة',
    // Footer
    footerDesc: 'بوابة ألعاب متميزة تضم أكثر من 100 لعبة رائعة للجميع.',
    allRights: 'جميع الحقوق محفوظة.',
    designedFor: 'صُمِّم بـ 🎮 للاعبين حول العالم',
    // Typewriter words
    words: ['أكشن', 'ألغاز', 'أركيد', 'سباقات', 'مغامرات'],
    // Preloader
    preloaderTitle: 'بوابة الألعاب',
    preloaderSub: 'جارٍ التحميل',
    // Game categories
    topTenGames: 'أفضل 10 ألعاب',
    allGames: 'جميع الألعاب',
    easyToPlay: 'سهلة اللعب',
    puzzle: 'ألغاز',
    action: 'أكشن',
    arcade: 'أركيد',
    language: 'اللغة',
    langEn: 'الإنجليزية',
    langFr: 'الفرنسية',
    loading: 'جارٍ التحميل',
    newsletterTitle: 'ابقَ على اطلاع',
    newsletterSub: 'احصل على أحدث الألعاب والعروض الحصرية في بريدك',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    subscribe: 'اشترك',
    subscribed: 'تم!',
    newGames: 'ألعاب جديدة',
    exclusiveOffers: 'عروض حصرية',
    trendingGames: 'ألعاب رائجة',
  },
};

export type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  lang: Lang;
  t: (key: TranslationKey) => string | string[];
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  t: (key) => translations.en[key] as string,
  isRTL: false,
});

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = (key: TranslationKey) => translations[lang][key] as string | string[];
  return (
    <I18nContext.Provider value={{ lang, t, isRTL: lang === 'ar' }}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang}>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
