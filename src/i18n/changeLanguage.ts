import i18n from 'i18next';
import { setItem } from '../utils/localStorage';

export const changeLanguage = async (code: string): Promise<void> => {
  try {
    await i18n.changeLanguage(code);
    document.dir = i18n.dir();
    setItem('code', code);
  } catch (error) {
    return;
  }
};
