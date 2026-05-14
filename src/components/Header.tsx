import type { Mode, WordLimit } from '@/types';

export default function Header({ 
  mode, 
  setMode, 
  wordLimit,
  setWordLimit,
  wpm, 
  accuracy,
  onOpenReference
}: { 
  mode: Mode; 
  setMode: (mode: Mode) => void; 
  wordLimit: WordLimit;
  setWordLimit: (limit: WordLimit) => void;
  wpm: number; 
  accuracy: number; 
  onOpenReference: () => void;
}) {
  const limits: WordLimit[] = [10, 25, 50, 100, 'infinite'];

  return (
    <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mb-2 md:mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
        <div className="flex items-center gap-4">
          <div className="text-2xl md:text-3xl font-bold text-text-monkey">
            hanacaraka<span className="text-main-monkey">type</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onOpenReference(); }}
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 text-xs font-ui bg-main-monkey text-bg-monkey rounded-lg border border-main-monkey/50 shadow-[0_0_15px_rgba(209,177,15,0.2)] hover:shadow-[0_0_20px_rgba(209,177,15,0.4)] transition-all cursor-pointer animate-pulse-subtle group"
            title="Open Character Guide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"></path></svg>
            <span className="font-black uppercase tracking-widest">Guide</span>
          </button>
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
