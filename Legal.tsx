
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { X, Shield, FileText, CheckCircle, Info, Lock, Globe, Copyright, AlertCircle, Scale, Terminal } from 'lucide-react';
import { LangContext } from './LangContext.tsx';

interface LegalProps {
  type: 'privacy' | 'terms';
  setActiveView: (view: any) => void;
}

export const Legal: React.FC<LegalProps> = ({ type, setActiveView }) => {
  const { lang } = useContext(LangContext);
  const isPrivacy = type === 'privacy';
  
  return (
    <motion.div {...({ initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 } } as any)} className="max-w-4xl mx-auto py-10 space-y-12 px-4">
      <div className="space-y-4">
        <button onClick={() => setActiveView('home')} className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.4em] text-black/30 hover:text-black flex items-center gap-2 transition-colors">
          <X size={14} /> {lang === 'id' ? 'KEMBALI KE BERANDA' : 'RETURN HOME'}
        </button>
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase text-[#111]">
          {isPrivacy ? (lang === 'id' ? 'Kebijakan Privasi.' : 'Privacy Policy.') : (lang === 'id' ? 'Ketentuan Layanan.' : 'Terms of Service.')}
        </h2>
      </div>

      <div className="bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-gray-100 text-gray-500 text-sm md:text-base leading-relaxed space-y-12 shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-14 h-14 md:w-20 md:h-20 bg-[#111] text-white rounded-2xl md:rounded-[2.5rem] flex items-center justify-center">
            {isPrivacy ? <Shield size={32} /> : <FileText size={32} />}
          </div>
          <div>
            <h4 className="font-bold text-[#111] uppercase tracking-[0.2em] text-[10px] md:text-xs">Last Updated</h4>
            <p className="text-[12px] md:text-[14px] uppercase font-black text-yt-red">October 2024 • Soraa Compliance Team</p>
          </div>
        </div>

        {isPrivacy ? (
          <div className="space-y-10">
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-[#111] flex items-center gap-3"><Lock size={20} className="text-yt-red"/> {lang === 'id' ? '1. Komitmen Privasi' : '1. Privacy Commitment'}</h3>
              <p>{lang === 'id' ? 'Kami di Ytdown Soraa sangat serius dalam menjaga privasi digital Anda. Layanan kami dirancang dengan prinsip "Privacy by Design" di mana kami meminimalkan pengumpulan data untuk menjamin anonimitas mutlak.' : 'At Ytdown Soraa, we take your digital privacy seriously. Our service is built on the "Privacy by Design" principle, where we minimize data collection to guarantee absolute anonymity.'}</p>
            </section>
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-[#111] flex items-center gap-3"><Globe size={20} className="text-yt-red"/> {lang === 'id' ? '2. Pengumpulan Data' : '2. Data Collection'}</h3>
              <ul className="space-y-3 list-none">
                {[
                  lang === 'id' ? 'Kami tidak menyimpan riwayat link video yang Anda masukkan.' : 'We do not store the history of video links you enter.',
                  lang === 'id' ? 'Kami tidak mencatat alamat IP atau informasi browser Anda.' : 'We do not log your IP address or browser information.',
                  lang === 'id' ? 'Semua cache konversi dihapus segera setelah proses selesai.' : 'All conversion caches are deleted immediately after the process is complete.'
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start"><CheckCircle size={18} className="text-green-500 shrink-0 mt-1" /> {item}</li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <div className="space-y-10">
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-[#111] flex items-center gap-3"><Scale size={20} className="text-yt-red"/> {lang === 'id' ? '1. Penerimaan Ketentuan' : '1. Acceptance of Terms'}</h3>
              <p>{lang === 'id' ? 'Dengan mengakses situs web ini, Anda setuju untuk mematuhi Ketentuan Layanan ini secara penuh.' : 'By accessing this website, you agree to comply with these Terms of Service in full.'}</p>
            </section>
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-[#111] flex items-center gap-3"><Copyright size={20} className="text-yt-red"/> {lang === 'id' ? '2. Hak Cipta' : '2. Copyright'}</h3>
              <p>{lang === 'id' ? 'Alat ini hanya boleh digunakan untuk mengunduh konten yang bersifat publik atau milik Anda sendiri.' : 'This tool should only be used to download public content or your own content.'}</p>
            </section>
          </div>
        )}

        <div className="pt-10 border-t border-gray-100 flex flex-col items-center space-y-4 text-center">
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gray-300">Ytdown Soraa • depstoreku@gmail.com</p>
           <div className="flex gap-6">
              <a href="mailto:depstoreku@gmail.com" className="text-xs font-black uppercase text-yt-red hover:underline">depstoreku@gmail.com</a>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
