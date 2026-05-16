import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import ScriptReference from '@/components/ScriptReference';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const isHome = location.pathname === '/';

  return (
    <>
      <header className="w-full px-6 lg:px-12 pt-8 md:pt-12 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-text-theme font-ui tracking-tighter">
              hanacaraka<span className="text-main-theme">type</span>
            </h1>
          </Link>
          
          {!isHome && (
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center gap-2 bg-main-theme text-bg-theme px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faBook} />
              {t('common.guide')}
            </button>
          )}
        </div>

        <nav className="flex items-center gap-4 md:gap-6">
          <LanguageSwitcher />
          
          {!isHome && (
            <>
              <Link 
                to="/typing" 
                className={`text-xs font-ui font-bold uppercase tracking-widest transition-colors hidden sm:block ${
                  location.pathname === '/typing' ? 'text-main-theme' : 'text-sub-theme hover:text-text-theme'
                }`}
              >
                {t('common.typing')}
              </Link>
              <Link 
                to="/puzzle" 
                className={`text-xs font-ui font-bold uppercase tracking-widest transition-colors hidden sm:block ${
                  location.pathname === '/puzzle' ? 'text-main-theme' : 'text-sub-theme hover:text-text-theme'
                }`}
              >
                {t('common.puzzle')}
              </Link>
            </>
          )}
          <a 
            href="https://github.com/FarrelAD/hanacaraka-type" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sub-theme hover:text-main-theme transition-colors p-1 ml-2"
            title="View Source"
          >
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
          </a>
        </nav>
      </header>

      <ScriptReference 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />
    </>
  );
}
