import React, { useState, useEffect, useCallback } from 'react';
import { Task, Category, Mood, PetState, DiaryEntry } from './types';
import { COLORS, ENCOURAGEMENTS, CATEGORY_LABELS } from './constants';
import { DailyRitual } from './components/DailyRitual';
import { HomeView } from './components/HomeView';
import { CalendarView } from './components/CalendarView';
import { DiaryView } from './components/DiaryView';
import { Plus, Home, Calendar as CalendarIcon, Book } from 'lucide-react';
import { format } from 'date-fns';

// Simple "local storage" keys
const STORAGE_KEY_TASKS = 'cloud_do_tasks';
const STORAGE_KEY_PET = 'cloud_do_pet';
const STORAGE_KEY_LAST_VISIT = 'cloud_do_last_visit';
const STORAGE_KEY_DIARY = 'cloud_do_diary';
const STORAGE_KEY_MOODS = 'cloud_do_moods';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'diary'>('home');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pet, setPet] = useState<PetState>({ level: 1, exp: 0, isEating: false });
  const [showRitual, setShowRitual] = useState(false);
  const [moods, setMoods] = useState<Record<string, Mood>>({});
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  // Add Task Modal State
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<Category>(Category.LIFE);

  // Load Data
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY_TASKS);
    if (savedTasks) setTasks(JSON.parse(savedTasks));

    const savedPet = localStorage.getItem(STORAGE_KEY_PET);
    if (savedPet) setPet(JSON.parse(savedPet));

    const savedMoods = localStorage.getItem(STORAGE_KEY_MOODS);
    if (savedMoods) setMoods(JSON.parse(savedMoods));
    
    const savedDiary = localStorage.getItem(STORAGE_KEY_DIARY);
    if (savedDiary) setDiaryEntries(JSON.parse(savedDiary));

    const lastVisit = localStorage.getItem(STORAGE_KEY_LAST_VISIT);
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    
    if (lastVisit !== todayStr) {
      setShowRitual(true);
      // Logic for "Snail" mode could go here (check overdue tasks)
      localStorage.setItem(STORAGE_KEY_LAST_VISIT, todayStr);
    }
  }, []);

  // Save Tasks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
  }, [tasks]);

  // Save Pet
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PET, JSON.stringify(pet));
  }, [pet]);

  // Save Moods
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MOODS, JSON.stringify(moods));
  }, [moods]);
  
  // Save Diary
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DIARY, JSON.stringify(diaryEntries));
  }, [diaryEntries]);


  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      category: newTaskCategory,
      completed: false,
      date: format(new Date(), 'yyyy-MM-dd'),
      isDeferred: false,
    };
    setTasks(prev => [newTask, ...prev]); // Add to top
    setNewTaskText('');
    setIsAdding(false);
  };

  const completeTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));
    
    // Feed Nuonuo
    setPet(prev => ({ ...prev, isEating: true, exp: prev.exp + 10 }));
    if (navigator.vibrate) navigator.vibrate(50); // Haptic

    setTimeout(() => {
       setPet(prev => {
         const newExp = prev.exp;
         // Level up logic every 50 exp
         const newLevel = Math.floor(newExp / 50) + 1;
         return { ...prev, isEating: false, level: newLevel };
       });
    }, 500);
  }, []);

  const deferTask = (id: string) => {
    // Snail logic: Move to tomorrow
    // simplified for this demo
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isDeferred: false, date: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd') } : t));
  };
  
  const addDiaryEntry = (text: string, mood: Mood) => {
      const newEntry: DiaryEntry = {
          id: Date.now().toString(),
          date: format(new Date(), 'yyyy-MM-dd HH:mm'),
          text,
          mood
      }
      setDiaryEntries([newEntry, ...diaryEntries]);
  }

  return (
    <div className="relative max-w-md mx-auto bg-[#F7F9FC] min-h-screen overflow-hidden shadow-2xl">
      {showRitual && <DailyRitual onComplete={() => setShowRitual(false)} />}
      
      {/* Dynamic Content */}
      <main className="h-full overflow-y-auto custom-scrollbar">
        {activeTab === 'home' && (
          <HomeView 
            tasks={tasks}
            pet={pet}
            onPetClick={() => setPet(p => ({...p, isEating: !p.isEating}))}
            onCompleteTask={completeTask}
            onDeferTask={deferTask}
          />
        )}
        {activeTab === 'calendar' && (
          <CalendarView 
            tasks={tasks}
            moods={moods}
            onSetMood={(date, mood) => setMoods(prev => ({...prev, [date]: mood}))}
          />
        )}
        {activeTab === 'diary' && (
          <DiaryView 
            diaryEntries={diaryEntries}
            onAddEntry={addDiaryEntry}
            moods={moods}
          />
        )}
      </main>

      {/* Floating Add Button (Home Only) */}
      {activeTab === 'home' && !isAdding && (
          <div className="fixed bottom-24 right-1/2 transform translate-x-1/2 md:translate-x-0 md:right-[calc(50%-200px+2rem)] z-20">
              <button 
                onClick={() => setIsAdding(true)}
                className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-blue-400 transition-colors animate-float"
              >
                  <Plus size={32} />
              </button>
          </div>
      )}

      {/* Add Task Modal / Overlay */}
      {isAdding && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-end justify-center" onClick={() => setIsAdding(false)}>
              <div className="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
                  <p className="text-center text-gray-400 text-sm mb-4 italic">"{ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]}"</p>
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Add a new cloud..." 
                    className="w-full text-xl font-medium text-gray-700 placeholder-gray-300 outline-none bg-transparent mb-6"
                    value={newTaskText}
                    onChange={e => setNewTaskText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTask()}
                  />
                  
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                      {Object.values(Category).map(cat => (
                          <button
                            key={cat}
                            onClick={() => setNewTaskCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-transform active:scale-95 border-2 ${newTaskCategory === cat ? 'border-gray-400' : 'border-transparent'}`}
                            style={{ backgroundColor: COLORS.categories[cat].bg, color: COLORS.categories[cat].text }}
                          >
                              {CATEGORY_LABELS[cat]}
                          </button>
                      ))}
                  </div>

                  <button 
                    onClick={addTask}
                    className="w-full py-4 bg-gray-800 text-white rounded-2xl font-bold hover:bg-gray-700 transition-colors"
                  >
                      Float it
                  </button>
              </div>
          </div>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white/80 backdrop-blur-md border-t border-gray-100 flex justify-around py-4 z-30 pb-6 rounded-t-3xl">
          <button onClick={() => setActiveTab('home')} className={`p-2 transition-colors ${activeTab === 'home' ? 'text-blue-400' : 'text-gray-300'}`}>
              <Home size={24} />
          </button>
          <button onClick={() => setActiveTab('calendar')} className={`p-2 transition-colors ${activeTab === 'calendar' ? 'text-pink-400' : 'text-gray-300'}`}>
              <CalendarIcon size={24} />
          </button>
          <button onClick={() => setActiveTab('diary')} className={`p-2 transition-colors ${activeTab === 'diary' ? 'text-yellow-400' : 'text-gray-300'}`}>
              <Book size={24} />
          </button>
      </nav>
    </div>
  );
}