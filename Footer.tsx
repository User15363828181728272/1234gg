
import React, { useContext } from 'react';
import { LangContext } from './LangContext.tsx';
import { Heart, MessageCircle, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  appName: string;
  setActiveView: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ appName, setActiveView }) => {
  const { t, lang } = useContext(LangContext);

  return (
    <footer className="bg-[#0a0a0a] border-t border-slate-800/50 text-slate-400 pt-16 md:pt-32 pb-12 px-5 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
        {/* Brand Section */}
        <div className="space-y-6 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yt-red rounded-xl flex items-center justify-center shadow-lg shadow-red-500/10">
              <i className="fab fa-youtube text-white text-base"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase text-white italic leading-none">YTDOWN.SORAA</span>
              <span className="mono-text text-[8px] text-slate-500 uppercase tracking-widest font-bold mt-1">SORAA MEDIA LABS</span>
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest max-w-xs">
            {lang === 'id' 
              ? 'Platform pengunduhan video tercepat dengan fokus pada privasi dan keamanan data pengguna.' 
              : 'The fastest video download platform focusing on privacy and user data security.'}
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-6 md:space-y-8">
          <h5 className="mono-text text-[9px] font-black uppercase tracking-[0.3em] text-white border-b border-slate-800 pb-4">Navigasi</h5>
          <div className="flex flex-col gap-4">
            <button onClick={() => setActiveView('home')} className="text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors tracking-widest text-left">Beranda</button>
            <button onClick={() => setActiveView('faq')} className="text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors tracking-widest text-left">Pusat Bantuan</button>
            <button onClick={() => setActiveView('privacy')} className="text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors tracking-widest text-left">Kebijakan Privasi</button>
            <button onClick={() => setActiveView('terms')} className="text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors tracking-widest text-left">Syarat Layanan</button>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-6 md:space-y-8">
          <h5 className="mono-text text-[9px] font-black uppercase tracking-[0.3em] text-white border-b border-slate-800 pb-4">Hubungi Kami</h5>
          <div className="flex flex-col gap-5">
            <a href="https://wa.me/6288242449961" target="_blank" className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400 hover:text-white transition-all tracking-widest">
               <MessageCircle size={14} className="text-slate-600" /> +62 882-4244-9961
            </a>
            <a href="mailto:depstoreku@gmail.com" className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400 hover:text-white transition-all tracking-widest">
               <Mail size={14} className="text-slate-600" /> depstoreku@gmail.com
            </a>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500 tracking-widest">
               <MapPin size={14} className="text-slate-600" /> Jakarta, Indonesia
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="hidden lg:block space-y-8">
          <h5 className="mono-text text-[9px] font-black uppercase tracking-[0.3em] text-white border-b border-slate-800 pb-4">Sistem</h5>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
              <span className="text-slate-600">Engine_Core</span>
              <span className="text-emerald-500">v2.6 Stable</span>
            </div>
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
              <span className="text-slate-600">Server_Load</span>
              <span className="text-slate-500">Low (0.12%)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-32 pt-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="mono-text text-[8px] md:text-[9px] font-black tracking-[0.4em] uppercase text-slate-600 flex items-center gap-2">
          Soraa YtDown © 2026 • BUATAN <Heart size={10} className="text-yt-red fill-yt-red" /> Anak Bangsa
        </p>
        <div className="flex gap-8 md:gap-12 mono-text text-[8px] md:text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
          <span>© By Soraa</span>
          <span>© defandryan kenzo dinata</span>
        </div>
      </div>
    </footer>
  );
};
