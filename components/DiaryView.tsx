import React, { useState } from 'react';
import { format } from 'date-fns';
import { Cloud } from 'lucide-react';
import { DiaryEntry, Mood } from '../types';
import { COLORS } from '../constants';

interface DiaryViewProps {
  diaryEntries: DiaryEntry[];
  onAddEntry: (text: string, mood: Mood) => void;
  moods: Record<string, Mood>;
}

export const DiaryView: React.FC<DiaryViewProps> = ({ diaryEntries, onAddEntry, moods }) => {
  const [entryText, setEntryText] = useState('');
  
  const handleSubmit = () => {
      if(!entryText) return;
      onAddEntry(entryText, moods[format(new Date(), 'yyyy-MM-dd')] || Mood.CALM);
      setEntryText('');
  };

  return (
      <div className="pb-24 px-4 pt-8 min-h-screen">
           <h2 className="text-2xl font-bold text-gray-700 mb-6">Time Capsule</h2>
           
           <div className="bg-white p-4 squircle shadow-sm mb-8">
               <textarea 
                 className="w-full bg-transparent resize-none outline-none text-gray-600 placeholder-gray-300"
                 rows={4}
                 placeholder="What small joy happened today?"
                 value={entryText}
                 onChange={(e) => setEntryText(e.target.value)}
                 maxLength={140}
               />
               <div className="flex justify-between items-center mt-4">
                   <span className="text-xs text-gray-400">{entryText.length}/140</span>
                   <button 
                     onClick={handleSubmit}
                     className="px-4 py-2 bg-blue-100 text-blue-500 rounded-full text-sm font-bold hover:bg-blue-200 transition-colors"
                   >
                       Record
                   </button>
               </div>
           </div>

           <div className="space-y-6">
               {diaryEntries.map(entry => (
                   <div key={entry.id} className="bg-white p-3 shadow-md rotate-1 hover:rotate-0 transition-transform duration-300 max-w-xs mx-auto pb-8" style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}>
                       <div className="bg-gray-100 aspect-square w-full mb-3 flex items-center justify-center text-gray-300">
                           <Cloud size={32} />
                       </div>
                       <p className="font-handwriting text-gray-600 mb-2">{entry.text}</p>
                       <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
                           <span>{entry.date}</span>
                           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.moods[entry.mood] }}></div>
                       </div>
                   </div>
               ))}
           </div>
      </div>
  )
};