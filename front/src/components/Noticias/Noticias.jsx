import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function Noticias() {
  const { t } = useContext(LanguageContext);
  const [artigos, setArtigos] = useState([]);
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const conseguirNoticias = async () => {
      const apiKey = process.env.REACT_APP_NEWS_API_KEY; 
      const query = `Health`;
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=pt&country=pt&max=6&token=${apiKey}`;

      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Erro ao buscar notícias: " + response.statusText);
        }
        const data = await response.json();
        if (data.articles) {
          setArtigos(data.articles);
        }
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        setErro(true);
      } finally {
        setLoading(false);
      }
    };

    conseguirNoticias();
  }, []); 

  return (
    <section id="noticias" className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="subtitle" data-i18n="noticias_subtitle">
              {t('noticias_subtitle', 'NOTÍCIAS')}
            </span>
            <h2 data-i18n="noticias_title">
              {t('noticias_title', 'Novidades e Artigos')}
            </h2>
          </div>
        </div>
        <div id="apinoticias-container" className="cards-flex">
          {loading && <p>A carregar...</p>}
          
          {erro && !loading && (
            <p>Não foi possível carregar as notícias no momento.</p>
          )}

          {!loading && !erro && artigos.map((article, index) => (
            <article className="news-card" key={index}>
              <img src={article.image} alt={article.title} />
              <h4>{article.title}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{article.source.name}</p>
              <a href={article.url} target="_blank" rel="noreferrer" className="link-blue">
                Saiba mais
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}