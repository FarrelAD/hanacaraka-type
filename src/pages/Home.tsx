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
          className="flex flex-col items-center justify-center p-8 bg-bg-theme/20 rounded-2xl border border-sub-theme/40 hover:border-main-theme/50 hover:bg-bg-theme/30 transition-all duration-200 hover:-translate-y-1"
        >
          <div className="mb-4 text-sub-theme">
            <FontAwesomeIcon icon={faKeyboard} className="h-10 w-10" />
          </div>
          <h2 className="text-xl font-bold text-text-theme font-ui tracking-widest uppercase">
            Typing
          </h2>
        </Link>

        {/* Cluster Puzzle Card */}
        <Link 
          to="/puzzle"
          className="flex flex-col items-center justify-center p-8 bg-bg-theme/20 rounded-2xl border border-sub-theme/40 hover:border-main-theme/50 hover:bg-bg-theme/30 transition-all duration-200 hover:-translate-y-1"
        >
          <div className="mb-4 text-sub-theme">
            <FontAwesomeIcon icon={faPuzzlePiece} className="h-10 w-10" />
          </div>
          <h2 className="text-xl font-bold text-text-theme font-ui tracking-widest uppercase">
            Puzzle
          </h2>
        </Link>
      </div>
    </main>
  );
}
