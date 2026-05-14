import type { PuzzleLevel } from '@/types';

export const PUZZLE_LEVELS: PuzzleLevel[] = [
  {
    id: '1',
    targetLatin: 'ki',
    targetJavanese: 'ꦏꦶ',
    pieces: [
      { id: 'ka', char: 'ꦏ', type: 'base', name: 'Ka' },
      { id: 'wulu', char: 'ꦶ', type: 'top', name: 'Wulu (i)' },
      { id: 'suku', char: 'ꦸ', type: 'bottom', name: 'Suku (u)' }, // Distractor
    ]
  },
  {
    id: '2',
    targetLatin: 'mu',
    targetJavanese: 'ꦩꦸ',
    pieces: [
      { id: 'ma', char: 'ꦩ', type: 'base', name: 'Ma' },
      { id: 'suku', char: 'ꦸ', type: 'bottom', name: 'Suku (u)' },
      { id: 'pepet', char: 'ꦼ', type: 'top', name: 'Pepet (e)' }, // Distractor
    ]
  },
  {
    id: '3',
    targetLatin: 'ko',
    targetJavanese: 'ꦏꦺꦴ',
    pieces: [
      { id: 'ka', char: 'ꦏ', type: 'base', name: 'Ka' },
      { id: 'taling', char: 'ꦺ', type: 'front', name: 'Taling (e)' },
      { id: 'tarung', char: 'ꦴ', type: 'rear', name: 'Tarung (o)' },
    ]
  },
  {
    id: '4',
    targetLatin: 'kri',
    targetJavanese: 'ꦏꦿꦶ',
    pieces: [
      { id: 'ka', char: 'ꦏ', type: 'base', name: 'Ka' },
      { id: 'cakra', char: 'ꦿ', type: 'bottom', name: 'Cakra (ra)' },
      { id: 'wulu', char: 'ꦶ', type: 'top', name: 'Wulu (i)' },
      { id: 'pepet', char: 'ꦼ', type: 'top', name: 'Pepet (e)' }, // Distractor
    ]
  },
  {
    id: '5',
    targetLatin: 'kre',
    targetJavanese: 'ꦏꦿꦺ',
    pieces: [
      { id: 'ka', char: 'ꦏ', type: 'base', name: 'Ka' },
      { id: 'cakra', char: 'ꦿ', type: 'bottom', name: 'Cakra (ra)' },
      { id: 'taling', char: 'ꦺ', type: 'front', name: 'Taling (e)' },
      { id: 'layar', char: 'ꦂ', type: 'top', name: 'Layar (r)' }, // Distractor
    ]
  }
];
