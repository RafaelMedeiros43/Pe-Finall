import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const EventosContext = createContext(null);

export function EventosProvider({ children }) {
  const [db, setDb] = useState(null);
  const [eventos, setEventos] = useState([]);

  const carregarEventos = useCallback((databaseInstance) => {
    const currentDb = databaseInstance || db;
    if (!currentDb) return;
    const transaction = currentDb.transaction('eventos', 'readonly');
    const store = transaction.objectStore('eventos');
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = function() {
        setEventos(getAllRequest.result);
        window.dispatchEvent(new Event('loadedEvents'));
    };
  }, [db]);

  useEffect(() => {
    if (db) return; 

    const request = indexedDB.open("EventosDB", 2);

    request.onerror = function (event) {
        console.error('Erro ao abrir a IndexedDB', event);
    };

    request.onupgradeneeded = function(event) {
        const database = event.target.result;
        if (!database.objectStoreNames.contains('eventos')) {
            const store = database.createObjectStore('eventos', { keyPath: 'id', autoIncrement: true });
            store.createIndex('titulo', 'titulo', { unique: false });
            store.createIndex('descricao', 'descricao', { unique: false });
            store.createIndex('data', 'data', { unique: false });
            store.createIndex('hora', 'hora', { unique: false });
            store.createIndex('local', 'local', { unique: false });
        }    
    };

    request.onsuccess = function() {
        const database = request.result;
        setDb(database);

        const transaction = database.transaction('eventos', 'readwrite');
        const store = transaction.objectStore('eventos');
        const countRequest = store.count();

        countRequest.onsuccess = function() {
            if (countRequest.result === 0) {
                const writeTransaction = database.transaction('eventos', 'readwrite');
                const writeStore = writeTransaction.objectStore('eventos');
                
                const initialData = [
                    { titulo: "Comemorações do 7º aniversário da ESS na UAc", descricao: "Celebração do aniversário com diversas atividades.", data: "2026-05-06", hora: "14:00 - 16:00", local: "Auditório Norte", imagem: "media/evento1.png" },
                    { titulo: "Open day 2026 | Enfermagem", descricao: "Dia aberto para apresentar o curso de Enfermagem.", data: "2026-05-30", hora: "09:00 - 12:00", local: "Campus de Angra do Heroísmo", imagem: "media/evento2.jpg" },
                    { titulo: "V Congresso Internacional Enfermagem", descricao: "Congresso internacional com a presença de especialistas.", data: "2026-10-28", hora: "10:00 - 13:00", local: "Auditório Norte", imagem: "media/evento3.jpg" }
                ];

                initialData.forEach(item => writeStore.put(item));
                
                writeTransaction.oncomplete = function() {
                    carregarEventos(database);
                };
            } else {
                carregarEventos(database);
            }
        };
    };
  }, [carregarEventos, db]); 

  const salvarEvento = useCallback((evento) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Base de dados não inicializada'));
        return;
      }
      const transaction = db.transaction('eventos', 'readwrite');
      const store = transaction.objectStore('eventos');
      store.put(evento);

      transaction.oncomplete = function() {
          carregarEventos(db);
          resolve();
      };

      transaction.onerror = function() {
        reject(new Error('Erro ao guardar evento'));
      };
    });
  }, [db, carregarEventos]);

  const removerEvento = useCallback((id) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Base de dados não inicializada'));
        return;
      }
      const transaction = db.transaction('eventos', 'readwrite');
      const store = transaction.objectStore('eventos');
      store.delete(id);

      transaction.oncomplete = function() {
          carregarEventos(db);
          resolve();
      };

      transaction.onerror = function() {
        reject(new Error('Erro ao remover evento'));
      };
    });
  }, [db, carregarEventos]);

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