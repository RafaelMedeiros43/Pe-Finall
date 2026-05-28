import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useEventosDB } from '../../contexts/EventosContext';

export default function Eventos() {
  const { t } = useContext(LanguageContext);
  const { eventos } = useEventosDB();
  
  
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // Estados do carrossel
  const [eventIndex, setEventIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

  // Função para medir o layout e guardar as dimensões no state
  const updateDimensions = useCallback(() => {
    if (!trackRef.current || !wrapperRef.current) return;
    
    const firstCard = trackRef.current.querySelector('.event-card');
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(trackRef.current).gap) || 0;
    
    setSlideWidth(cardWidth + gap);
    setMaxTranslate(Math.max(0, trackRef.current.scrollWidth - wrapperRef.current.offsetWidth));
  }, []);

  useEffect(() => {
  
    const timeoutId = setTimeout(() => {
      updateDimensions();
    }, 100);

    window.addEventListener('resize', updateDimensions);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions, eventos]);


  const handleNext = () => {
    if (eventIndex * slideWidth < maxTranslate) {
      setEventIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (eventIndex > 0) {
      setEventIndex((prevIndex) => prevIndex - 1);
    }
  };

  let currentTranslateX = eventIndex * slideWidth;
  if (currentTranslateX > maxTranslate) {
    currentTranslateX = maxTranslate;
  }

  return (
    <section id="eventos" className="section">
      <div className="container">
        <div className="section-header">
          <span className="subtitle" data-i18n="eventos_subtitle">
            {t('eventos_subtitle', 'EVENTOS')}
          </span>
          <h2 data-i18n="eventos_title">
            {t('eventos_title', 'Próximos eventos')}
          </h2>
        </div>
        
        <div className="events-carousel-container">
          <div className="events-mask" ref={wrapperRef}>
            
            <div 
              className="events-track" 
              id="dynamic-events-track" 
              ref={trackRef}
              style={{ 
                transform: `translateX(-${currentTranslateX}px)`,
                transition: 'transform 0.4s ease-in-out' 
              }}
            >
              {eventos.map((evento) => {
                const dataParts = evento.data.split('-');
                const dia = parseInt(dataParts[2], 10);
                const mes = meses[parseInt(dataParts[1], 10) - 1];

                return (
                  <article className="card event-card" key={evento.id}>
                    <div className="card-image">
                      <img src={evento.imagem} alt={`Cartaz do evento: ${evento.titulo}`} />
                      <div className="date-badge">
                        <span className="day">{dia}</span>
                        <span className="month">{mes}</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <h4>{evento.titulo}</h4>
                      
                      <p className="meta">
                        {evento.clima && (
                          <>
                            <img className="weather-badge" src={evento.clima.icon} alt="Clima" />
                            <span>{evento.clima.temp} - {evento.clima.desc}</span>
                          </>
                        )}
                      </p>
                      
                      <p className="meta">🕒 <span>{evento.hora}</span></p>
                      <p className="meta">📍 <span>{evento.local}</span></p>
                    </div>
                  </article>
                );
              })}
            </div>
            
          </div>
          <button 
            id="event-prev" 
            className="carrousel-btn event-nav-btn prev-btn" 
            aria-label="Evento Anterior"
            onClick={handlePrev}
          >
            &#10094;
          </button>
          <button 
            id="event-next" 
            className="carrousel-btn event-nav-btn next-btn" 
            aria-label="Próximo Evento"
            onClick={handleNext}
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
}