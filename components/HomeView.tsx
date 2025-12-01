import React from 'react';
import { format } from 'date-fns';
import { Sun } from 'lucide-react';
import { Task, PetState } from '../types';
import { Nuonuo } from './Nuonuo';
import { TaskCard } from './TaskCard';

interface HomeViewProps {
  tasks: Task[];
  pet: PetState;
  onPetClick: () => void;
  onCompleteTask: (id: string) => void;
  onDeferTask: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  tasks, 
  pet, 
  onPetClick, 
  onCompleteTask, 
  onDeferTask 
}) => {
  const pendingTasks = tasks.filter(t => !t.completed);

  return (
    <div className="pb-24 px-4 pt-4 min-h-screen">
      <header className="flex justify-between items-center mb-6 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">{format(new Date(), 'MMM d, EEEE')}</h1>
          <p className="text-sm text-gray-400">Have a soft day.</p>
        </div>
        <div className="bg-white p-2 rounded-full shadow-sm">
           <Sun size={24} className="text-yellow-400" />
        </div>
      </header>

      <Nuonuo state={pet} onClick={onPetClick} />
      
      <div className="mt-8">
         {pendingTasks.length === 0 ? (
           <div className="text-center text-gray-400 mt-12 opacity-60">
              <p>No clouds in the sky today~</p>
           </div>
         ) : (
           pendingTasks.map(task => (
             <TaskCard key={task.id} task={task} onComplete={onCompleteTask} onDefer={onDeferTask} />
           ))
         )}
      </div>
    </div>
  );
};