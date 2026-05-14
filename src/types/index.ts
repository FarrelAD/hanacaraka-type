export interface WordData {
  javanese: string;
  latin: string;
}

export type Mode = 'hanacaraka' | 'latin';
export type GameMode = 'typing' | 'puzzle';

export interface PuzzlePiece {
  id: string;
  char: string;
  type: 'base' | 'front' | 'top' | 'bottom' | 'rear';
  name: string;
}

export interface PuzzleLevel {
  id: string;
  targetLatin: string;
  targetJavanese: string;
  pieces: PuzzlePiece[];
}
