import { BookOpen, GraduationCap, LayoutDashboard, MessageSquare, Timer, Trophy } from "lucide-react";

export const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: 'Math', color: 'blue' },
  { id: 'science', name: 'Science', icon: 'Science', color: 'green' },
  { id: 'history', name: 'History', icon: 'History', color: 'amber' },
  { id: 'lang', name: 'Languages', icon: 'Languages', color: 'purple' }
];

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'study', label: 'Study', icon: BookOpen },
  { id: 'quizzes', label: 'Quizzes', icon: GraduationCap },
  { id: 'focus', label: 'Focus', icon: Timer },
  { id: 'chat', label: 'AI Tutor', icon: MessageSquare },
  { id: 'leaderboard', label: 'Trophy', icon: Trophy },
];

export const MOCK_LEADER_BOARD = [
  { rank: 1, name: 'Sarah L.', xp: '12.4k', avatar: '' },
  { rank: 2, name: 'Marcus V.', xp: '11.2k', avatar: '' },
  { rank: 3, name: 'Elena R.', xp: '10.8k', avatar: '' },
];
