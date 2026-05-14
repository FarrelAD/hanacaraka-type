import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {/* Typing Practice Card */}
        <Link 
          to="/typing"
          className="flex flex-col items-center justify-center p-8 bg-bg-monkey/20 rounded-2xl border border-sub-monkey/10 hover:border-main-monkey/50 transition-colors duration-200"
        >
          <div className="mb-4 text-sub-monkey">
            <FontAwesomeIcon icon={faKeyboard} className="h-10 w-10" />
          </div>
          <h2 className="text-xl font-bold text-text-monkey font-ui tracking-widest uppercase">
            Typing
          </h2>
        </Link>

        {/* Cluster Puzzle Card */}
        <Link 
          to="/puzzle"
          className="flex flex-col items-center justify-center p-8 bg-bg-monkey/20 rounded-2xl border border-sub-monkey/10 hover:border-main-monkey/50 transition-colors duration-200"
        >
          <div className="mb-4 text-sub-monkey">
            <FontAwesomeIcon icon={faPuzzlePiece} className="h-10 w-10" />
          </div>
          <h2 className="text-xl font-bold text-text-monkey font-ui tracking-widest uppercase">
            Puzzle
          </h2>
        </Link>
      </div>
    </main>
  );
}
