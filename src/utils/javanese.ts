export const splitIntoGraphemes = (text: string) => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter('jv', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), s => s.segment);
    } catch {
      // Fallback
    }
  }
  // Better fallback regex for Javanese clusters: base followed by any number of marks
  // Javanese range: A980-A9DF. Marks are roughly A9B3-A9CD and A9E5
  // eslint-disable-next-line no-misleading-character-class
  return text.match(/[\uA980-\uA9DF][\uA9B3-\uA9CD\uA9E5]*|./gu) || text.split('');
};
