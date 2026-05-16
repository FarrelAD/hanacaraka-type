import { useTranslation, Trans } from 'react-i18next';

export default function Results({ 
  wpm, 
  accuracy,
  onRestart
}: { 
  wpm: number; 
  accuracy: number; 
  onRestart: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full font-ui p-4">
      <div className="text-lg md:text-xl text-sub-theme uppercase tracking-widest opacity-50">
        {t('game.test_finished')}
      </div>
      <div className="flex flex-col sm:flex-row gap-8 md:gap-16 my-8">
        <div className="flex flex-col items-center">
          <div className="text-sm md:text-base text-sub-theme uppercase">{t('game.stats.wpm')}</div>
          <div className="text-5xl md:text-[5rem] text-main-theme font-bold italic">{wpm}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm md:text-base text-sub-theme uppercase">{t('game.stats.acc')}</div>
          <div className="text-5xl md:text-[5rem] text-main-theme font-bold italic">{accuracy}%</div>
        </div>
      </div>
      <button 
        type="button"
        onClick={onRestart}
        className="mt-4 md:mt-8 text-sub-theme hover:text-main-theme transition-colors text-xs md:text-sm uppercase tracking-widest font-bold"
      >
        <Trans i18nKey="common.restart_hint_results">
          press <kbd className="bg-[#444] px-1.5 py-0.5 rounded text-gray-200">tab</kbd> or <span className="text-main-theme">click here</span> to restart
        </Trans>
      </button>
    </div>
  );
}
