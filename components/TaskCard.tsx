import React, { useState } from 'react';
import { Task, Category } from '../types';
import { COLORS } from '../constants';
import { Check, Snail } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDefer: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onDefer }) => {
  const [isExiting, setIsExiting] = useState(false);
  const colors = COLORS.categories[task.category];

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExiting(true);
    // Wait for animation to finish before actual removal/state change
    setTimeout(() => {
      onComplete(task.id);
    }, 600);
  };

  if (task.completed && !isExiting) return null; // Or render in a "completed" section

  return (
    <div 
      className={`
        relative w-full mb-4 p-4 squircle shadow-sm transform transition-all duration-300 
        hover:-translate-y-1 active:scale-95
        ${isExiting ? 'animate-poof' : ''}
      `}
      style={{ backgroundColor: colors.bg }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <button 
            onClick={handleCheck}
            className="w-6 h-6 rounded-full border-2 border-white/50 flex items-center justify-center mr-3 bg-white/30 hover:bg-white/60 transition-colors"
          >
            {isExiting && <Check size={14} className="text-white" />}
          </button>
          <span className="text-lg font-medium" style={{ color: colors.text }}>
            {task.text}
          </span>
        </div>

        {/* Snail / Defer Button */}
        {task.isDeferred && (
           <button onClick={() => onDefer(task.id)} className="ml-2 text-2xl animate-pulse" title="Push to tomorrow">
             🐌
           </button>
        )}
        
        {!task.isDeferred && (
           <div className="w-2 h-2 rounded-full bg-white/40 ml-2"></div>
        )}
      </div>
    </div>
  );
};