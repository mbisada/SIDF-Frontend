import i18n from 'i18next';

export const changeLanguage = async (code: string): Promise<void> => {
  try {
    await i18n.changeLanguage(code);
    document.dir = i18n.dir();
    localStorage.setItem('code', code);
  } catch {
    return;
  }
};
