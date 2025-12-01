import { Category, Mood } from './types';

export const COLORS = {
  bg: '#F7F9FC',
  text: '#546E7A',
  categories: {
    [Category.LIFE]: { bg: '#FFF59D', text: '#F9A825' },    // Cream Yellow
    [Category.HEALTH]: { bg: '#C5E1A5', text: '#558B2F' },  // Mint Green
    [Category.IMPORTANT]: { bg: '#F48FB1', text: '#AD1457' }, // Sakura Pink
    [Category.WORK]: { bg: '#90CAF9', text: '#1565C0' },    // Sky Blue
  },
  moods: {
    [Mood.HAPPY]: '#FFAB91',   // Orange/Pinkish
    [Mood.CALM]: '#81D4FA',    // Light Blue
    [Mood.TIRED]: '#B39DDB',   // Purple
    [Mood.ANGRY]: '#EF9A9A',   // Reddish
    [Mood.NONE]: '#ECEFF1',
  }
};

export const ENCOURAGEMENTS = [
  "哇，这个计划听起来很棒！",
  "慢慢来，比较快。",
  "今天也要开心鸭！",
  "先把小事做好~",
  "Nuonuo 陪着你呢。",
];

export const CATEGORY_LABELS = {
  [Category.LIFE]: '生活',
  [Category.HEALTH]: '健康',
  [Category.IMPORTANT]: '重要',
  [Category.WORK]: '工作',
};