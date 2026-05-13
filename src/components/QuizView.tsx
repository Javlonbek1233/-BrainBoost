import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { geminiService } from "../services/gemini";
import { Quiz as QuizType } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, Brain, Sparkles, Trophy, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export function QuizView() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const generateQuiz = async () => {
    if (!topic) return;
    setLoading(true);
    const data = await geminiService.generateQuiz(topic, "General", "medium");
    if (data) {
      setQuiz(data);
      setCurrentQuestion(0);
      setScore(0);
      setIsFinished(false);
    }
    setLoading(false);
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === quiz?.questions[currentQuestion].correctOptionIndex) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#9333EA', '#FFFFFF']
      });
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      {!quiz ? (
        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <GlassCard className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group hover:scale-110 transition-transform">
                <Brain className="w-10 h-10 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">AI Quiz Generator</h2>
              <p className="text-slate-400">Enter a topic and our AI will craft a personalized quiz for you.</p>
              <div className="space-y-4">
                <Input 
                  placeholder="e.g. Quantum Physics, Spanish Vocab..." 
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl py-6"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <Button 
                  onClick={generateQuiz} 
                  disabled={loading || !topic}
                  className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                      <RefreshCw className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Quiz
                    </>
                  )}
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      ) : isFinished ? (
        <div className="flex-1 flex items-center justify-center">
          <GlassCard className="p-10 text-center max-w-md w-full space-y-6">
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-12 h-12 text-yellow-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Quiz Completed!</h1>
            <div className="text-5xl font-black text-indigo-400">{score} / {quiz.questions.length}</div>
            <p className="text-slate-400">Amazing job! You've earned {(score * 100)} XP for your efforts.</p>
            <Button 
              onClick={() => setQuiz(null)}
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl py-6"
            >
              Done
            </Button>
          </GlassCard>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6 max-w-3xl mx-auto w-full">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-xl font-bold text-white">{quiz.title}</h2>
            <span className="text-slate-500 font-mono">Q {currentQuestion + 1} of {quiz.questions.length}</span>
          </div>
          
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
            <motion.div 
               className="bg-indigo-500 h-full"
               initial={{ width: 0 }}
               animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <GlassCard className="p-8 flex flex-col h-full">
                <p className="text-xl font-medium text-slate-100 mb-8 leading-relaxed">
                  {quiz.questions[currentQuestion].question}
                </p>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {quiz.questions[currentQuestion].options.map((option, i) => {
                    const isCorrect = i === quiz.questions[currentQuestion].correctOptionIndex;
                    const isSelected = selectedOption === i;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(i)}
                        className={cn(
                          "w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between group",
                          selectedOption === null 
                            ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-indigo-500/50" 
                            : isSelected 
                              ? isCorrect ? "bg-green-500/20 border-green-500 text-green-300" : "bg-red-500/20 border-red-500 text-red-300"
                              : isCorrect ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-white/5 border-transparent opacity-50"
                        )}
                      >
                        <span className="font-medium">{option}</span>
                        {selectedOption !== null && isCorrect && <CheckCircle2 className="w-6 h-6 shrink-0" />}
                        {selectedOption !== null && isSelected && !isCorrect && <XCircle className="w-6 h-6 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
                
                {selectedOption !== null && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-8"
                  >
                    <p className="text-sm text-indigo-300">
                      <span className="font-bold">Explanation:</span> {quiz.questions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}

                <div className="mt-auto flex justify-end">
                  <Button 
                    onClick={nextQuestion} 
                    disabled={selectedOption === null}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-6 rounded-xl"
                  >
                    {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next Question'}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
