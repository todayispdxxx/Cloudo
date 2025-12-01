import React, { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';

interface DailyRitualProps {
  onComplete: () => void;
}

export const DailyRitual: React.FC<DailyRitualProps> = ({ onComplete }) => {
  const [isTearing, setIsTearing] = useState(false);
  const yesterday = subDays(new Date(), 1);
  const formattedYesterday = format(yesterday, 'd');
  const monthYear = format(yesterday, 'MMMM yyyy');

  const handleTear = () => {
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]); // Haptic
    // Play sound here ideally
    setIsTearing(true);
    setTimeout(onComplete, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm px-6">
        {/* Background Paper (Today) - Hidden behind */}
        <div className="absolute inset-0 mx-6 bg-[#F7F9FC] rounded-2xl h-[400px] transform rotate-1 scale-95 shadow-xl flex flex-col items-center justify-center">
            <h2 className="text-xl text-gray-400">Hello, Today!</h2>
        </div>

        {/* Foreground Paper (Yesterday) */}
        <div 
          onClick={handleTear}
          className={`
            relative bg-white h-[400px] rounded-2xl shadow-2xl flex flex-col items-center justify-between py-12 cursor-pointer
            transform transition-transform origin-top-left
            ${isTearing ? 'animate-tear' : 'hover:rotate-1'}
          `}
        >
            <div className="w-full border-b-2 border-dashed border-gray-200 absolute top-4"></div>
            
            <div className="text-center mt-8">
                <p className="text-gray-400 uppercase tracking-widest text-sm">{monthYear}</p>
                <h1 className="text-9xl font-bold text-gray-800 font-serif">{formattedYesterday}</h1>
                <p className="text-gray-500 mt-4 px-8 text-sm">Yesterday's clouds have drifted away.</p>
            </div>

            <div className="text-gray-400 text-sm animate-bounce">
                Tap to tear off
            </div>
        </div>
      </div>
    </div>
  );
};