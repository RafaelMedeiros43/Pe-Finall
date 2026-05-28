import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
export default function ScrollToTopButton() {
  const { t } = useContext(LanguageContext);
  const [scrollState, setScrollState] = useState({ visible: false, nearBottom: false });

  useEffect(() => {
    const handleScroll = () => {
      const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
      
      // Prevenção de divisão por zero se a página for mais pequena que o ecrã
      if (alturaTotal <= 0) return;
      
      const percentagemScroll = (window.scrollY / alturaTotal) * 100;
      
      setScrollState({
        visible: percentagemScroll > 10,
        nearBottom: percentagemScroll > 90
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const voltarAoTopo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return scrollState.visible ? (
    <button 
      id="to-top" 
      className="btn btn-primary" 
      title={t('to_top_title', 'Voltar ao Topo')}
      onClick={voltarAoTopo}
      style={{
        display: 'block',
        backgroundColor: scrollState.nearBottom ? 'white' : 'var(--accent-color)',
        color: scrollState.nearBottom ? 'black' : 'white'
      }}
    >
      {t('to_top_title', 'Voltar ao Topo')}
    </button>
  ) : null;
}