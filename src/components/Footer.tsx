import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-6 lg:px-12 mt-auto py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sub-monkey text-sm font-ui opacity-50 hover:opacity-100 transition-opacity duration-300 border-t border-sub-monkey/10">
      <div className="flex items-center gap-6">
        <a 
          href="https://github.com/FarrelAD/hanacaraka-type" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-main-monkey transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faGithub} className="w-[18px] h-[18px]" />
          <span>view source</span>
        </a>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="opacity-50">© {currentYear} • developed by</span>
          <a 
            href="https://github.com/FarrelAD" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-main-monkey transition-colors duration-200 font-bold"
          >
            FarrelAD
          </a>
        </div>
      </div>
    </footer>
  );
}
