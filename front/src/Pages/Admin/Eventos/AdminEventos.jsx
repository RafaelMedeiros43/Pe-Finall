import React, { useContext, useState } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';

import EventForm from '../../../components/Admin/SubComponents/EventForm';
import EventList from '../../../components/Admin/SubComponents/EventList';
import ListaSubscritores from '../../../components/Admin/SubComponents/ListaSubscritores';
import styles from './AdminEventos.module.css';

export default function AdminEventos() {
  const { t } = useContext(LanguageContext);
  const [eventoParaEditar, setEventoParaEditar] = useState(null);

  const handleEditRequest = (evento) => {
    setEventoParaEditar(evento);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrapper}>
      
      <div className={styles.header}>
        <span className={styles.subtitle}>
          {t('admin_subtitle', 'ADMINISTRAÇÃO')}
        </span>
        <h1 className={styles.title}>
          {t('admin_title', 'Gestão de Eventos')}
        </h1>
        <p className={styles.description}>
          Cria novos eventos, edita os existentes e acompanha os subscritores.
        </p>
      </div>

     
      <div className="admin-grid">
        
        <EventForm 
          eventoParaEditar={eventoParaEditar} 
          limparEdicao={() => setEventoParaEditar(null)} 
        />

        <EventList 
          onEdit={handleEditRequest} 
        />
        
      </div>

      <hr className={styles.separator} />

      <ListaSubscritores />

    </div>
  );
}