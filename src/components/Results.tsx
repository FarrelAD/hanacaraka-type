export default function Results({ 
  wpm, 
  accuracy,
  onRestart
}: { 
  wpm: number; 
  accuracy: number; 
  onRestart: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full font-ui p-4">
      <div className="text-lg md:text-xl text-sub-monkey uppercase tracking-widest opacity-50">test finished</div>
      <div className="flex flex-col sm:flex-row gap-8 md:gap-16 my-8">
        <div className="flex flex-col items-center">
          <div className="text-sm md:text-base text-sub-monkey uppercase">wpm</div>
          <div className="text-5xl md:text-[5rem] text-main-monkey font-bold italic">{wpm}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm md:text-base text-sub-monkey uppercase">acc</div>
          <div className="text-5xl md:text-[5rem] text-main-monkey font-bold italic">{accuracy}%</div>
        </div>
      </div>
      <button 
        type="button"
        onClick={onRestart}
        className="mt-4 md:mt-8 text-sub-monkey hover:text-main-monkey transition-colors text-xs md:text-sm uppercase tracking-widest font-bold"
      >
        press <kbd className="bg-[#444] px-1.5 py-0.5 rounded text-gray-200">tab</kbd> or <span className="text-main-monkey">click here</span> to restart
      </button>
    </div>
  );
}
