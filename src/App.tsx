import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { WordData, Mode, WordLimit } from '@/types';
import { splitIntoGraphemes } from '@/utils/javanese';
import { generateWords, getRandomWord } from '@/data/words';
import Header from '@/components/Header';
import Word from '@/components/Word';
import Results from '@/components/Results';
import Footer from '@/components/Footer';
import ScriptReference from '@/components/ScriptReference';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const [words, setWords] = useState<WordData[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [history, setHistory] = useState<string[]>([]); // To store what the user typed for each word
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [mode, setMode] = useState<Mode>('latin');
  const [wordLimit, setWordLimit] = useState<WordLimit>(25);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const wordsWrapperRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLDivElement>(null);
  const typingAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    restart();
  }, [mode, wordLimit]);

  const restart = () => {
    const initialCount = wordLimit === 'infinite' ? 50 : wordLimit;
    setWords(generateWords(initialCount));
    setCurrentWordIndex(0);
    setUserInput('');
    setHistory([]);
    setStartTime(null);
    setEndTime(null);
    setCorrectChars(0);
    setTotalCharsTyped(0);
    setIsFinished(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;

    const value = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.endsWith(' ')) {
      const typedWord = value.trim();
      const currentWord = words[currentWordIndex];
      
      const targetSegments = currentWord.latin.split('');
      const typedSegments = typedWord.split('');
      
      let wordCorrect = 0;
      for (let i = 0; i < Math.min(typedSegments.length, targetSegments.length); i++) {
        if (typedSegments[i] === targetSegments[i]) wordCorrect++;
      }
      setCorrectChars(prev => prev + wordCorrect);
      setTotalCharsTyped(prev => prev + typedSegments.length + 1);

      // Store the typed word in history before moving on
      setHistory(prev => [...prev, typedWord]);

      if (wordLimit === 'infinite') {
        // Append a new word if we're in infinite mode
        setWords(prev => [...prev, getRandomWord()]);
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
      } else if (currentWordIndex === words.length - 1) {
        setEndTime(Date.now());
        setIsFinished(true);
      } else {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
      }
      return;
    }

    setUserInput(value);
  };

  const wpm = useMemo(() => {
    if (!startTime) return 0;
    const end = endTime || Date.now();
    const minutes = (end - startTime) / 1000 / 60;
    if (minutes === 0) return 0;
    return Math.round((correctChars / 5) / minutes);
  }, [correctChars, startTime, endTime]);

  const accuracy = useMemo(() => {
    if (totalCharsTyped === 0) return 100;
    return Math.round((correctChars / totalCharsTyped) * 100);
  }, [correctChars, totalCharsTyped]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' || (e.key === 'Enter' && isFinished)) {
      e.preventDefault();
      restart();
    }
  };

  const [caretPos, setCaretPos] = useState({ left: 0, top: 0 });

  // Update caret position and handle scrolling
  useEffect(() => {
    if (activeWordRef.current && wordsWrapperRef.current) {
      const targetContainer = activeWordRef.current.querySelector('.javanese-row');
      if (!targetContainer) return;

      const charElements = targetContainer.querySelectorAll('.char');
      
      const currentWord = words[currentWordIndex];
      if (!currentWord) return;

      const javaneseGraphemes = splitIntoGraphemes(currentWord.javanese);
      const progress = userInput.length / currentWord.latin.length;
      const charIndex = Math.min(Math.floor(progress * javaneseGraphemes.length), javaneseGraphemes.length);

      // We explicitly calculate offsets relative to words-wrapper
      // OffsetParent check to ensure we are relative to what we think we are
      const activeWordOffsetLeft = activeWordRef.current.offsetLeft;
      const activeWordOffsetTop = activeWordRef.current.offsetTop;

      if (charIndex === 0) {
        const firstChar = charElements[0] as HTMLElement;
        if (firstChar) {
          setCaretPos({
            left: activeWordOffsetLeft + firstChar.offsetLeft,
            top: activeWordOffsetTop + firstChar.offsetTop
          });
        } else {
          setCaretPos({
            left: activeWordOffsetLeft,
            top: activeWordOffsetTop
          });
        }
      } else {
        const prevChar = charElements[Math.min(charIndex - 1, charElements.length - 1)] as HTMLElement;
        if (prevChar) {
          setCaretPos({
            left: activeWordOffsetLeft + prevChar.offsetLeft + prevChar.offsetWidth,
            top: activeWordOffsetTop + prevChar.offsetTop
          });
        }
      }

      // --- Scrolling Logic ---
      const rowHeight = 120;
      if (activeWordOffsetTop > rowHeight) {
        wordsWrapperRef.current.style.transform = `translateY(-${activeWordOffsetTop - rowHeight}px)`;
      } else {
        wordsWrapperRef.current.style.transform = 'translateY(0)';
      }
    }
  }, [userInput, currentWordIndex, words, mode]);

  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden p-4 md:p-8 pt-4 md:pt-12" onClick={() => inputRef.current?.focus()}>
      <div className="w-full max-w-5xl flex-1 flex flex-col gap-4 md:gap-8">
        <Header 
          mode={mode} 
          setMode={setMode} 
          wordLimit={wordLimit}
          setWordLimit={setWordLimit}
          wpm={wpm} 
          accuracy={accuracy} 
          onOpenReference={() => setIsReferenceOpen(true)}
        />

        <div className="relative h-[400px] md:h-[500px] overflow-hidden select-none pt-4 md:pt-24" ref={typingAreaRef}>
          {isFinished ? (
            <div className="h-full" onClick={restart}>
              <Results wpm={wpm} accuracy={accuracy} />
            </div>
          ) : (
            <>
              <input
                ref={inputRef}
                type="text"
                className="hidden-input"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
                inputMode="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="off"
              />
              
              {/* Ensure words-wrapper is the relative anchor for the caret */}
              <div className="words-wrapper relative flex flex-wrap gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16 transition-transform duration-300 ease-in-out" ref={wordsWrapperRef}>
                <div className="caret" style={{ left: caretPos.left, top: caretPos.top }}></div>

                {words.map((wordData, wIdx) => (
                  <Word 
                    key={wIdx}
                    wordData={wordData}
                    isActive={wIdx === currentWordIndex}
                    isPast={wIdx < currentWordIndex}
                    mode={mode}
                    userInput={userInput}
                    typedHistory={history[wIdx] || ''}
                    activeWordRef={activeWordRef}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {!isFinished && (
          <div className="mt-4 md:mt-8 text-center text-sub-monkey text-xs md:text-sm font-ui opacity-50">
            <span className="hidden md:inline">press <kbd className="bg-[#444] px-1 rounded text-gray-200">tab</kbd> to restart</span>
            <span className="md:hidden">tap words to focus keyboard</span>
          </div>
        )}

        <Footer />
      </div>

      <ScriptReference 
        isOpen={isReferenceOpen} 
        onClose={() => setIsReferenceOpen(false)} 
      />

      {/* Mobile Floating Guide Button */}
      <button 
        onClick={() => setIsReferenceOpen(true)}
        className="sm:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-main-monkey text-bg-monkey rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-center animate-pulse-subtle active:scale-90 transition-transform"
        aria-label="Open Character Guide"
      >
        <FontAwesomeIcon icon={faBook} className="w-6 h-6" />
      </button>
    </div>
  );
}

