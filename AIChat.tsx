
import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { X, Send, Bot } from 'lucide-react';
import { LangContext } from './LangContext.tsx';

const formatMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-[10px] font-mono">$1</code>')
    .replace(/\n/g, '<br />');
};

export const AIChat: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ 
      role: 'ai', 
      text: lang === 'id' ? 'Halo! Ada yang bisa saya bantu terkait **Ytdown Soraa**?' : 'Hello! Need help with **Ytdown Soraa**?' 
    }]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are Soraa-AI, a helpful assistant for Ytdown Soraa. Current language: ${lang}. 
          Keep it very short (max 20 words). Be professional.`,
          temperature: 0.4,
        },
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "..." }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: "Service error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div {...({ initial: { opacity: 0, y: 20, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 20, scale: 0.9 } } as any)} className="mb-4 w-[320px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-black text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={16}/>
                <span className="text-[10px] font-bold uppercase tracking-widest">Soraa-AI</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={14}/></button>
            </div>
            <div ref={scrollRef} className="h-72 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-[11px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-black text-white' : 'bg-white border border-gray-100 text-gray-600'}`} dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }} />
                </div>
              ))}
              {isLoading && <div className="text-[10px] text-gray-300 font-bold uppercase animate-pulse">Thinking...</div>}
            </div>
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input type="text" placeholder="..." className="flex-grow bg-gray-50 outline-none rounded-xl px-4 py-2 text-[11px]" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
              <button onClick={handleSendMessage} className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center"><Send size={14}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-black text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 active:scale-90 transition-all">
        {isOpen ? <X size={20}/> : <i className="fas fa-comment-dots text-lg"></i>}
      </button>
    </div>
  );
};
