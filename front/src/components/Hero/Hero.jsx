import React, { useState, useContext, useRef } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function Hero() {
  const { t } = useContext(LanguageContext);
  const imagens = ["media/hero.png", "media/evento1.png", "media/sobre_nos.png"];
  
  const [indiceAtual, setIndiceAtual] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef(null);

  // Botão Next
  const mudarImagemNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndiceAtual((prev) => prev + 1);
  };

  // Botão Prev
  const mudarImagemPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndiceAtual((prev) => prev - 1);
  };


  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // Se chegou ao clone inicial
    if (indiceAtual >= imagens.length + 1) {
      setIndiceAtual(1);
    }
    // Se chegou ao clone final
    else if (indiceAtual <= 0) {
      setIndiceAtual(imagens.length);
    }
  };

  return (
    <section id="hero" className="hero">
      <div 
        id="carousel-track" 
        className="carousel-track" 
        ref={trackRef}
        onTransitionEnd={handleTransitionEnd}
        style={{ 
          transform: `translateX(-${indiceAtual * 100}%)`,
          transition: (indiceAtual === 0 || indiceAtual === imagens.length + 1) && !isTransitioning 
                        ? 'none' 
                        : 'transform 0.5s ease-in-out'
        }}
      >
        {/* Clone Last (Para efeito loop) */}
        <div className="carousel-slide" style={{ backgroundImage: `url('${imagens[imagens.length - 1]}')` }} id="last-clone"></div>
        
        {/* Imagens Reais */}
        {imagens.map((img, index) => (
          <div key={index} className="carousel-slide" style={{ backgroundImage: `url('${img}')` }}></div>
        ))}
        
        {/* Clone First (Para efeito loop) */}
        <div className="carousel-slide" style={{ backgroundImage: `url('${imagens[0]}')` }} id="first-clone"></div>
      </div>
      
      <div className="hero-controls">
        <button id="prev" className="carrousel-btn" onClick={mudarImagemPrev}>&#8249;</button>
        <button id="forward" className="carrousel-btn" onClick={mudarImagemNext}>&#8250;</button>
      </div>
      
      <div className="hero-overlay">
        <div className="container hero-content">
          <h1 data-i18n="hero_title">{t('hero_title', 'Centro Académico Clínico dos Açores')}</h1>
          <p data-i18n="hero_text">{t('hero_text', 'Excelência clínica com estreita integração entre prática clínica, educação e investigação.')}</p>
          <a href="#contactos" className="btn btn-primary" data-i18n="hero_btn">{t('hero_btn', 'Junta-te a nós')}</a>
        </div>
      </div>
    </section>
  );
}