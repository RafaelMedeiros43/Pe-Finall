import React, { useEffect, useRef, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function Localizacao() {
  const { t } = useContext(LanguageContext);
  const mapRef = useRef(null);
  
  const isMapInitialized = useRef(false);

  useEffect(() => {
    // Função global que a API do Google Maps vai chamar quando carregar
    window.initMap = () => {
      if (isMapInitialized.current) return;
      
      const uac = { lat: 37.74634, lng: -25.66380 };
      
      if (mapRef.current) {
        // Cria o mapa
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 15, 
          center: uac
        });
        
        // Cria o marcador
        new window.google.maps.Marker({
          position: uac, 
          map: map
        });

        isMapInitialized.current = true;
      }
    };

    const loadGoogleMapsAPI = () => {
      //Vai buscar a chave ao config
      const apiKey = typeof window !== 'undefined' && window.CONFIG ? window.CONFIG.GOOGLE_MAPS_API_KEY : '';
      
      if (!apiKey) {
        console.error("Google Maps API key não foi encontrada no config.js");
        return;
      }

      // Faz com que nao dei para adicionar o script várias vezes
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        if (window.google && window.google.maps) {
           window.initMap();
        }
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    loadGoogleMapsAPI();

    return () => {
      window.initMap = undefined;
    };
  }, []);

  return (
    <section id="Localizacao" className="section">
      <div className="container">
        <div className="section-header">
          <span className="subtitle" data-i18n="localizacao_subtitle">
            {t('localizacao_subtitle', 'LOCALIZAÇÃO')}
          </span>
          <h2 data-i18n="localizacao_title">
            {t('localizacao_title', 'Onde estamos?')}
          </h2>
        </div>
        <div className="map-container">
          <div id="googlemap" className="map" ref={mapRef}></div>
        </div>
      </div>
    </section>
  );
}