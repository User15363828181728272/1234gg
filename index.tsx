
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LangContext, Lang } from './LangContext.tsx';
import { translations } from './constants.ts';
import { App } from './App.tsx';

function Root() {
  const [lang, setLang] = useState<Lang>('id');

  useEffect(() => {
    const savedLang = localStorage.getItem('soraa_lang') as Lang;
    if (savedLang) setLang(savedLang);
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('soraa_lang', l);
  };

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang: changeLang, t }}>
      <App />
    </LangContext.Provider>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Root />);
}
