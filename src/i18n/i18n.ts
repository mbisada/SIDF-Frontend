import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import AR from './locales/ar.json';
import EN from './locales/en.json';

interface Language {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
  country_code: string;
}

export const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    dir: 'ltr',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
  },
];

export async function initializeI18n(): Promise<void> {
  try {
    await i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      debug: false,
      resources: {
        en: {
          translation: EN,
        },
        ar: {
          translation: AR,
        },
      },
    });
  } catch {
    return;
  }
}
