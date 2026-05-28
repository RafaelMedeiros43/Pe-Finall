import React, { useContext } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { useEventosDB } from '../../../contexts/EventosContext';
import { useToast } from '../../../contexts/ToastContext';

export default function EventList({ onEdit }) {
  const { t } = useContext(LanguageContext);
  const { eventos, removerEvento } = useEventosDB();
  const { show: showToast } = useToast();

  const handleDelete = async (eventoId) => {
    try {
      await removerEvento(eventoId);
      showToast(t('admin_event_deleted', 'Evento eliminado com sucesso!'), 'success');
    } catch (err) {
      console.error('Erro ao eliminar evento:', err);
      showToast(t('admin_event_delete_error', 'Erro ao eliminar evento.'), 'error');
    }
  };

  return (
    <div className="admin-list-container">
      <h3>{t('admin_current_events', 'Eventos Atuais')}</h3>
      <div className="admin-events-list">
        {eventos.map(evento => (
          <div className="admin-event-item" key={evento.id}>
            <div className="admin-event-info">
              <h4>{evento.titulo}</h4>
              <p>{evento.data} | {evento.local}</p>
            </div>
            <div className="admin-item-actions">
              <button className="btn-sm btn-edit" onClick={() => onEdit(evento)}>Editar</button>
              <button className="btn-sm btn-delete" onClick={() => handleDelete(evento.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}