export interface ReferenceChar {
  script: string;
  latin: string;
  description?: string;
}

export const NGLEGENA: ReferenceChar[] = [
  { script: 'ꦲ', latin: 'ha' }, { script: 'ꦤ', latin: 'na' }, { script: 'ꦕ', latin: 'ca' }, { script: 'ꦫ', latin: 'ra' }, { script: 'ꦏ', latin: 'ka' },
  { script: 'ꦢ', latin: 'da' }, { script: 'ꦠ', latin: 'ta' }, { script: 'ꦱ', latin: 'sa' }, { script: 'ꦮ', latin: 'wa' }, { script: 'ꦭ', latin: 'la' },
  { script: 'ꦥ', latin: 'pa' }, { script: 'ꦝ', latin: 'dha' }, { script: 'ꦗ', latin: 'ja' }, { script: 'ꦶ', latin: 'ya' }, { script: 'ꦚ', latin: 'nya' },
  { script: 'ꦩ', latin: 'ma' }, { script: 'ꦒ', latin: 'ga' }, { script: 'ꦧ', latin: 'ba' }, { script: 'ꦛ', latin: 'tha' }, { script: 'ꦔ', latin: 'nga' }
];

export const SANDHANGAN_SWARA: ReferenceChar[] = [
  { script: 'ꦶ', latin: 'i', description: 'wulu' },
  { script: 'ꦸ', latin: 'u', description: 'suku' },
  { script: 'ꦼ', latin: 'e', description: 'pepet' },
  { script: 'ꦺ', latin: 'é', description: 'taling' },
  { script: 'ꦺꦴ', latin: 'o', description: 'taling tarung' }
];

export const SANDHANGAN_PANYIGEG: ReferenceChar[] = [
  { script: 'ꦁ', latin: 'ng', description: 'cecak' },
  { script: 'ꦂ', latin: 'r', description: 'layar' },
  { script: 'ꦃ', latin: 'h', description: 'wignyan' },
  { script: '꧀', latin: '—', description: 'pangkon (mute)' }
];
