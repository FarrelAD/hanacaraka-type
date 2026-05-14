import { useState, useEffect, useRef, useCallback } from 'react';
import Word from '@/components/Word';
import Results from '@/components/Results';
import { JAVANESE_WORDS_DATA } from '@/data/words';
import type { Mode, WordData } from '@/types';

export default function TypingGame() {
  const [words, setWords] = useState<WordData[]>([]);
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [mode, setMode] = useState<Mode>('latin');
  const [wordLimit, setWordLimit] = useState<number | 'infinite'>(25);
  const [history, setHistory] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const generateWordList = useCallback((limit: number | 'infinite') => {
    const actualLimit = limit === 'infinite' ? 50 : limit;
    const shuffled = [...JAVANESE_WORDS_DATA].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, actualLimit);
  }, []);

  const resetGame = useCallback(() => {
    const initialWords = generateWordList(wordLimit);
    setWords(initialWords);
    setUserInput('');
    setCurrentIndex(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setMistakes(0);
    setTypedChars(0);
    setHistory([]);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [wordLimit, generateWordList]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (isFinished) return;
    if (!startTime) setStartTime(Date.now());

    if (value.endsWith(' ')) {
      const currentWordData = words[currentIndex];
      const typedWord = value.trim();

      if (typedWord !== currentWordData.latin) {
        setMistakes(prev => prev + 1);
      }

      setTypedChars(prev => prev + currentWordData.latin.length + 1);
      
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[currentIndex] = typedWord;
        return newHistory;
      });

      if (currentIndex === words.length - 1) {
        if (wordLimit === 'infinite') {
          setWords(prev => [...prev, ...generateWordList('infinite')]);
          setCurrentIndex(prev => prev + 1);
          setUserInput('');
        } else {
          finishGame();
        }
      } else {
        setCurrentIndex(prev => prev + 1);
        setUserInput('');
      }
    } else {
      setUserInput(value);
    }
  };

  const finishGame = () => {
    setIsFinished(true);
    const endTime = Date.now();
    const durationInMinutes = (endTime - (startTime || endTime)) / 60000;
    const finalWpm = Math.round((typedChars / 5) / durationInMinutes) || 0;
    setWpm(finalWpm);
    
    const totalPossibleChars = typedChars + userInput.length;
    const finalAcc = totalPossibleChars > 0 
      ? Math.round(((totalPossibleChars - mistakes) / totalPossibleChars) * 100) 
      : 100;
    setAccuracy(finalAcc);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 md:py-16 animate-in fade-in duration-500">
      {!isFinished ? (
        <div className="space-y-8 md:space-y-12">
          {/* Top Controls & Stats Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-bg-monkey py-2">
            <div className="flex items-center gap-6">
              {/* Mode Toggle */}
              <div className="flex bg-bg-monkey/40 rounded-lg overflow-hidden">
                {(['latin', 'hanacaraka'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`px-4 py-1.5 text-xs font-ui transition-colors ${
                      mode === m ? 'bg-main-monkey text-bg-monkey' : 'text-sub-monkey hover:text-text-monkey bg-bg-monkey/20'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Word Limit Selector */}
              <div className="flex items-center gap-4">
                {([10, 25, 50, 100, 'infinite'] as const).map((limit) => (
                  <button
                    key={limit}
                    type="button"
                    onClick={() => setWordLimit(limit)}
                    className={`text-xs font-ui transition-colors ${
                      wordLimit === limit ? 'text-main-monkey font-bold' : 'text-sub-monkey hover:text-text-monkey'
                    }`}
                  >
                    {limit}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 font-ui text-lg">
              <div className="text-sub-monkey">
                wpm: <span className="text-main-monkey font-bold ml-1">{wpm}</span>
              </div>
              <div className="text-sub-monkey">
                acc: <span className="text-main-monkey font-bold ml-1">{accuracy}%</span>
              </div>
            </div>
          </div>

          <div 
            className="relative p-6 md:p-8 rounded-2xl bg-bg-monkey/20 border border-sub-monkey/5 cursor-text min-h-[180px] md:min-h-[220px]"
            onClick={() => inputRef.current?.focus()}
          >
            <input
              ref={inputRef}
              type="text"
              autoFocus
              className="absolute opacity-0 pointer-events-none"
              value={userInput}
              onChange={handleInput}
              autoCapitalize="none"
              autoComplete="off"
              spellCheck="false"
            />
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-4 text-2xl md:text-3xl leading-relaxed transition-all duration-300">
              {words.map((wordData, index) => (
                <Word
                  key={`${wordData.latin}-${index}`}
                  wordData={wordData}
                  userInput={index === currentIndex ? userInput : ''}
                  isActive={index === currentIndex}
                  isPast={index < currentIndex}
                  mode={mode}
                  typedHistory={history[index] || ''}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
             <button
              type="button"
              onClick={resetGame}
              className="flex items-center gap-2 text-sub-monkey hover:text-main-monkey transition-colors text-xs font-ui"
              title="Restart Test"
            >
              press <kbd className="bg-[#444] px-1.5 py-0.5 rounded text-gray-200">tab</kbd> to restart
            </button>
          </div>
        </div>
      ) : (
        <Results wpm={wpm} accuracy={accuracy} onRestart={resetGame} />
      )}
    </main>
  );
}
