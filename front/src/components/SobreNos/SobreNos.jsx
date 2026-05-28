import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function About() {
  const { t } = useContext(LanguageContext);

  return (
    <section id="sobre" className="section">
      <div className="container about-flex">
        <div className="about-text">
          <span className="subtitle" data-i18n="sobre_subtitle">{t('sobre_subtitle', 'SOBRE NÓS')}</span>
          <h2 data-i18n="sobre_title">{t('sobre_title', 'Centro Académico Clínico')}</h2>
          <p data-i18n="sobre_text">
            {t('sobre_text', 'O Centro Académico Clínico dos Açores nasce da parceria entre o Governo Regional e a Universidade dos Açores para potenciar o setor da saúde no arquipélago. Unimos o saber académico à realidade hospitalar, promovendo a investigação e a formação contínua de profissionais e estudantes. O nosso foco é claro: inovação científica aplicada para garantir o bem-estar e a melhor qualidade de vida dos nossos doentes.')}
          </p>
        </div>
        <div className="about-image">
          <img src="media/sobre_nos.png" alt="Médicos em reunião" />
        </div>
      </div>
    </section>
  );
}