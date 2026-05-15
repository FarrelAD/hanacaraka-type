import type { CSSProperties } from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { PuzzlePiece } from '@/types';
import DraggablePiece from './DraggablePiece';

export default function DroppableSlot({ 
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
