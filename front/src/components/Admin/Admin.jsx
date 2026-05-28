import React, { useContext, useRef, useEffect, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useAdminPanel } from '../../contexts/AdminPanelContext';

import EventForm from '../Admin/SubComponents/EventForm';
import EventList from '../Admin/SubComponents/EventList';
import ListaSubscritores from '../Admin/SubComponents/ListaSubscritores';

export default function Admin() {
  const { t } = useContext(LanguageContext);
  const { showAdmin, setShowAdmin } = useAdminPanel();
  const adminRef = useRef(null);
  
  // Estado partilhado: A lista diz qual evento editar, o formulário recebe-o
  const [eventoParaEditar, setEventoParaEditar] = useState(null);

  // Efeito de scroll quando o painel abre
  useEffect(() => {
    if (showAdmin && adminRef.current) {
      adminRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showAdmin]);

  // Função chamada pela lista de eventos
  const handleEditRequest = (evento) => {
    setEventoParaEditar(evento);
    setShowAdmin(true); // Garante que o painel está aberto
    if (adminRef.current) {
      adminRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="admin-section" ref={adminRef} className={`section admin-only ${showAdmin ? 'show' : ''}`}>
      <div className="container">
        <div className="section-header">
          <span className="subtitle">{t('admin_subtitle', 'ADMINISTRAÇÃO')}</span>
          <h2>{t('admin_title', 'Gestão de Eventos')}</h2>
        </div>
        
        <div className="admin-grid">
          {/* Formulário */}
          <EventForm 
            eventoParaEditar={eventoParaEditar} 
            limparEdicao={() => setEventoParaEditar(null)} 
          />

          {/* Lista de Eventos */}
          <EventList 
            onEdit={handleEditRequest} 
          />
        </div>
        
        {/* Lista de Subscritores */}
        <ListaSubscritores />
      </div>
    </section>
  );
}