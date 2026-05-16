import { NGLEGENA, SANDHANGAN_SWARA, SANDHANGAN_PANYIGEG } from '@/data/reference';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function ScriptReference({ 
  isOpen, onClose 
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  return (
    <>
      {/* Backdrop - lighter to keep context visible */}
      <div 
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Side Drawer */}
      <div className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-bg-theme border-l border-sub-theme/20 shadow-2xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto p-6 md:p-8`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-main-theme">{t('guide.title')}</h2>
          <button 
            onClick={onClose}
            className="text-sub-theme hover:text-text-theme transition-colors p-1"
            aria-label="Close guide"
          >
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-10">
          {/* Aksara Nglegena */}
          <section>
            <h3 className="text-xs font-ui text-main-theme mb-4 uppercase tracking-[0.2em] font-bold">{t('guide.nglegena')}</h3>
            <div className="grid grid-cols-5 gap-2">
              {NGLEGENA.map((char) => (
                <div key={char.latin} className="flex flex-col items-center bg-sub-theme/10 py-3 rounded-lg border border-transparent hover:border-main-theme/30 transition-all">
                  <span className="text-2xl text-text-theme mb-1 font-javanese">{char.script}</span>
                  <span className="text-[10px] text-sub-theme font-ui uppercase">{char.latin}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sandhangan Swara */}
          <section>
            <h3 className="text-xs font-ui text-main-theme mb-4 uppercase tracking-[0.2em] font-bold">{t('guide.vowels')}</h3>
            <div className="space-y-2">
              {SANDHANGAN_SWARA.map((char) => (
                <div key={char.latin} className="flex items-center justify-between bg-sub-theme/10 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-text-theme font-javanese">{char.script}</span>
                    <span className="text-xs text-sub-theme uppercase font-bold tracking-tighter">{char.description}</span>
                  </div>
                  <span className="text-sm text-main-theme font-ui font-bold">{char.latin}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sandhangan Panyigeg */}
          <section>
            <h3 className="text-xs font-ui text-main-theme mb-4 uppercase tracking-[0.2em] font-bold">{t('guide.consonants')}</h3>
            <div className="space-y-2">
              {SANDHANGAN_PANYIGEG.map((char) => (
                <div key={char.description} className="flex items-center justify-between bg-sub-theme/10 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-text-theme font-javanese">{char.script}</span>
                    <span className="text-xs text-sub-theme uppercase font-bold tracking-tighter">{char.description}</span>
                  </div>
                  <span className="text-sm text-main-theme font-ui font-bold">{char.latin}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-sub-theme/20 text-[11px] text-sub-theme leading-relaxed font-ui">
          <p className="mb-2"><strong className="text-text-theme">{t('guide.hint_label')}:</strong> {t('guide.hint_1')}</p>
          <p>{t('guide.hint_2')}</p>
        </div>
      </div>
    </>
  );
}

