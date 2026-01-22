
export enum Step {
  INTRO = 'INTRO',
  TOPICS = 'TOPICS',
  STUDY = 'STUDY',
  QUIZ = 'QUIZ',
  SUCCESS = 'SUCCESS'
}

export interface BibleVerse {
  id: string;
  topic: string;
  reference: string;
  content: string;
  description: string;
}

export interface QuizState {
  currentVerse: BibleVerse;
  words: string[];
  blankIndices: number[];
  solvedIndices: number[];
  currentBlankIndex: number; // Index within blankIndices array
}
