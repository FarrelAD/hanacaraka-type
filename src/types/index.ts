export interface WordData {
  javanese: string;
  latin: string;
}

export type Mode = 'hanacaraka' | 'latin';

export type WordLimit = 10 | 25 | 50 | 100 | 'infinite';
