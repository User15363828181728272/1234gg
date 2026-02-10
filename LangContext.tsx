
import { createContext } from 'react';
import { translations } from './constants.ts';

export type Lang = 'id' | 'en';

export const LangContext = createContext<{ 
  lang: Lang, 
  setLang: (l: Lang) => void, 
  t: typeof translations.id 
}>({
  lang: 'id',
  setLang: () => {},
  t: translations.id
});
