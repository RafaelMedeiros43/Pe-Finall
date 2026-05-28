import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function Services() {
  const { t } = useContext(LanguageContext);

  return (
    <section id="servicos" className="section">
      <div className="container">
        <div className="section-header">
          <span className="subtitle" data-i18n="servicos_subtitle">{t('servicos_subtitle', 'SERVIÇOS')}</span>
          <h2 data-i18n="servicos_title">{t('servicos_title', 'Explore os nossos serviços')}</h2>
        </div>
        <div className="cards-flex">
          <article className="card service-card">
            <div className="card-icon">🎓</div>
            <h3 data-i18n="ensino_title">{t('ensino_title', 'Ensino')}</h3>
            <div className="service-card-details">
              <p data-i18n="ensino_text">{t('ensino_text', 'Promovemos a formação académica e profissional de excelência.')}</p>
              <a href="#sobre" className="btn-text" data-i18n="ensino_btn">{t('ensino_btn', 'Saber mais →')}</a>
            </div>
          </article>
          
          <article className="card service-card">
            <div className="card-icon">🧬</div>
            <h3 data-i18n="investigacao_title">{t('investigacao_title', 'Investigação')}</h3>
            <div className="service-card-details">
              <p data-i18n="investigacao_text">{t('investigacao_text', 'Desenvolvemos ciência para melhorar os cuidados de saúde.')}</p>
              <a href="#sobre" className="btn-text" data-i18n="investigacao_btn">{t('investigacao_btn', 'Saber mais →')}</a>
            </div>
          </article>
          
          <article className="card service-card">
            <div className="card-icon">🩺</div>
            <h3 data-i18n="pratica_title">{t('pratica_title', 'Prática Clínica')}</h3>
            <div className="service-card-details">
              <p data-i18n="pratica_text">{t('pratica_text', 'Prestamos cuidados de saúde diferenciados e inovadores.')}</p>
              <a href="#sobre" className="btn-text" data-i18n="pratica_btn">{t('pratica_btn', 'Saber mais →')}</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}