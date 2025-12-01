import React from 'react';
import { format } from 'date-fns';
import { Task, Mood } from '../types';
import { COLORS } from '../constants';

interface CalendarViewProps {
  tasks: Task[];
  moods: Record<string, Mood>;
  onSetMood: (date: string, mood: Mood) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ tasks, moods, onSetMood }) => {
  const today = new Date();
  const currentMonth = format(today, 'MMMM yyyy');
  const daysInMonth = Array.from({length: 30}, (_, i) => i + 1);
  
  const todayStr = format(today, 'yyyy-MM-dd');
  const currentMood = moods[todayStr] || Mood.NONE;
  
  const completionRate = tasks.filter(t => t.completed).length / (tasks.length || 1);

  return (
      <div className="pb-24 px-4 pt-8 min-h-screen flex flex-col">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">{currentMonth}</h2>
          
          {/* Weather Bottle */}
          <div className="bg-white p-6 rounded-3xl shadow-sm mb-8 flex items-center justify-between">
              <div className="w-1/2">
                  <h3 className="text-lg font-bold text-gray-600">Weather Bottle</h3>
                  <p className="text-xs text-gray-400 mt-1">Based on mood & tasks</p>
              </div>
              <div className="w-16 h-24 border-2 border-gray-200 rounded-b-xl rounded-t-md relative overflow-hidden bg-gray-50">
                  <div 
                    className="absolute bottom-0 left-0 right-0 transition-all duration-1000"
                    style={{ 
                        height: `${Math.max(20, completionRate * 100)}%`,
                        backgroundColor: COLORS.moods[currentMood] !== '#ECEFF1' ? COLORS.moods[currentMood] : '#B0BEC5',
                        opacity: 0.8
                    }}
                  ></div>
                  {completionRate > 0.8 && (currentMood === Mood.TIRED || currentMood === Mood.ANGRY) && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-yellow-300 drop-shadow-md">★</div>
                  )}
              </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-3">
              {['S','M','T','W','T','F','S'].map((d,i) => (
                  <div key={i} className="text-center text-xs text-gray-400 font-bold">{d}</div>
              ))}
              {daysInMonth.map(day => {
                  const dateKey = `2023-10-${day.toString().padStart(2, '0')}`;
                  const mood = moods[dateKey];
                  return (
                    <div 
                        key={day} 
                        className="aspect-square rounded-full flex items-center justify-center text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                        style={{ backgroundColor: mood ? COLORS.moods[mood] : 'transparent', color: mood ? 'white' : 'inherit' }}
                        onClick={() => {
                             onSetMood(todayStr, Mood.HAPPY); 
                        }}
                    >
                        {day}
                    </div>
                  )
              })}
          </div>
          
          <div className="mt-8">
              <h3 className="text-gray-600 font-bold mb-4">Mood Stickers</h3>
              <div className="flex justify-around">
                  {Object.values(Mood).filter(m => m !== Mood.NONE).map(m => (
                      <button 
                        key={m}
                        onClick={() => onSetMood(todayStr, m)}
                        className={`w-10 h-10 rounded-full shadow-sm transform hover:scale-110 transition-transform ${currentMood === m ? 'ring-2 ring-gray-400' : ''}`}
                        style={{ backgroundColor: COLORS.moods[m] }}
                      />
                  ))}
              </div>
          </div>
      </div>
  )
};