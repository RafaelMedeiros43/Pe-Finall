import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const EventosContext = createContext(null);

export function EventosProvider({ children }) {
  const [eventos, setEventos] = useState([]);

  const carregarEventos = useCallback(async () => {
    try {
      const resposta = await fetch('http://localhost:5000/api/event/all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (resposta.ok) {
          const dados = await resposta.json();
          setEventos(dados)
      } else {
        console.error('Erro do servidor ao carregar eventos');
      }
    } catch (error) {
      console.error('Erro de ligação ao servidor:', error);
    }
  }, []);

  useEffect(() => {
    carregarEventos();
  }, [carregarEventos]);

  const salvarEvento = useCallback(async (evento) => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = localStorage.getItem('token');
        
        const isEdicao = !!evento.id;
        
        const url = isEdicao 
          ? `http://localhost:5000/api/event/update/:${evento.id}`
          : `http://localhost:5000/api/event/create`;
          
        const method = isEdicao ? 'PUT' : 'POST';

        const resposta = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(evento)
        });

        if (resposta.ok) {
          await carregarEventos()
        } else {
          const erro = await resposta.json();
          reject(new Error(erro.message || 'Erro ao guardar evento'));
        }
      } catch (error) {
        console.error('Erro ao salvar evento:', error);
        reject(error);
      }
    });
  }, [carregarEventos]);

  const removerEvento = useCallback(async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const token = localStorage.getItem('token');
        
        const resposta = await fetch(`http://localhost:5000/api/event/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        if (resposta.ok) {
          await carregarEventos()
          resolve();
        } else {
          const erro = await resposta.json();
          reject(new Error(erro.message || 'Erro ao remover evento'))
        }
      } catch (error) {
        console.error('Erro ao remover evento:', error);
        reject(error);
      }
    });
  }, [carregarEventos]);

  return (
    <EventosContext.Provider value={{ eventos, salvarEvento, removerEvento, carregarEventos }}>
      {children}
    </EventosContext.Provider>
  );
}

export function useEventosDB() {
  const context = useContext(EventosContext);
  if (!context) {
    throw new Error('useEventosDB deve ser usado dentro de um EventosProvider');
  }
  return context;
}