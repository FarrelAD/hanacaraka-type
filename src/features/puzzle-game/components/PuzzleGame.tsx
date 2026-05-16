import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DndContext, 
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  type DragEndEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import type { PuzzlePiece } from '@/types';
import { PUZZLE_LEVELS } from '../data/puzzleData';
import DroppableSlot from './DroppableSlot';
import DraggablePiece from './DraggablePiece';
import JavanesePieceDisplay from './JavanesePieceDisplay';

export default function PuzzleGame() {
  const { t } = useTranslation();
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [placedPieces, setPlacedPieces] = useState<{ [key: string]: PuzzlePiece | null }>({
    base: null, front: null, top: null, bottom: null, rear: null,
  });
  const [activePiece, setActivePiece] = useState<PuzzlePiece | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const currentLevel = PUZZLE_LEVELS[currentLevelIdx];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

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
      alert(t('puzzle.finish_alert'));
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
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="w-full h-full flex flex-col justify-center items-center gap-6 md:gap-8 py-4 px-2">
        <div className="text-center">
          <h2 className="text-sub-theme text-xs uppercase tracking-[0.2em] mb-2 opacity-80">{t('puzzle.title')}</h2>
          <div className="text-3xl md:text-4xl font-bold text-main-theme font-ui italic">"{currentLevel.targetLatin}"</div>
        </div>

        {/* Structured Grid */}
        <div className={`
          relative w-64 h-64 md:w-80 md:h-80 grid grid-cols-3 grid-rows-3 gap-2 md:gap-3 p-3 md:p-4 bg-sub-theme/5 rounded-3xl border transition-all duration-500
          ${isSuccess ? 'border-main-theme/20 bg-main-theme/2' : isError ? 'border-error-theme/40 bg-error-theme/2' : 'border-sub-theme/20'}
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
              <span className="text-main-theme uppercase tracking-[0.4em] font-bold text-xs">{t('puzzle.correct')}</span>
            ) : hasAnyPiece ? (
              <button
                type="button" onClick={validateAnswer}
                className={`px-10 py-3 rounded-xl font-ui text-xs font-bold uppercase tracking-widest transition-all ${isError ? 'text-error-theme font-bold' : 'bg-main-theme/5 text-main-theme hover:bg-main-theme/10'}`}
              >
                {isError ? t('puzzle.retry') : t('puzzle.check')}
              </button>
            ) : null}
        </div>

        {/* Clean Tray */}
        <div className="w-full max-w-xl px-2">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {currentLevel.pieces.map((piece) => {
              const isUsed = Object.values(placedPieces).some(p => p?.id === piece.id);
              return (
                <div key={piece.id} className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-transparent border border-sub-theme/30">
                    <DraggablePiece piece={piece} isUsed={isUsed} isSuccess={isSuccess} className="w-full h-full flex items-center justify-center" />
                </div>
              );
            })}
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {activePiece ? (
            <div className="w-20 h-20 bg-bg-theme/95 border border-sub-theme/20 rounded-2xl flex items-center justify-center">
              <JavanesePieceDisplay char={activePiece.char} type={activePiece.type} className="text-4xl font-javanese" />
            </div>
          ) : null}
        </DragOverlay>

        <div className="text-sub-theme font-ui text-[10px] tracking-widest opacity-80 uppercase font-bold">{t('puzzle.level')} {currentLevelIdx + 1}</div>
      </div>
    </DndContext>
  );
}
