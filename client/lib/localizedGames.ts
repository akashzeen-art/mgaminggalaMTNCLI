import { Lang } from './i18n';
import { useI18n } from './i18n';
import { GAME_TITLES_FR } from '../data/gameTitles.fr';
import { Game } from '../data/games';

const CATEGORY_FR: Record<string, string> = {
  'Top 10 Games': 'Top 10 Jeux',
  'All Games': 'Tous les Jeux',
  'Easy to Play': 'Facile à Jouer',
  Puzzle: 'Puzzle',
  Action: 'Action',
  Arcade: 'Arcade',
};

export function getGameTitle(game: Game, lang: Lang): string {
  if (lang === 'fr') return GAME_TITLES_FR[game.id] ?? game.title;
  return game.title;
}

export function getCategoryLabel(category: string, lang: Lang): string {
  if (lang === 'fr') return CATEGORY_FR[category] ?? category;
  return category;
}

export function localizeGame(game: Game, lang: Lang) {
  return {
    ...game,
    title: getGameTitle(game, lang),
    category: getCategoryLabel(game.category, lang),
    categoryKey: game.category,
  };
}

export function useLocalizedGame(game: Game) {
  const { lang } = useI18n();
  return localizeGame(game, lang);
}
