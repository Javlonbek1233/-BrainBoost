import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Layers, ChevronLeft, ChevronRight, CheckCircle, RotateCcw } from "lucide-react";

export function FlashcardView() {
  const [deck, setDeck] = useState([
    { front: "What is quantum entanglement?", back: "A physical phenomenon that occurs when a pair or group of particles is generated, interact, or share spatial proximity in a way such that the quantum state of each particle of the pair or group cannot be described independently of the state of the others." },
    { front: "Define photosynthesis", back: "The process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments." },
    { front: "Schrodinger's Cat", back: "A thought experiment that illustrates a paradox of quantum superposition." },
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const next = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev + 1) % deck.length);
  };

  const prev = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev - 1 + deck.length) % deck.length);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl relative perspective-1000">
         <motion.div
            className="w-full h-[400px] cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
            onClick={() => setIsFlipped(!isFlipped)}
         >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden">
               <GlassCard gradient className="w-full h-full p-12 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-white/50 uppercase tracking-widest mb-8">Question</span>
                  <p className="text-3xl font-bold text-white leading-tight">{deck[currentIdx].front}</p>
                  <p className="mt-auto text-slate-400 text-sm italic">Click to flip</p>
               </GlassCard>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden" style={{ transform: "rotateY(180deg)" }}>
               <GlassCard className="w-full h-full p-12 flex flex-col items-center justify-center text-center bg-slate-900 border-indigo-500/30">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-8">Answer</span>
                  <p className="text-xl text-slate-200 leading-relaxed">{deck[currentIdx].back}</p>
                  <div className="mt-auto flex gap-4">
                     <Button className="bg-green-600 hover:bg-green-500 rounded-full h-12 w-12 p-0"><CheckCircle className="w-6 h-6" /></Button>
                     <Button className="bg-red-600 hover:bg-red-500 rounded-full h-12 w-12 p-0"><RotateCcw className="w-6 h-6" /></Button>
                  </div>
               </GlassCard>
            </div>
         </motion.div>

         <div className="flex justify-between items-center mt-12 w-full px-4 text-slate-400 font-mono">
            <button onClick={prev} className="hover:text-white transition-colors"><ChevronLeft className="w-8 h-8" /></button>
            <span>{currentIdx + 1} / {deck.length}</span>
            <button onClick={next} className="hover:text-white transition-colors"><ChevronRight className="w-8 h-8" /></button>
         </div>
      </div>
    </div>
  );
}
