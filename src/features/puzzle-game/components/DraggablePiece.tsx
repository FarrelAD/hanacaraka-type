import type { CSSProperties } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { PuzzlePiece } from '@/types';
import JavanesePieceDisplay from './JavanesePieceDisplay';

export default function DraggablePiece({ 
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
      className={`${className} transition-opacity duration-200 cursor-grab active:cursor-grabbing touch-none`}
    >
      <JavanesePieceDisplay char={piece.char} type={piece.type} className="text-4xl md:text-5xl font-javanese" />
    </div>
  );
}
