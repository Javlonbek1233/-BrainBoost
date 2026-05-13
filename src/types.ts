export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export interface UserProfile {
  userId: string;
  displayName: string;
  email: string;
  photoURL?: string;
  level: number;
  xp: number;
  streak: number;
  lastActive: string;
  stats: {
    quizzesCompleted: number;
    flashcardsMastered: number;
    studyMinutes: number;
  };
  weakTopics: string[];
  preferences: {
    darkMode: boolean;
    pomodoroLength: number;
  };
}

export interface Quiz {
  id?: string;
  title: string;
  subjectId: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  createdBy: string;
  createdAt: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
  mastered: boolean;
}

export interface FlashcardDeck {
  id?: string;
  title: string;
  userId: string;
  subjectId: string;
  cards: Flashcard[];
}

export interface StudyTask {
  title: string;
  description?: string;
  subjectId?: string;
  dueDate?: string;
  completed: boolean;
  priority?: 'high' | 'medium' | 'low';
  estimatedMinutes: number;
}

export interface StudyPlan {
  userId: string;
  tasks: StudyTask[];
}

export interface Note {
  id?: string;
  title: string;
  content: string;
  userId: string;
  subjectId: string;
  updatedAt: string;
}

export interface Room {
  id?: string;
  name: string;
  topic: string;
  hostId: string;
  participants: string[];
  active: boolean;
}
