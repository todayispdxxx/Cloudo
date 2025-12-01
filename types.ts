export enum Category {
  LIFE = 'LIFE',
  HEALTH = 'HEALTH',
  IMPORTANT = 'IMPORTANT',
  WORK = 'WORK'
}

export enum Mood {
  HAPPY = 'HAPPY',
  CALM = 'CALM',
  TIRED = 'TIRED',
  ANGRY = 'ANGRY',
  NONE = 'NONE'
}

export interface Task {
  id: string;
  text: string;
  category: Category;
  completed: boolean;
  date: string; // ISO Date string YYYY-MM-DD
  isDeferred: boolean; // Snail mode
}

export interface DiaryEntry {
  id: string;
  date: string;
  text: string;
  imageUrl?: string;
  mood: Mood;
}

export interface PetState {
  level: number;
  exp: number;
  isEating: boolean;
}

export interface DailyStats {
  date: string;
  mood: Mood;
  completionRate: number; // 0-100
}