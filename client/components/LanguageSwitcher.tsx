import { Link, useLocation } from 'react-router-dom';
import { HiGlobeAlt, HiChevronDown } from 'react-icons/hi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n, Lang } from '../lib/i18n';

const LANGUAGES: { code: Lang; path: string; labelKey: 'langEn' | 'langFr' }[] = [
  { code: 'en', path: '/', labelKey: 'langEn' },
  { code: 'fr', path: '/fr', labelKey: 'langFr' },
];

export function LanguageSwitcher() {
  const { lang, t } = useI18n();
  const location = useLocation();

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:border-purple-300 hover:text-purple-600 transition-colors outline-none">
        <HiGlobeAlt className="text-lg" />
        <span className="hidden sm:inline">{t(current.labelKey) as string}</span>
        <HiChevronDown className="text-sm opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {LANGUAGES.map((item) => (
          <DropdownMenuItem key={item.code} asChild>
            <Link
              to={item.path + (location.hash || '')}
              className={`cursor-pointer ${lang === item.code ? 'font-bold text-purple-600' : ''}`}
            >
              {t(item.labelKey) as string}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
