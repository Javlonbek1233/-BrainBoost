import { GlassCard } from "./GlassCard";
import { useAuth } from "../hooks/useAuth";
import { MOCK_LEADER_BOARD } from "../constants";
import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";
import { usePomodoro } from "../hooks/usePomodoro";
import { Play, Pause, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dashboard() {
  const { profile } = useAuth();
  const pomodoro = usePomodoro();

  return (
    <div className="flex-1 grid grid-cols-12 gap-4 h-full overflow-y-auto pr-2 custom-scrollbar">
      {/* Left Column: Stats & Progress */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
        <GlassCard className="p-4 flex flex-col gap-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Learning Velocity</h3>
          <div className="flex items-end gap-2 h-24">
            {[40, 65, 50, 85, 95, 70].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                className="flex-1 bg-indigo-500/40 rounded-t-md"
              />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">+22%</div>
            <div className="text-xs text-green-400 font-medium">Weekly Growth</div>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex-1">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Weak-Topic Focus</h3>
          <div className="space-y-4">
            {[
              { label: 'Quantum Mechanics', value: 42, color: 'bg-red-500', text: 'text-red-400' },
              { label: 'Organic Chemistry', value: 58, color: 'bg-orange-500', text: 'text-orange-400' },
              { label: 'Microeconomics', value: 89, color: 'bg-blue-500', text: 'text-blue-400' },
            ].map((topic, i) => (
              <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-medium text-slate-300">{topic.label}</span>
                  <span className={topic.text}>{topic.value}% Proficiency</span>
                </div>
                <Progress value={topic.value} className="h-1.5" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Middle Column: Main Tools */}
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <GlassCard gradient className="p-6">
          <h2 className="text-2xl font-bold mb-2">What are we learning today?</h2>
          <p className="text-slate-400 text-sm mb-6">Drop a PDF or paste notes to generate personalized AI study materials.</p>
          <div className="flex gap-4">
            <button className="flex-1 bg-white text-slate-900 font-bold py-4 rounded-2xl flex flex-col items-center gap-1 shadow-lg hover:scale-105 transition-transform">
              <span className="text-xl">📝</span>
              <span>AI Quiz</span>
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl flex flex-col items-center gap-1 border border-white/10 transition-all">
              <span className="text-xl">🗂️</span>
              <span>Flashcards</span>
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl flex flex-col items-center gap-1 border border-white/10 transition-all">
              <span className="text-xl">✨</span>
              <span>Summary</span>
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Daily Study Plan</h3>
            <span className="text-xs text-slate-500">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="space-y-3 flex-1">
            {[
              { time: '10am', title: 'Deep Work: Neural Networks', sub: '45 min Session · 3 Quizzes pending', active: true },
              { time: '1pm', title: 'Flashcard Review: Spanish Vocab', sub: '15 min Session · 52 cards', active: false },
              { time: '4pm', title: 'Group Study: Macro Theory', sub: 'Collaborative Room #402', active: false, disabled: true },
            ].map((task, i) => (
              <div key={i} className={cn(
                "flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl transition-all",
                task.disabled && "opacity-50"
              )}>
                <div className={cn(
                  "w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs shrink-0",
                  task.active ? "border-indigo-500 text-indigo-400" : "border-slate-700 text-slate-500"
                )}>{task.time}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-200">{task.title}</h4>
                  <p className="text-xs text-slate-500">{task.sub}</p>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border shrink-0",
                  task.active ? "bg-indigo-500/20 border-indigo-500" : "border-slate-700"
                )} />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-sm">
             <span className="text-slate-400">AI Tutor: "You're 12% ahead of schedule today!"</span>
             <button className="text-indigo-400 font-bold hover:underline">Ask Assistant</button>
          </div>
        </GlassCard>
      </div>

      {/* Right Column: Focus & Social */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
        <GlassCard className="p-6 flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
              <circle 
                cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray="364" 
                strokeDashoffset={364 - (364 * pomodoro.progress / 100)} 
                className="text-indigo-500 transition-all duration-1000" strokeLinecap="round" 
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold font-mono tracking-tighter">{pomodoro.formatTime()}</span>
              <span className="text-[10px] uppercase text-slate-500 tracking-widest font-bold">Focus</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={pomodoro.toggleTimer}
              className="px-6 py-2 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors"
            >
              {pomodoro.isActive ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={pomodoro.resetTimer}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <RefreshCcw className="w-4 h-4 text-white" />
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex-1">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Leaderboard</h3>
          <div className="space-y-3">
             {MOCK_LEADER_BOARD.map((user, i) => (
                <div key={i} className={cn(
                  "flex items-center gap-3 p-2 bg-white/5 rounded-xl border",
                  user.rank === 1 ? "border-yellow-500/20" : "border-transparent"
                )}>
                  <span className={cn(
                    "font-bold w-4",
                    user.rank === 1 ? "text-yellow-400" : "text-slate-500"
                  )}>{user.rank}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden" />
                  <div className="flex-1 text-sm font-medium text-slate-300">{user.name}</div>
                  <div className="text-xs font-bold text-indigo-400">{user.xp}</div>
                </div>
             ))}
             <div className="flex items-center gap-3 p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
               <span className="text-indigo-400 font-bold w-4">14</span>
               <div className="w-8 h-8 rounded-full bg-indigo-600" />
               <div className="flex-1 text-sm font-medium">You (Alex)</div>
               <div className="text-xs font-bold">8.2k</div>
             </div>
          </div>
          <button className="w-full mt-4 py-2 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/5 text-slate-400 transition-colors">
            View All Challenges
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
