import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function GlassCard({ children, className, gradient }: GlassCardProps) {
  return (
    <div className={cn(
      "bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/5",
      gradient && "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-white/10",
      className
    )}>
      {children}
    </div>
  );
}
