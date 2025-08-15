'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'MY', name: 'Bahasa Malaysia', flag: '🇲🇾' },
  { code: 'zh', name: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-TW', name: '中文 (繁體)', flag: '🇹🇼' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('common');

  const switchLanguage = (newLocale) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const detectPreferredLanguage = () => {
    const browserLang = navigator.language;
    const supportedLang = languages.find(lang => 
      browserLang.startsWith(lang.code) || 
      browserLang === lang.code
    );
    
    if (supportedLang && supportedLang.code !== locale) {
      switchLanguage(supportedLang.code);
    } else {
      alert(`Your browser language (${browserLang}) is already active or not supported. Supported languages: ${languages.map(l => l.code).join(', ')}`);
    }
  };

  return (
    <div className="language-switcher bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-gray-200/20">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
        {t('language.switchLanguage')}
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              locale === language.code
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label={`Switch to ${language.name}`}
          >
            <span className="mr-1">{language.flag}</span>
            {language.name}
          </button>
        ))}
      </div>

      <button
        onClick={detectPreferredLanguage}
        className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium transition-colors"
      >
        🌐 {t('language.autoDetect')}
      </button>

      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        <strong>{t('language.currentLanguage')}:</strong> {locale?.toUpperCase()}
        <br />
        <strong>URL Structure:</strong> /{locale === 'en' ? '' : locale + '/'}
      </div>
    </div>
  );
}