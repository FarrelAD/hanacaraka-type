import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import Word from './Word';
import Results from './Results';
import { JAVANESE_WORDS_DATA } from '../data/words';
import type { Mode, WordData } from '@/types';

export default function TypingGame() {
  const { t } = useTranslation();
  const [words, setWords] = useState<WordData[]>([]);
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [mode, setMode] = useState<Mode>('latin');
  const [wordLimit, setWordLimit] = useState<number | 'infinite'>(25);
  const [history, setHistory] = useState<string[]>([]);
  const [caretPos, setCaretPos] = useState({ left: 0, top: 0 });
  const [translateY, setTranslateY] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const activeWordRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsWrapperRef = useRef<HTMLDivElement>(null);

  const currentTotalChars = typedChars + userInput.length;
  const currentAcc = currentTotalChars > 0 
    ? Math.round(((currentTotalChars - mistakes) / currentTotalChars) * 100) 
    : 100;

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
    setIsFinished(false);
    setMistakes(0);
    setTypedChars(0);
    setHistory([]);
    setTranslateY(0);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [wordLimit, generateWordList]);

  useEffect(() => {
    const timer = setTimeout(() => {
      resetGame();
    }, 0);
    return () => clearTimeout(timer);
  }, [resetGame, mode]);

  const totalCharsRef = useRef(0);
  useEffect(() => {
    totalCharsRef.current = currentTotalChars;
  }, [currentTotalChars]);

  // Real-time WPM calculation
  useEffect(() => {
    if (!startTime || isFinished) return;

    const interval = setInterval(() => {
      const durationInMinutes = (Date.now() - startTime) / 60000;
      const currentWpm = Math.round((totalCharsRef.current / 5) / durationInMinutes) || 0;
      setWpm(currentWpm);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isFinished]);

  useEffect(() => {
    if (activeWordRef.current && wordsWrapperRef.current) {
      const activeWord = activeWordRef.current;
      const wrapper = wordsWrapperRef.current;
      const firstWord = wrapper.querySelector('.word') as HTMLElement;

      if (firstWord) {
        const firstTop = firstWord.offsetTop;
        const currentTop = activeWord.offsetTop;
        
        const secondLineWord = Array.from(wrapper.querySelectorAll('.word')).find(
          (child) => (child as HTMLElement).offsetTop > firstTop
        ) as HTMLElement;

        if (secondLineWord) {
          const lineOffset = secondLineWord.offsetTop - firstTop;
          if (currentTop > firstTop + lineOffset * 0.5) {
            setTranslateY(-(currentTop - firstTop - lineOffset));
          } else {
            setTranslateY(0);
          }
        }
      }
    }
  }, [currentIndex, words]);

  useEffect(() => {
    if (activeWordRef.current && wordsWrapperRef.current) {
      const activeWord = activeWordRef.current;
      const wrapperRect = wordsWrapperRef.current.getBoundingClientRect();
      const currentWordData = words[currentIndex];
      
      if (!currentWordData) return;

      const javaneseElements = activeWord.querySelectorAll('.javanese-row .char');
      if (javaneseElements.length === 0) return;

      const progress = userInput.length / currentWordData.latin.length;
      const targetIndex = Math.floor(progress * javaneseElements.length);

      if (targetIndex < javaneseElements.length && userInput.length < currentWordData.latin.length) {
        const charElement = javaneseElements[targetIndex] as HTMLElement;
        if (charElement) {
          const charRect = charElement.getBoundingClientRect();
          setCaretPos({
            left: charRect.left - wrapperRect.left,
            top: charRect.top - wrapperRect.top
          });
        }
      } else {
        const lastChar = javaneseElements[javaneseElements.length - 1] as HTMLElement;
        if (lastChar) {
          const charRect = lastChar.getBoundingClientRect();
          setCaretPos({
            left: charRect.right - wrapperRect.left,
            top: charRect.top - wrapperRect.top
          });
        }
      }
    }
  }, [userInput, currentIndex, words, mode, translateY]);

  const finishGame = useCallback(() => {
    setIsFinished(true);
    const endTime = Date.now();
    const durationInMinutes = (endTime - (startTime || endTime)) / 60000;
    const finalWpm = Math.round((typedChars / 5) / durationInMinutes) || 0;
    setWpm(finalWpm);
  }, [startTime, typedChars]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [isFinished, startTime, words, currentIndex, wordLimit, generateWordList, finishGame]);

  return (
    <main className="w-full max-w-4xl mx-auto px-4 py-4 md:py-8 h-full flex flex-col justify-center animate-in fade-in duration-500">
      {!isFinished ? (
        <div className="space-y-8 md:space-y-12">
          {/* Top Controls & Stats Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-bg-theme py-2">
            <div className="flex items-center gap-6">
              {/* Mode Toggle */}
              <div className="flex bg-bg-theme/40 rounded-lg overflow-hidden">
                {(['latin', 'hanacaraka'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`px-4 py-1.5 text-xs font-ui transition-colors ${
                      mode === m ? 'bg-main-theme text-bg-theme' : 'text-sub-theme hover:text-text-theme bg-bg-theme/20'
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
                      wordLimit === limit ? 'text-main-theme font-bold' : 'text-sub-theme hover:text-text-theme'
                    }`}
                  >
                    {limit}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 font-ui text-lg">
              <div className="text-sub-theme">
                {t('game.stats.wpm')}: <span className="text-main-theme font-bold ml-1">{wpm}</span>
              </div>
              <div className="text-sub-theme">
                {t('game.stats.acc')}: <span className="text-main-theme font-bold ml-1">{currentAcc}%</span>
              </div>
            </div>
          </div>

          <div 
            className="relative p-6 md:p-8 rounded-2xl bg-bg-theme/20 border border-sub-theme/5 cursor-text h-[260px] md:h-[380px] overflow-hidden"
            onClick={() => inputRef.current?.focus()}
            ref={containerRef}
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

            <div 
              className="relative flex flex-wrap gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-4 text-2xl md:text-3xl leading-relaxed transition-transform duration-300 ease-in-out"
              ref={wordsWrapperRef}
              style={{ transform: `translateY(${translateY}px)` }}
            >
              <div className="caret" style={{ left: caretPos.left, top: caretPos.top }}></div>
              
              {words.map((wordData, index) => (
                <Word
                  key={`${wordData.latin}-${index}`}
                  wordData={wordData}
                  userInput={index === currentIndex ? userInput : ''}
                  isActive={index === currentIndex}
                  isPast={index < currentIndex}
                  mode={mode}
                  typedHistory={history[index] || ''}
                  activeWordRef={index === currentIndex ? activeWordRef : undefined}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center pt-4">
             <button
              type="button"
              onClick={resetGame}
              className="flex items-center gap-2 text-sub-theme hover:text-main-theme transition-colors text-xs font-ui"
              title={t('common.restart_hint').replace(/<\/?[^>]+(>|$)/g, "")}
            >
              <Trans i18nKey="common.restart_hint">
                press <kbd className="bg-[#444] px-1.5 py-0.5 rounded text-gray-200">tab</kbd> to restart
              </Trans>
            </button>
          </div>
        </div>
      ) : (
        <Results wpm={wpm} accuracy={currentAcc} onRestart={resetGame} />
      )}
    </main>
  );
}
