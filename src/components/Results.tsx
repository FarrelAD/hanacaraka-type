export default function Results({ 
  wpm, 
  accuracy 
}: { 
  wpm: number; 
  accuracy: number; 
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full font-ui p-4">
      <div className="text-lg md:text-xl text-sub-monkey">test finished</div>
      <div className="flex flex-col sm:flex-row gap-8 md:gap-16">
        <div className="flex flex-col items-center">
          <div className="text-sm md:text-base text-sub-monkey">wpm</div>
          <div className="text-5xl md:text-[4rem] text-main-monkey font-bold">{wpm}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm md:text-base text-sub-monkey">acc</div>
          <div className="text-5xl md:text-[4rem] text-main-monkey font-bold">{accuracy}%</div>
        </div>
      </div>
      <div className="mt-4 md:mt-8 text-sub-monkey text-xs md:text-sm text-center">
        press <kbd className="bg-[#444] px-1 rounded text-gray-200">tab</kbd> or <span className="sm:hidden text-main-monkey">tap here</span> to restart
      </div>
    </div>
  );
}
