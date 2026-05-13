import { useState, useEffect } from "react";
import { GlassCard } from "./GlassCard";
import { geminiService } from "../services/gemini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Sparkles, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function ChatView() {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', content: string }[]>([
    { role: 'ai', content: 'Hello! I am your BrainBoost AI assistant. What are we studying today?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await geminiService.chat(userMessage, "Student dashboard");
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I encountered an error. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col gap-4 max-w-4xl mx-auto w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                msg.role === 'ai' ? 'bg-indigo-600' : 'bg-slate-700'
              }`}>
                {msg.role === 'ai' ? <Bot className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
              </div>
              <div className={`rounded-3xl p-6 ${
                msg.role === 'ai' 
                  ? 'bg-slate-900/60 backdrop-blur-md border border-white/5 text-slate-200' 
                  : 'bg-indigo-600 text-white'
              }`}>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
      </div>

      <GlassCard className="p-4">
        <div className="flex gap-4">
          <Input 
            placeholder="Ask anything..." 
            className="flex-1 bg-white/5 border-white/10 text-white rounded-xl py-6"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button 
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 h-14 rounded-xl shadow-lg"
          >
            <Send className="w-5 h-5 mr-2" />
            Send
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
