import { Bell, Flame } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const { profile } = useAuth();

  return (
    <header className="h-16 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/5 flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          BrainBoost Dashboard
        </h1>
        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
          Pro AI Active
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-bold text-slate-200">{profile?.streak || 0} Day Streak</span>
        </div>
        <div className="h-4 w-px bg-white/10"></div>
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
          </div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#05070A]"></div>
        </div>
      </div>
    </header>
  );
}
