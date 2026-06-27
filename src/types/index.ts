export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface PitchData {
  kr: string[];
  en: string[];
  values: number[];
}

export interface Sentence {
  id: string;
  date: string;
  level: Level;
  english: string;
  koreanPronunciation: string;
  koreanTranslation: string;
  blankWord: string;
  pitchData: PitchData;
}

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
};

export const LEVEL_STARS: Record<Level, number> = {
  beginner: 2,
  intermediate: 3,
  advanced: 4,
};
