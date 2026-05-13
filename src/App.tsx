/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { QuizView } from './components/QuizView';
import { FlashcardView } from './components/FlashcardView';
import { ChatView } from './components/ChatView';
import { GlassCard } from './components/GlassCard';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';

function MainApp() {
  const { user, login, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#05070A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-full bg-[#05070A] text-slate-200 font-sans flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <GlassCard gradient className="p-10 text-center space-y-8 shadow-[0_0_50px_rgba(79,70,229,0.2)]">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(79,70,229,0.5)]">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-white">BrainBoost</h1>
              <p className="text-slate-400">Master any subject with AI-powered personalized learning.</p>
            </div>
            <Button 
              onClick={login}
              className="w-full bg-white text-slate-900 hover:bg-slate-200 font-bold py-6 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Sign in with Google
            </Button>
            <div className="text-xs text-slate-500">
              Join 50k+ students learning faster today.
            </div>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#05070A] text-slate-200 font-sans flex overflow-hidden p-4 gap-4">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-hidden">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'quizzes' && <QuizView />}
          {activeTab === 'study' && <FlashcardView />}
          {activeTab === 'chat' && <ChatView />}
          {['focus', 'leaderboard'].includes(activeTab) && (
             <div className="h-full flex items-center justify-center">
                <GlassCard className="p-12 text-center">
                   <h2 className="text-2xl font-bold mb-4">Under Construction</h2>
                   <p className="text-slate-400">This feature is being optimized by our AI brain.</p>
                </GlassCard>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TooltipProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </TooltipProvider>
  );
}
