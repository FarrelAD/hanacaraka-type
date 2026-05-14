import type { WordData, Mode } from '@/types';
import { splitIntoGraphemes } from '@/utils/javanese';

export default function Word({ 
  wordData, 
  isActive, 
  isPast, 
  mode, 
  userInput, 
  typedHistory,
  activeWordRef 
}: {
  wordData: WordData;
  isActive: boolean;
  isPast: boolean;
  mode: Mode;
  userInput: string;
  typedHistory: string;
  activeWordRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const javaneseSegments = splitIntoGraphemes(wordData.javanese);
  const latinSegments = wordData.latin.split('');
  
  const currentTyped = isPast ? typedHistory : (isActive ? userInput : '');
  const typedSegments = currentTyped.split('');

  return (
    <div 
      className={`word flex flex-col items-center gap-1 md:gap-2 ${isActive ? 'active' : ''} transition-opacity duration-300 ${!isActive && !isPast ? 'opacity-50' : 'opacity-100'}`}
      ref={isActive ? activeWordRef : null}
    >
      <div className="javanese-row font-javanese text-2xl md:text-[2.5rem] leading-none block whitespace-nowrap h-10 md:h-16 relative">
        {javaneseSegments.map((segment, sIdx) => {
          let status = '';
          const progress = currentTyped.length / wordData.latin.length;
          const threshold = (sIdx + 1) / javaneseSegments.length;
          const prevThreshold = sIdx / javaneseSegments.length;

          if (currentTyped.length > 0 && progress >= prevThreshold) {
            const startIdx = Math.floor(prevThreshold * wordData.latin.length);
            const endIdx = Math.ceil(threshold * wordData.latin.length);
            const targetPart = wordData.latin.slice(startIdx, endIdx);
            const typedPart = currentTyped.slice(startIdx, endIdx);

            if (typedPart.length > 0) {
              if (targetPart.startsWith(typedPart)) {
                status = progress >= threshold ? 'correct' : '';
              } else {
                status = 'incorrect';
              }
            }
          }
          
          return (
            <span key={sIdx} className={`char inline ${status}`}>
              {segment}
            </span>
          );
        })}
      </div>

      <div className={`latin-row font-ui text-sm md:text-lg leading-none h-4 md:h-6 flex items-center ${mode === 'hanacaraka' ? 'opacity-30' : ''}`}>
        {latinSegments.map((char, cIdx) => {
          let status = '';
          if (cIdx < typedSegments.length) {
            status = typedSegments[cIdx] === char ? 'correct' : 'incorrect';
          }
          
          return (
            <span key={cIdx} className={`char ${status}`}>
              {char}
            </span>
          );
        })}
        {(isActive || isPast) && typedSegments.length > latinSegments.length && 
          typedSegments.slice(latinSegments.length).map((char, i) => (
            <span key={latinSegments.length + i} className="char extra">
              {char}
            </span>
          ))
        }
      </div>
    </div>
  );
}
