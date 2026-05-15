import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ScriptReference from '@/components/ScriptReference';

export default function Header() {
  const location = useLocation();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const isHome = location.pathname === '/';

  return (
    <>
      <header className="w-full px-6 lg:px-12 pt-8 md:pt-12 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-text-monkey font-ui tracking-tighter">
              hanacaraka<span className="text-main-monkey">type</span>
            </h1>
          </Link>
          
          {!isHome && (
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center gap-2 bg-main-monkey text-bg-monkey px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faBook} />
              Guide
            </button>
          )}
        </div>

        <nav className="flex items-center gap-4 md:gap-6">
          {!isHome && (
            <>
              <Link 
                to="/typing" 
                className={`text-xs font-ui font-bold uppercase tracking-widest transition-colors hidden sm:block ${
                  location.pathname === '/typing' ? 'text-main-monkey' : 'text-sub-monkey hover:text-text-monkey'
                }`}
              >
                Typing
              </Link>
              <Link 
                to="/puzzle" 
                className={`text-xs font-ui font-bold uppercase tracking-widest transition-colors hidden sm:block ${
                  location.pathname === '/puzzle' ? 'text-main-monkey' : 'text-sub-monkey hover:text-text-monkey'
                }`}
              >
                Puzzle
              </Link>
            </>
          )}
          <a 
            href="https://github.com/FarrelAD/hanacaraka-type" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sub-monkey hover:text-main-monkey transition-colors p-1 ml-2"
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
