import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function AutenticationFooter() {
  const { t } = useContext(LanguageContext);

  

  return (
    <footer id="contactos" className="footer">
      <div className="container autentication-footer-flex">
        
        {/* Contactos */}
        <div className="autentication-footer-col">
          <h5 data-i18n="footer_contactos">{t('footer_contactos', 'Contactos')}</h5>
          <p><strong data-i18n="footer_email_label">{t('footer_email_label', 'E-mail:')}</strong> cac-a@uac.pt</p>
          <p><strong data-i18n="footer_telefone_label">{t('footer_telefone_label', 'Tel:')}</strong> (+351) 296 965 824</p>
          <p className="small" data-i18n="footer_horario">{t('footer_horario', '(dias úteis das 11:00 às 18:00)')}</p>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook | </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram | </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">Youtube</a>
          </div>
        </div>

        {/* Morada */}
        <div className="autentication-footer-col">
          <h5 data-i18n="footer_morada">{t('footer_morada', 'Morada')}</h5>
          <p data-i18n="footer_universidade">{t('footer_universidade', 'Universidade dos Açores')}</p>
          <p data-i18n="footer_polo">{t('footer_polo', 'Polo São Miguel')}</p>
          <p data-i18n="footer_rua">{t('footer_rua', 'R. Mãe de Deus')}</p>
          <p data-i18n="footer_cidade">{t('footer_cidade', '9500-321 Ponta Delgada')}</p>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p>
          &copy; 2026 Centro Académico Clínico dos Açores. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}