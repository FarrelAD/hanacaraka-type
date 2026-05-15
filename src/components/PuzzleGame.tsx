import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { 
  DndContext, 
  useDraggable, 
  useDroppable, 
  closestCenter,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { PuzzlePiece } from '@/types';
import { PUZZLE_LEVELS } from '@/data/puzzleData';

// --- Optical Extraction Logic ---

const extractionCache = new Map<string, string>();

/**
 * Extracts diacritics with a unified theme color.
 */
function extractDiacritic(char: string): string {
  if (extractionCache.has(char)) return extractionCache.get(char)!;

  const isDiacritic = /[\uA9B3-\uA9CD\uA9E5]/.test(char);
  if (!isDiacritic) return '';

  const canvas = document.createElement('canvas');
  const size = 128;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return '';

  const font = '64px "Noto Sans Javanese", "Javanese Text", serif';
  const baseChar = 'ꦏ';

  ctx.clearRect(0, 0, size, size);
  ctx.font = font;
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(baseChar, size / 2, size / 2);
  const baseData = ctx.getImageData(0, 0, size, size).data;

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = '#d1d0c5'; // Unified Off-White
  ctx.fillText(baseChar + char, size / 2, size / 2);
  const clusterImgData = ctx.getImageData(0, 0, size, size);
  const clusterData = clusterImgData.data;

  for (let i = 0; i < clusterData.length; i += 4) {
    if (baseData[i + 3] > 10) clusterData[i + 3] = 0;
  }

  ctx.putImageData(clusterImgData, 0, 0);
  const dataUrl = canvas.toDataURL();
  extractionCache.set(char, dataUrl);
  return dataUrl;
}

// --- Sub-Components ---

function JavanesePieceDisplay({ char, type, className = "" }: { char: string; type: string; className?: string }) {
  const isDiacritic = type !== 'base';
  const [imgUrl, setImgUrl] = useState<string>('');

  useEffect(() => {
    if (isDiacritic) {
      const timer = setTimeout(() => {
        setImgUrl(extractDiacritic(char));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [char, isDiacritic]);

  if (!isDiacritic) {
    return <span className={`text-text-monkey ${className}`}>{char}</span>;
  }

  return imgUrl ? (
    <img src={imgUrl} alt={char} className={`w-full h-full object-contain select-none pointer-events-none opacity-90 ${className}`} />
  ) : (
    <span className="opacity-0">{char}</span>
  );
}

function DraggablePiece({ 
  piece, 
  isUsed, 
  isSuccess,
  sourceSlot,
  className = ""
}: { 
  piece: PuzzlePiece; 
  isUsed?: boolean; 
  isSuccess: boolean;
  sourceSlot?: string;
  className?: string;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: sourceSlot ? `slot-piece-${sourceSlot}-${piece.id}` : piece.id,
    disabled: isSuccess || (isUsed && !sourceSlot),
    data: { piece, sourceSlot }
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : (isUsed && !sourceSlot ? 0.15 : 1),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${className} transition-opacity duration-200 cursor-grab active:cursor-grabbing`}
    >
      <JavanesePieceDisplay char={piece.char} type={piece.type} className="text-4xl md:text-5xl font-javanese" />
    </div>
  );
}

function DroppableSlot({ 
  id, 
  piece, 
  onClear,
  isSuccess
}: { 
  id: string; 
  piece: PuzzlePiece | null; 
  onClear: () => void;
  isSuccess: boolean;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style: CSSProperties = {
    backgroundColor: isOver ? 'rgba(226, 183, 20, 0.05)' : 'rgba(255, 255, 255, 0.02)',
    borderColor: isOver ? 'rgba(226, 183, 20, 0.4)' : 'rgba(255, 255, 255, 0.15)',
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`
        w-full h-full border rounded-2xl flex items-center justify-center relative transition-all duration-300
        ${isOver ? 'scale-[1.02]' : ''}
      `}
    >
      {piece ? (
        <div className="w-16 h-16 md:w-20 md:h-20 relative group flex items-center justify-center">
          <DraggablePiece piece={piece} isSuccess={isSuccess} sourceSlot={id} className="w-full h-full flex items-center justify-center" />
          {!isSuccess && (
            <button 
              type="button" onClick={onClear}
              className="absolute -top-1 -right-1 text-sub-monkey hover:text-error-monkey opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          )}
        </div>
      ) : (
        <span className="text-[10px] uppercase font-ui text-sub-monkey opacity-20 tracking-widest">{id}</span>
      )}
    </div>
  );
}

// --- Main Component ---

export default function PuzzleGame() {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [placedPieces, setPlacedPieces] = useState<{ [key: string]: PuzzlePiece | null }>({
    base: null, front: null, top: null, bottom: null, rear: null,
  });
  const [activePiece, setActivePiece] = useState<PuzzlePiece | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const currentLevel = PUZZLE_LEVELS[currentLevelIdx];

  const handleDragStart = (event: DragStartEvent) => {
    setActivePiece(event.active.data.current?.piece as PuzzlePiece);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActivePiece(null);

    if (over && over.id) {
      const piece = active.data.current?.piece as PuzzlePiece;
      const sourceSlot = active.data.current?.sourceSlot as string | undefined;
      const targetSlot = over.id as string;

      setPlacedPieces(prev => {
        const next = { ...prev };
        if (sourceSlot) next[sourceSlot] = null;
        next[targetSlot] = piece;
        return next;
      });
    } else {
      const sourceSlot = active.data.current?.sourceSlot as string | undefined;
      if (sourceSlot) setPlacedPieces(prev => ({ ...prev, [sourceSlot]: null }));
    }
  };

  const validateAnswer = () => {
    if (buildJavaneseString(placedPieces) === currentLevel.targetJavanese) {
      setIsSuccess(true);
      setIsError(false);
      setTimeout(() => nextLevel(), 2000);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
    }
  };

  const nextLevel = () => {
    if (currentLevelIdx < PUZZLE_LEVELS.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      setPlacedPieces({ base: null, front: null, top: null, bottom: null, rear: null });
      setIsSuccess(false);
    } else {
      alert("Selesai! You've mastered the basic Hanacaraka clusters!");
      setCurrentLevelIdx(0);
      setPlacedPieces({ base: null, front: null, top: null, bottom: null, rear: null });
      setIsSuccess(false);
    }
  };

  const buildJavaneseString = (slots: { [key: string]: PuzzlePiece | null }) => {
    let str = '';
    if (slots.front) str += slots.front.char;
    if (slots.base) str += slots.base.char;
    if (slots.top) str += slots.top.char;
    if (slots.bottom) str += slots.bottom.char;
    if (slots.rear) str += slots.rear.char;
    return str;
  };

  const hasAnyPiece = Object.values(placedPieces).some(p => p !== null);

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="w-full h-full flex flex-col justify-center items-center gap-6 md:gap-8 py-4 px-2">
        <div className="text-center">
          <h2 className="text-sub-monkey text-xs uppercase tracking-[0.2em] mb-2 opacity-40">Puzzle Mode</h2>
          <div className="text-3xl md:text-4xl font-bold text-main-monkey font-ui italic">"{currentLevel.targetLatin}"</div>
        </div>

        {/* Structured Grid */}
        <div className={`
          relative w-64 h-64 md:w-80 md:h-80 grid grid-cols-3 grid-rows-3 gap-2 md:gap-3 p-3 md:p-4 bg-bg-monkey/10 rounded-3xl border transition-all duration-500
          ${isSuccess ? 'border-main-monkey/20 bg-main-monkey/2' : isError ? 'border-error-monkey/40 bg-error-monkey/2' : 'border-sub-monkey/5'}
        `}>
          <div />
          <DroppableSlot id="top" piece={placedPieces.top} onClear={() => setPlacedPieces(p => ({...p, top: null}))} isSuccess={isSuccess} />
          <div />
          <DroppableSlot id="front" piece={placedPieces.front} onClear={() => setPlacedPieces(p => ({...p, front: null}))} isSuccess={isSuccess} />
          <DroppableSlot id="base" piece={placedPieces.base} onClear={() => setPlacedPieces(p => ({...p, base: null}))} isSuccess={isSuccess} />
          <DroppableSlot id="rear" piece={placedPieces.rear} onClear={() => setPlacedPieces(p => ({...p, rear: null}))} isSuccess={isSuccess} />
          <div />
          <DroppableSlot id="bottom" piece={placedPieces.bottom} onClear={() => setPlacedPieces(p => ({...p, bottom: null}))} isSuccess={isSuccess} />
          <div />
        </div>

        {/* Minimal Feedback */}
        <div className="h-10 flex items-center justify-center">
            {isSuccess ? (
              <span className="text-main-monkey uppercase tracking-[0.4em] font-bold text-xs">Correct</span>
            ) : hasAnyPiece ? (
              <button
                type="button" onClick={validateAnswer}
                className={`px-10 py-3 rounded-xl font-ui text-xs font-bold uppercase tracking-widest transition-all ${isError ? 'text-error-monkey' : 'bg-main-monkey/5 text-main-monkey hover:bg-main-monkey/10'}`}
              >
                {isError ? 'Try again' : 'Check answer'}
              </button>
            ) : null}
        </div>

        {/* Clean Tray */}
        <div className="w-full max-w-xl px-2">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {currentLevel.pieces.map((piece) => {
              const isUsed = Object.values(placedPieces).some(p => p?.id === piece.id);
              return (
                <div key={piece.id} className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-bg-monkey/30 border border-sub-monkey/5">
                    <DraggablePiece piece={piece} isUsed={isUsed} isSuccess={isSuccess} className="w-full h-full flex items-center justify-center" />
                </div>
              );
            })}
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {activePiece ? (
            <div className="w-20 h-20 bg-bg-monkey/95 border border-sub-monkey/20 rounded-2xl flex items-center justify-center">
              <JavanesePieceDisplay char={activePiece.char} type={activePiece.type} className="text-4xl font-javanese" />
            </div>
          ) : null}
        </DragOverlay>

        <div className="text-sub-monkey font-ui text-[10px] tracking-widest opacity-20 uppercase font-bold">Level {currentLevelIdx + 1}</div>
      </div>
    </DndContext>
  );
}
