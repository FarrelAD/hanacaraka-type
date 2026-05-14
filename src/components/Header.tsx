import type { Mode, WordLimit } from '@/types';

export default function Header({ 
  mode, 
  setMode, 
  wordLimit,
  setWordLimit,
  wpm, 
  accuracy 
}: { 
  mode: Mode; 
  setMode: (mode: Mode) => void; 
  wordLimit: WordLimit;
  setWordLimit: (limit: WordLimit) => void;
  wpm: number; 
  accuracy: number; 
}) {
  const limits: WordLimit[] = [10, 25, 50, 100, 'infinite'];

  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mb-2 md:mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
        <div className="text-2xl md:text-3xl font-bold text-text-monkey">
          hanacaraka<span className="text-main-monkey">type</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <nav className="flex gap-2 text-xs md:text-sm font-ui bg-[#2c2e31] p-1 rounded-lg">
            <button 
              onClick={(e) => { e.stopPropagation(); setMode('latin'); }}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${mode === 'latin' ? 'bg-main-monkey text-bg-monkey' : 'text-sub-monkey hover:text-text-monkey'}`}
            >
              latin
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setMode('hanacaraka'); }}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${mode === 'hanacaraka' ? 'bg-main-monkey text-bg-monkey' : 'text-sub-monkey hover:text-text-monkey'}`}
            >
              hanacaraka
            </button>
          </nav>

          <nav className="flex gap-2 text-xs md:text-sm font-ui bg-[#2c2e31] p-1 rounded-lg">
            {limits.map((limit) => (
              <button 
                key={limit}
                onClick={(e) => { e.stopPropagation(); setWordLimit(limit); }}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${wordLimit === limit ? 'bg-main-monkey text-bg-monkey' : 'text-sub-monkey hover:text-text-monkey'}`}
              >
                {limit}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex gap-4 md:gap-12 text-lg md:text-2xl text-sub-monkey">
        <div className="flex gap-2">
          wpm: <span className="text-main-monkey font-bold">{wpm}</span>
        </div>
        <div className="flex gap-2">
          acc: <span className="text-main-monkey font-bold">{accuracy}%</span>
        </div>
      </div>
    </header>
  );
}
