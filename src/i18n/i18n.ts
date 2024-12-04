import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import AR from './locales/ar.json';
import EN from './locales/en.json';

import {  setItem } from '../utils/localStorage';
import { LangBtnStatusProps } from '@/App';

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

const myCustomDetector = (lang: LangBtnStatusProps) => {
  const path = window.location.pathname.split('/')[1];
if (lang.isEnglish)setItem('code', 'en');

  if (!lang.changeLnaguage && lang.isEnglish) {
    setItem('code', 'en');
    return 'en';
  }

  if (!lang.changeLnaguage && !lang.isEnglish) {
    setItem('code', 'ar');
    return 'ar';
  }

  return languages.findIndex(item => item?.code === path) > -1 ? path : lang.isEnglish ? 'en' : 'ar';
};

export async function initializeI18n(lang: LangBtnStatusProps): Promise<void> {
  console.log('laaaaaaaaaang=>>>>>', myCustomDetector(lang));

  try {
    await i18n.use(initReactI18next).init({
      lng: myCustomDetector(lang),
      // fallbackLng: 'ar',
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
  } catch (err) {
    console.error('i18n initialization error:', err);
  }
}
