import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl mt-auto py-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sub-monkey text-sm font-ui opacity-50 hover:opacity-100 transition-opacity duration-300 border-t border-sub-monkey/10">
      <div className="flex items-center gap-6">
        <a 
          href="https://github.com/FarrelAD/hanacaraka-type" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-main-monkey transition-colors duration-200"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="18" 
            height="18" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>view source</span>
        </a>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="opacity-50">developed by</span>
          <a 
            href="https://github.com/FarrelAD" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-main-monkey transition-colors duration-200"
          >
            FarrelAD
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
