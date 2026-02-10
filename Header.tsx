
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LangContext } from './LangContext.tsx';
import { Menu, X, Activity, MessageCircle } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: any) => void;
  appName: string;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, appName }) => {
  const { lang, setLang, t } = useContext(LangContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (viewId: any) => {
    setActiveView(viewId);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] px-3 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-2xl border border-slate-100 rounded-[28px] md:rounded-[32px] px-4 md:px-8 py-3 md:py-4 shadow-sm shadow-black/[0.01]">
        <div onClick={() => handleNavClick('home')} className="flex items-center gap-3 md:gap-4 cursor-pointer group">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-yt-red rounded-xl flex items-center justify-center shadow-lg shadow-red-500/10 transition-transform duration-500 group-hover:rotate-12">
            <i className="fab fa-youtube text-white text-base md:text-lg"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-tighter text-slate-900 uppercase italic leading-none">{appName}</span>
            <span className="mono-text text-[7px] md:text-[8px] text-slate-400 uppercase tracking-[0.2em] font-bold mt-0.5">Media Studio</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-10">
          {[
            { id: 'home', label: t.about },
            { id: 'faq', label: t.faq },
            { id: 'privacy', label: t.privacy },
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)}
              className={`mono-text text-[10px] font-black uppercase tracking-[0.25em] transition-all relative group ${activeView === item.id ? 'text-yt-red' : 'text-slate-400 hover:text-slate-900'}`}
            >
              {item.label}
              <span className={`absolute -bottom-1.5 left-0 w-full h-0.5 bg-yt-red rounded-full transition-all duration-300 ${activeView === item.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'}`}></span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden sm:flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            {(['id', 'en'] as const).map(l => (
              <button 
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-white text-yt-red shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {l}
              </button>
            ))}
          </div>
          
          <div className="h-7 w-px bg-slate-100 hidden sm:block"></div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <a href="https://wa.me/6288242449961" target="_blank" className="hidden lg:flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-yt-red transition-all group">
             <Activity size={14} className="text-yt-red group-hover:text-white" />
             Support Admin
          </a>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="lg:hidden absolute top-full left-0 w-full px-4 pt-2"
          >
            <div className="bg-white/95 backdrop-blur-3xl border border-slate-100 rounded-[28px] p-6 space-y-4 shadow-xl shadow-black/5">
              {[
                { id: 'home', label: t.about },
                { id: 'faq', label: t.faq },
                { id: 'privacy', label: t.privacy },
                { id: 'terms', label: t.terms },
              ].map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${activeView === item.id ? 'bg-yt-red text-white shadow-lg shadow-red-500/20' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                 <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                    {(['id', 'en'] as const).map(l => (
                      <button key={l} onClick={() => setLang(l)} className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest ${lang === l ? 'bg-white text-yt-red shadow-sm' : 'text-slate-400'}`}>{l}</button>
                    ))}
                 </div>
                 <a href="https://wa.me/6288242449961" target="_blank" className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white"><MessageCircle size={18} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
