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

  return (
    <div 
      ref={setNodeRef}
      className={`
        w-full h-full border rounded-2xl flex items-center justify-center relative transition-all duration-300
        ${isOver ? 'scale-[1.02] bg-main-theme/10 border-main-theme/50' : 'bg-transparent border-sub-theme/30'}
      `}
    >
      {piece ? (
        <div className="w-16 h-16 md:w-20 md:h-20 relative group flex items-center justify-center">
          <DraggablePiece piece={piece} isSuccess={isSuccess} sourceSlot={id} className="w-full h-full flex items-center justify-center" />
          {!isSuccess && (
            <button 
              type="button" onClick={onClear}
              className="absolute -top-1 -right-1 text-sub-theme hover:text-error-theme opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          )}
        </div>
      ) : (
        <span className="text-[10px] uppercase font-ui text-sub-theme opacity-70 tracking-widest">{id}</span>
      )}
    </div>
  );
}
