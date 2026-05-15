import { useState, useEffect } from 'react';

const extractionCache = new Map<string, string>();

export function extractDiacritic(char: string): string {
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

export default function JavanesePieceDisplay({ char, type, className = "" }: { char: string; type: string; className?: string }) {
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
