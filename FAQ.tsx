
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { X, HelpCircle, Zap, Shield, Smartphone, Globe, AlertCircle, Clock, Video, Download } from 'lucide-react';
import { LangContext } from './LangContext.tsx';

interface FAQProps {
  setActiveView: (view: any) => void;
}

export const FAQ: React.FC<FAQProps> = ({ setActiveView }) => {
  const { lang } = useContext(LangContext);
  
  const faqs = lang === 'id' ? [
    { 
      q: "Apakah Ytdown Soraa benar-benar gratis?", 
      a: "Ya, 100% gratis selamanya. Kami tidak meminta pendaftaran, detail kartu kredit, atau langganan apa pun. Model bisnis kami didukung oleh efisiensi infrastruktur dan kemitraan strategis.",
      icon: <Zap size={20} />
    },
    { 
      q: "Format apa saja yang didukung?", 
      a: "Kami mendukung MP4 video (kualitas dari 360p hingga 4K UHD), MP3 audio (bitrate tinggi hingga 320kbps), dan format WEBM untuk kompatibilitas browser modern.",
      icon: <Globe size={20} />
    },
    { 
      q: "Berapa banyak video yang bisa saya unduh?", 
      a: "Tidak ada batasan harian. Anda bisa mengunduh sebanyak yang Anda inginkan selama server kami tersedia. Kami tidak membatasi kuota pengguna individu guna memastikan aksesibilitas maksimal.",
      icon: <Zap size={20} />
    },
    { 
      q: "Apakah data saya aman?", 
      a: "Kami mengutamakan privasi. Kami tidak menyimpan riwayat unduhan, log pencarian, atau alamat IP pengguna. Semua proses ekstraksi bersifat sementara di memori server dan langsung dihapus setelah sesi berakhir.",
      icon: <Shield size={20} />
    },
    { 
      q: "Kenapa tombol unduh tidak muncul?", 
      a: "Pastikan link yang Anda masukkan adalah URL YouTube yang valid. Jika video diproteksi atau bersifat privat, sistem kami tidak dapat mengaksesnya. Coba muat ulang halaman atau periksa koneksi internet Anda.",
      icon: <AlertCircle size={20} />
    },
    { 
      q: "Apakah bisa digunakan di iPhone?", 
      a: "Sangat bisa. Gunakan browser Safari di iPhone/iPad (iOS 13+). Masukkan link, klik download, dan ketika file siap, Safari akan menampilkan dialog konfirmasi penyimpanan file ke aplikasi 'Files'.",
      icon: <Smartphone size={20} />
    },
    { 
      q: "Dapatkah saya mengunduh video Shorts?", 
      a: "Ya, Ytdown Soraa mendukung penuh video Shorts. Cukup salin link dari aplikasi YouTube Shorts dan tempelkan di kolom pencarian kami seperti biasa.",
      icon: <Video size={20} />
    },
    { 
      q: "Apakah konversi video ke MP3 memakan waktu lama?", 
      a: "Sistem kami menggunakan algoritma multi-threading yang memungkinkan konversi MP3 320kbps selesai dalam hitungan detik untuk durasi video standar (di bawah 10 menit).",
      icon: <Clock size={20} />
    },
    {
      q: "Kenapa kecepatan unduh saya lambat?",
      a: "Kecepatan unduh bergantung pada server YouTube dan penyedia layanan internet (ISP) Anda. Gunakan koneksi yang stabil untuk hasil terbaik.",
      icon: <Download size={20} />
    },
    {
      q: "Dapatkah saya mengunduh Playlist?",
      a: "Saat ini kami fokus pada ekstraksi video tunggal untuk menjamin kecepatan. Fitur unduhan playlist sedang dalam tahap pengembangan.",
      icon: <HelpCircle size={20} />
    }
  ] : [
    { 
      q: "Is Ytdown Soraa really free?", 
      a: "Yes, 100% free forever. We do not require registration, credit card details, or any subscriptions. Our service is powered by highly efficient infrastructure.",
      icon: <Zap size={20} />
    },
    { 
      q: "Which formats are supported?", 
      a: "We support MP4 video (ranging from 360p to 4K UHD), MP3 audio (high bitrate up to 320kbps), and WEBM formats for modern browser compatibility.",
      icon: <Globe size={20} />
    },
    { 
      q: "How many videos can I download?", 
      a: "There are no daily limits. You can download as many as you want as long as our servers are reachable. We do not impose quotas on individual users.",
      icon: <Zap size={20} />
    },
    { 
      q: "Is my data safe?", 
      a: "Privacy is our priority. We do not store download history, search logs, or user IP addresses. All extraction processes are ephemeral in server memory.",
      icon: <Shield size={20} />
    },
    { 
      q: "Why is the download button not appearing?", 
      a: "Make sure the link you entered is a valid YouTube URL. Private or age-restricted videos may not be accessible. Try refreshing the page or checking your connection.",
      icon: <AlertCircle size={20} />
    },
    { 
      q: "Can it be used on iPhone?", 
      a: "Absolutely. Use the Safari browser on your iPhone/iPad (iOS 13+). Paste the link, click download, and Safari will show a save confirmation to your 'Files' app.",
      icon: <Smartphone size={20} />
    },
    { 
      q: "Can I download Shorts videos?", 
      a: "Yes, Ytdown Soraa fully supports YouTube Shorts. Simply copy the link from the Shorts app and paste it into our search bar as usual.",
      icon: <Video size={20} />
    },
    { 
      q: "Does converting video to MP3 take long?", 
      a: "Our system uses multi-threading algorithms that allow 320kbps MP3 conversions to finish in seconds for standard length videos (under 10 minutes).",
      icon: <Clock size={20} />
    },
    {
      q: "Why is my download speed slow?",
      a: "Download speed depends on YouTube's servers and your internet service provider (ISP). Use a stable connection for the best results.",
      icon: <Download size={20} />
    },
    {
      q: "Can I download Playlists?",
      a: "Currently, we focus on single video extraction to ensure speed. Playlist download features are currently in the development stage.",
      icon: <HelpCircle size={20} />
    }
  ];

  return (
    <motion.div {...({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } } as any)} className="max-w-4xl mx-auto py-6 space-y-10">
      <div className="flex items-center justify-between px-4 md:px-0">
        <div className="space-y-1">
           <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111]">{lang === 'id' ? 'FAQ & Bantuan' : 'FAQ & Support'}</h2>
           <p className="text-sm md:text-base text-gray-400 font-medium">{lang === 'id' ? 'Jawaban lengkap untuk mempermudah pengalaman Anda.' : 'Comprehensive answers to enhance your experience.'}</p>
        </div>
        <button onClick={() => setActiveView('home')} className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:text-yt-red transition-all">
          <X size={20} />
        </button>
      </div>
      
      <div className="grid gap-6 px-4 md:px-0">
        {faqs.map((item, i) => (
          <motion.div 
            key={i} 
            {...({ 
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.05 }
            } as any)}
            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-yt-red/5 text-yt-red rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-yt-red group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div className="space-y-3">
                <h4 className="text-lg md:text-xl font-bold text-[#111] leading-snug">{item.q}</h4>
                <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">{item.a}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 text-center space-y-4 mx-4 md:mx-0">
        <h4 className="text-xl font-bold text-[#111]">{lang === 'id' ? 'Masih Butuh Bantuan?' : 'Still Need Help?'}</h4>
        <p className="text-gray-500 text-sm max-w-md mx-auto">{lang === 'id' ? 'Tim support kami siap membantu Anda melalui WhatsApp atau Email.' : 'Our support team is ready to help you via WhatsApp or Email.'}</p>
        <div className="flex justify-center gap-4 pt-4">
          <a href="https://wa.me/6288242449961" className="px-8 py-3 bg-[#111] text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-yt-red transition-all">WhatsApp</a>
          <a href="mailto:depstoreku@gmail.com" className="px-8 py-3 bg-white border border-gray-200 text-[#111] text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-100 transition-all">Email Support</a>
        </div>
      </div>
    </motion.div>
  );
};
