
import React, { useState, useEffect, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LangContext } from './LangContext.tsx';
import { translations, APP_NAME } from './constants.ts';
import { fetchVideoData } from './api.ts';

// Components
import { Header } from './Header.tsx';
import { Footer } from './Footer.tsx';
import { Home } from './Home.tsx';
import { FAQ } from './FAQ.tsx';
import { Legal } from './Legal.tsx';
import { AIChat } from './AIChat.tsx';

export function App() {
  const { lang, t } = useContext(LangContext);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'faq' | 'privacy' | 'terms'>('home');
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('soraa_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).filter((v, i) => v !== '00' || i > 0).join(':');
  };

  const handleSearch = async (e?: React.FormEvent, manualUrl?: string) => {
    if (e) e.preventDefault();
    const targetUrl = manualUrl || url;
    if (!targetUrl.trim()) return;

    setIsLoading(true);
    setError(null);
    setVideoInfo(null);
    if (!manualUrl) setUrl(targetUrl);
    setActiveView('home');

    try {
      const result = await fetchVideoData(targetUrl.trim());
      
      const info = {
        vid: result.url.split('v=')[1] || result.url.split('/').pop(),
        title: result.title,
        author: result.author,
        duration: formatDuration(result.duration),
        thumbnail: result.thumbnail,
        medias: result.medias
      };
      
      setVideoInfo(info);
      
      const updatedHistory = [info, ...history.filter(h => h.vid !== info.vid)].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('soraa_history', JSON.stringify(updatedHistory));
    } catch (err: any) {
      setError(err.message || t.errorCORS);
    } finally {
      setIsLoading(false);
    }
  };

  const startDownload = (downloadUrl: string) => {
    // Membuka link download langsung tanpa redirect ke web lain
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-yt-red selection:text-white">
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.012] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-yt-red/[0.04] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-500/[0.03] rounded-full blur-[100px]"></div>
      </div>

      <Header activeView={activeView} setActiveView={setActiveView} appName={APP_NAME} />
      
      <main className="px-4 md:px-8 max-w-7xl mx-auto py-6 md:py-20 min-h-[70vh]">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <Home 
              url={url} setUrl={setUrl} isLoading={isLoading} videoInfo={videoInfo} 
              error={error} activeTab={activeTab} setActiveTab={setActiveTab} 
              convertingVid={null} history={history} handleSearch={handleSearch} 
              startConversion={startDownload} clearHistory={() => { setHistory([]); localStorage.removeItem('soraa_history'); }} 
            />
          )}
          {activeView === 'faq' && <FAQ setActiveView={setActiveView} />}
          {activeView === 'privacy' && <Legal type="privacy" setActiveView={setActiveView} />}
          {activeView === 'terms' && <Legal type="terms" setActiveView={setActiveView} />}
        </AnimatePresence>
      </main>

      <Footer appName={APP_NAME} setActiveView={setActiveView} />
      <AIChat />

      <style>{`
        body { 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          letter-spacing: -0.015em; 
          background-color: #fafafa; 
          -webkit-font-smoothing: antialiased;
        }
        
        h1, h2, h3, h4, .font-heading {
          font-family: 'Bricolage Grotesque', sans-serif;
        }

        .bg-yt-red { background-color: #f43f5e; }
        .text-yt-red { color: #f43f5e; }
        .border-yt-red { border-color: #f43f5e; }
        
        .btn-action {
          position: relative;
          background: #f43f5e;
          color: white;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .btn-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -8px rgba(244, 63, 94, 0.45);
          background: #fb7185;
        }
        .btn-action:active {
          transform: translateY(0);
        }

        .studio-card {
          background: #ffffff;
          border: 1px solid #f0f0f0;
          border-radius: 32px;
          box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.02);
          transition: all 0.4s ease;
        }
        .studio-card:hover {
          box-shadow: 0 30px 60px -25px rgba(0, 0, 0, 0.05);
          border-color: #e5e5e5;
        }

        .mono-text {
          font-family: 'JetBrains Mono', monospace;
        }

        .input-studio {
          background: #fdfdfd;
          border: 1px solid #eeeeee;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-studio:focus-within {
          background: #ffffff;
          border-color: #f43f5e;
          box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.06);
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scanline {
          width: 100%;
          height: 1px;
          background: rgba(244, 63, 94, 0.05);
          position: absolute;
          top: 0;
          animation: scanline 10s linear infinite;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #fafafa;
        }
        ::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 20px;
          border: 2px solid #fafafa;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #d4d4d4;
        }

        @media (max-width: 640px) {
          .studio-card {
            border-radius: 24px;
          }
        }
      `}</style>
    </div>
  );
}
