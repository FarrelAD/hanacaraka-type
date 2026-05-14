import type { WordData } from '@/types';

export const JAVANESE_WORDS_DATA: WordData[] = [
  { javanese: 'ꦲꦤꦕꦫꦏ', latin: 'hanacaraka' },
  { javanese: 'ꦢꦠꦱꦮꦭ', latin: 'datasawala' },
  { javanese: 'ꦥꦝꦗꦪꦚ', latin: 'padhajayanya' },
  { javanese: 'ꦩꦒꦧꦠꦔ', latin: 'magabathanga' },
  { javanese: 'ꦱꦼꦩꦔꦠ꧀', latin: 'semangat' },
  { javanese: 'ꦧꦼꦗ', latin: 'beja' },
  { javanese: 'ꦫꦲꦪꦸ', latin: 'rahayu' },
  { javanese: 'ꦱꦸꦒꦼꦁ', latin: 'sugeng' },
  { javanese: 'ꦠꦶꦤꦢꦶ', latin: 'tinadi' },
  { javanese: 'ꦩꦸꦭꦶꦃ', latin: 'mulih' },
  { javanese: 'ꦱꦭꦩ꧀', latin: 'salam' },
  { javanese: 'ꦩꦠꦸꦂꦤꦸꦮꦸꦤ꧀', latin: 'maturnuwun' },
  { javanese: 'ꦥꦿꦶꦪꦶ', latin: 'priyi' },
  { javanese: 'ꦏꦿꦠꦺꦴꦤ꧀', latin: 'kraton' },
  { javanese: 'ꦮꦪꦁ', latin: 'wayang' },
  { javanese: 'ꦒꦩꦼꦭꦤ꧀', latin: 'gamelan' },
  { javanese: 'ꦧꦠꦶꦏ꧀', latin: 'batik' },
  { javanese: 'ꦱꦼꦏꦠꦺꦤ꧀', latin: 'sekaten' },
  { javanese: 'ꦩꦭꦶꦪꦺꦴꦧꦺꦴꦫꦺꦴ', latin: 'maliyoboro' },
  { javanese: 'ꦧꦺꦴꦫꦺꦴꦧꦸꦢꦸꦂ', latin: 'borobudur' }
];

export const generateWords = (count = 50): WordData[] => {
  return Array.from({ length: count }, () => 
    JAVANESE_WORDS_DATA[Math.floor(Math.random() * JAVANESE_WORDS_DATA.length)]
  );
};
