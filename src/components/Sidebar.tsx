import { NAV_ITEMS } from "@/src/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "../hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Sidebar({ activeTab, onTabChange }: { activeTab: string, onTabChange: (id: string) => void }) {
  const { profile } = useAuth();

  return (
    <nav className="w-20 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col items-center py-8 gap-8">
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]">
        B
      </div>
      <div className="flex flex-col gap-6">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
              activeTab === item.id 
                ? "bg-white/10 text-indigo-400 shadow-inner" 
                : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
            )}
            title={item.label}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </div>
      <div className="mt-auto">
        <Avatar className="w-10 h-10 border border-white/20">
          <AvatarImage src={profile?.photoURL} />
          <AvatarFallback className="bg-gradient-to-tr from-indigo-500 to-purple-500 text-white text-[10px]">
             {profile?.displayName?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
