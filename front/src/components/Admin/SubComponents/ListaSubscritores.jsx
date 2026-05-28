import React, { useContext } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { useNewsletterDB } from '../../../contexts/NewsletterContext'

export default function ListaSubscritores() {
  const { t } = useContext(LanguageContext);
  const { subscribers, exportarSubscritoresCSV } = useNewsletterDB();

  return (
    <div className="admin-subscribers-container">
      <h3>{t('admin_newsletter_title', 'Subscritores da Newsletter')}</h3>
      <div className="admin-events-list">
        {subscribers.length === 0 ? (
          <p>{t('admin_no_subscribers', 'Nenhum subscritor ainda.')}</p>
        ) : (
          subscribers.map((sub, idx) => (
            <div className="admin-event-item" key={idx}>
              <div className="admin-event-info">
                <strong>{sub.nome}</strong><br />
                {sub.email}<br />
                {sub.telefone || t('admin_no_phone', 'sem telefone')}
              </div>
            </div>
          ))
        )}
      </div>
      <button className="btn btn-secondary" onClick={exportarSubscritoresCSV}>
        {t('admin_export_btn', 'Exportar (CSV)')}
      </button>
    </div>
  );
}