import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Download, Info, Zap, ShieldCheck, Play, Share2, Copy, CheckCircle } from 'lucide-react';
import { LangContext } from './LangContext.tsx';

interface HomeProps {
  url: string; setUrl: (u: string) => void; isLoading: boolean; videoInfo: any; error: string | null;
  activeTab: 'video' | 'audio'; setActiveTab: (t: 'video' | 'audio') => void;
  convertingVid: string | null; history: any[]; handleSearch: (e?: any, m?: string) => void;
  startConversion: (url: string) => void; clearHistory: () => void;
}

export const Home: React.FC<HomeProps> = ({ 
  url, setUrl, isLoading, videoInfo, error, activeTab, setActiveTab, 
  history, handleSearch, startConversion, clearHistory 
}) => {
  const { t, lang } = useContext(LangContext);
  const [showCopied, setShowCopied] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        if (text.includes('youtu')) handleSearch(null, text);
      }
    } catch (err) {}
  };

  const handleShare = async () => {
    if (!videoInfo) return;
    const shareData = {
      title: videoInfo.title,
      text: `Download ${videoInfo.title} on Ytdown Soraa!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Fungsi untuk memaksa download agar tidak redirect ke player browser
  const handleDownload = async (downloadUrl: string, filename: string) => {
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (err) {
      // Fallback jika fetch gagal (CORS)
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = filename;
      link.click();
    }
  };

  // Filter Media: Hanya MP4 360p (MP4 Only)
  const filteredMedias = (() => {
    if (!videoInfo?.medias) return [];
    
    // Mencari MP4 360p
    const mp4_360 = videoInfo.medias.find((m: any) => 
      m.type === 'video' && 
      m.extension === 'mp4' && 
      (m.qualityLabel === '360p' || m.quality === '360p')
    );

    // Jika 360p tidak ada, ambil video MP4 pertama yang tersedia
    const fallback = videoInfo.medias.find((m: any) => m.type === 'video' && m.extension === 'mp4');
    
    return mp4_360 ? [mp4_360] : (fallback ? [fallback] : []);
  })();

  return (
    <div className="space-y-8 md:space-y-32 pb-12 md:pb-32">
      <section className="relative">
        <div className="max-w-5xl">
          <motion.div 
            {...({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } } as any)}
            className="space-y-4 md:space-y-10"
          >
            <div className="flex items-center gap-3">
              <span className="mono-text text-[7px] md:text-[10px] text-yt-red border border-yt-red/20 px-2 py-0.5 rounded-full uppercase tracking-[0.2em] font-bold">ENGINE V2.6</span>
              <div className="h-px flex-grow bg-slate-100"></div>
            </div>
            
            <h1 className="text-2xl sm:text-5xl md:text-[7rem] font-[800] leading-[1.1] md:leading-[0.85] tracking-tighter text-slate-900 uppercase italic">
              {t.heroTitle.split('YouTube').map((p, i) => (
                <React.Fragment key={i}>
                  {p}
                  {i === 0 && <span className="text-yt-red block md:inline not-italic">YouTube</span>}
                </React.Fragment>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-start">
               <p className="text-slate-500 text-[13px] md:text-xl lg:text-2xl max-w-xl font-medium leading-relaxed">
                {t.heroDesc}
              </p>
              <div className="flex-grow flex justify-end w-full md:w-auto">
                <div className="studio-card p-3 md:p-6 px-4 md:px-8 flex flex-col items-end gap-0.5 md:gap-1 border-slate-100 w-full sm:w-auto">
                   <div className="mono-text text-[6px] md:text-[9px] text-slate-400 uppercase tracking-widest">NETWORK PULSE</div>
                   <div className="text-lg md:text-3xl font-black text-slate-900">0.24ms <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full ml-1 animate-pulse"></span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            {...({ initial: { scale: 0.98, opacity: 0 }, animate: { scale: 1, opacity: 1 } } as any)}
            className="input-studio p-1.5 md:p-3 rounded-[24px] md:rounded-[44px] flex flex-col md:flex-row items-center gap-1.5 group"
          >
            <div className="flex-grow flex items-center w-full">
              <div className="pl-3 md:pl-6 text-slate-300"><Search size={16} /></div>
              <input 
                type="text" placeholder={t.placeholder}
                className="w-full bg-transparent outline-none py-3 md:py-7 px-3 text-sm md:text-2xl font-bold text-slate-900 placeholder:text-slate-200 mono-text"
                value={url} onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {url && <button onClick={() => setUrl('')} className="p-1.5 text-slate-300 hover:text-slate-900"><X size={16} /></button>}
            </div>
            <div className="flex w-full md:w-auto gap-1.5 p-0.5">
              <button 
                onClick={handlePaste} 
                className="flex-1 md:flex-none px-4 py-3 md:py-6 rounded-[18px] md:rounded-[32px] bg-white border border-slate-200 text-slate-900 text-[9px] md:text-[12px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
              >
                {t.btnPaste}
              </button>
              <button 
                onClick={() => handleSearch()} disabled={isLoading}
                className="btn-action flex-1 md:flex-none px-5 py-3 md:py-6 rounded-[18px] md:rounded-[32px] text-[9px] md:text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 md:gap-4"
              >
                {isLoading ? <span className="w-3 h-3 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download size={14} />}
                {isLoading ? t.wait : t.btnDownload}
              </button>
            </div>
          </motion.div>
          {error && (
            <motion.div {...({ initial: { opacity: 0 }, animate: { opacity: 1 } } as any)} className="mt-4 p-3 md:p-6 bg-red-50 border border-red-100 rounded-[18px] md:rounded-[28px] text-red-500 text-[10px] md:text-xs font-bold flex items-center gap-2">
              <Info size={14} /> {error}
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {videoInfo ? (
          <motion.div key="result" {...({ initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } } as any)} className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-10 items-start">
              <div className="lg:col-span-5 studio-card overflow-hidden group border-slate-100">
                <div className="relative aspect-video">
                  <img src={videoInfo.thumbnail} className="w-full h-full object-cover transition-all duration-700" alt="thumbnail" />
                  <div className="scanline"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div className="space-y-0.5">
                      <div className="mono-text text-[6px] text-white/70 uppercase tracking-widest">LENGTH</div>
                      <div className="text-base md:text-2xl font-black text-white">{videoInfo.duration}</div>
                    </div>
                    <div className="p-2 md:p-4 bg-white/20 backdrop-blur-xl rounded-full border border-white/20 text-white">
                      <Play fill="white" size={18} />
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-8 space-y-3 md:space-y-6 bg-white">
                  <h2 className="text-sm md:text-3xl font-black text-slate-900 leading-tight line-clamp-2">{videoInfo.title}</h2>
                  <p className="text-[10px] md:text-base text-slate-400 font-bold uppercase tracking-widest">{videoInfo.author}</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={handleShare}
                      className="flex-1 py-2.5 md:py-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors text-slate-600"
                    >
                      {showCopied ? <CheckCircle size={12} className="text-green-500" /> : <Share2 size={12} />}
                      {showCopied ? 'Link Disalin' : 'Bagikan Stream'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 studio-card p-0.5 md:p-1 border-slate-100 overflow-hidden">
                <div className="flex p-1 md:p-2 bg-slate-50/50 border-b border-slate-100 rounded-t-[23px] md:rounded-t-[31px]">
                   <button className="flex-1 py-2 md:py-4 rounded-lg md:rounded-2xl text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] bg-white text-yt-red shadow-lg shadow-black/5">
                      MP4 VIDEO ONLY
                   </button>
                </div>

                <div className="p-2 md:p-8 space-y-1.5 md:space-y-3 max-h-[300px] md:max-h-[500px] overflow-y-auto">
                  {filteredMedias.length > 0 ? filteredMedias.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 md:p-6 bg-white border border-slate-100 rounded-xl md:rounded-2xl group hover:border-yt-red/30 hover:shadow-xl hover:shadow-black/[0.02] transition-all gap-3">
                      <div className="space-y-0.5">
                        <div className="mono-text text-[6px] md:text-[7px] text-slate-400 uppercase tracking-widest">QUALITY</div>
                        <div className="text-xs md:text-xl font-black text-slate-900 group-hover:text-yt-red transition-colors uppercase">{item.qualityLabel || item.quality || '360p'}</div>
                        <div className="mono-text text-[6px] md:text-[7px] text-slate-300 uppercase">{item.extension} • {item.contentLength ? (parseInt(item.contentLength)/1048576).toFixed(1) + 'MB' : 'Standard'}</div>
                      </div>
                      <button 
                        onClick={() => handleDownload(item.url, `${videoInfo.title}.mp4`)} 
                        className="btn-action px-4 py-2 md:px-8 md:py-4 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-sm"
                      >
                        {t.get}
                      </button>
                    </div>
                  )) : (
                    <div className="py-10 text-center text-[10px] text-slate-300 uppercase font-black tracking-widest">Format tidak tersedia</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div key="info" className="space-y-8 md:space-y-32">
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 md:auto-rows-[300px]">
               <div className="md:col-span-8 studio-card p-5 md:p-20 flex flex-col justify-end relative overflow-hidden group bg-slate-50/30">
                  <div className="space-y-2.5 md:space-y-6 relative z-10">
                    <div className="w-8 md:w-16 h-1 bg-yt-red"></div>
                    <h3 className="text-base md:text-5xl lg:text-6xl font-black uppercase leading-[1.2] md:leading-[0.9] tracking-tighter text-slate-900 italic max-w-lg">{t.articleTitle}</h3>
                    <p className="text-slate-500 font-medium text-[10px] md:text-lg leading-relaxed">{t.articleBody1}</p>
                  </div>
               </div>
               
               <div className="md:col-span-4 studio-card p-5 md:p-10 flex flex-col items-center justify-center text-center space-y-3 md:space-y-8 bg-white border-slate-100">
                  <div className="w-12 h-12 md:w-24 md:h-24 bg-red-50 rounded-full flex items-center justify-center text-yt-red">
                    <Zap size={20} fill="currentColor"/>
                  </div>
                  <div className="space-y-1">
                    <div className="mono-text text-[7px] md:text-[10px] text-slate-300 uppercase tracking-widest">ENGINE</div>
                    <div className="text-sm md:text-3xl font-black italic text-slate-900 uppercase">PRO SPEED</div>
                  </div>
               </div>

               <div className="md:col-span-4 studio-card p-5 md:p-12 flex flex-col justify-center items-start space-y-3 md:space-y-6 border-slate-100">
                  <div className="mono-text text-[7px] md:text-[10px] text-slate-300 uppercase tracking-[0.4em]">01 / PROTOCOLS</div>
                  <div className="p-2 md:p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <ShieldCheck size={20} className="text-slate-200" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-xs md:text-2xl uppercase italic text-slate-900">IRON SECURE</h4>
                    <p className="text-slate-400 text-[8px] md:text-sm font-medium">Encrypted data stream. No logs.</p>
                  </div>
               </div>

               <div className="md:col-span-8 studio-card p-5 md:p-16 flex flex-col md:flex-row gap-5 md:gap-12 items-center bg-white border-slate-100">
                  <div className="flex-grow space-y-5 md:space-y-12 w-full">
                    <h3 className="text-sm md:text-5xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">{t.stepTitle}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 md:gap-y-10">
                      {[1, 2].map(i => (
                        <div key={i} className="space-y-1 md:space-y-3">
                          <div className="mono-text text-yt-red text-[8px] md:text-[11px] font-bold uppercase tracking-widest">Task {i}</div>
                          <p className="text-[8px] md:text-[11px] font-black text-slate-500 uppercase leading-relaxed tracking-wider">{(t as any)[`step${i}`]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </section>

            {history.length > 0 && (
              <section className="space-y-5 md:space-y-12">
                <div className="flex items-center gap-3 md:gap-6">
                   <div className="text-slate-300 mono-text text-[6px] md:text-[10px] uppercase tracking-[0.5em] font-bold shrink-0">HISTORY</div>
                   <div className="h-px flex-grow bg-slate-100"></div>
                   <button onClick={clearHistory} className="mono-text text-[6px] md:text-[10px] text-slate-400 hover:text-yt-red transition-colors font-bold tracking-widest">[CLEAR]</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                  {history.slice(0, 10).map((item) => (
                    <motion.div 
                        key={item.vid} 
                        whileHover={{ y: -4 }}
                        onClick={() => handleSearch(null, `https://youtube.com/watch?v=${item.vid}`)} 
                        className="studio-card p-2 md:p-4 flex items-center gap-2 md:gap-5 cursor-pointer group hover:border-yt-red/20 shadow-none border-slate-100 hover:shadow-lg transition-all"
                    >
                      <div className="w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-xl overflow-hidden shrink-0 border border-slate-50">
                        <img src={item.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="history-item" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[8px] md:text-[11px] font-black text-slate-600 group-hover:text-yt-red transition-colors truncate uppercase tracking-wider">{item.title}</p>
                        <p className="mono-text text-[6px] md:text-[9px] text-slate-300 uppercase font-bold mt-0.5">{item.duration}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
