'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
];

export const LanguageSelector = () => {
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = useLocale();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (newLocale: string) => {
    const newPathname = pathName.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    setShowLangMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setShowLangMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={langMenuRef}>
      <button
        onClick={() => setShowLangMenu(!showLangMenu)}
        className="px-4 py-2 border border-primary-dark text-sm font-medium text-primary-dark hover:bg-primary-dark hover:text-white transition-colors flex items-center gap-2"
      >
        <span>{currentLocale.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            showLangMenu ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showLangMenu && (
        <div className="absolute right-0 mt-1 w-32 bg-white border border-border shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-muted ${
                currentLocale === language.code ? 'bg-muted font-medium' : ''
              }`}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
