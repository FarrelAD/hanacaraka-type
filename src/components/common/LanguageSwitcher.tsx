import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="text-xs font-bold uppercase tracking-widest text-sub-theme hover:text-main-theme transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-main-theme/5"
      title={i18n.language === 'en' ? 'Switch to Bahasa Indonesia' : 'Ganti ke Bahasa Inggris'}
    >
      <span className={i18n.language === 'en' ? 'text-main-theme' : ''}>EN</span>
      <span className="text-sub-theme/30">/</span>
      <span className={i18n.language === 'id' ? 'text-main-theme' : ''}>ID</span>
    </button>
  );
}
