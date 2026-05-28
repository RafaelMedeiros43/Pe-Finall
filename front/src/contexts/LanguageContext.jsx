import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'; 

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const getDefaultLang = () => {
    if (typeof window === 'undefined' || !navigator) return 'pt';
    
    const browserLang = navigator.language.slice(0, 2);
    if (['en', 'es', 'fr', 'de'].includes(browserLang)) return browserLang;
    return 'pt';
  };

  const [lang, setLang] = useLocalStorage('preferredLang', getDefaultLang());

  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/lang/${lang}.json`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        setTranslations(data);
        
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
      } catch (error) {
        console.warn('Erro ao carregar ficheiro i18n:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, [lang]);

  const t = (key, fallback = '') => {
    return translations[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, translations, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};