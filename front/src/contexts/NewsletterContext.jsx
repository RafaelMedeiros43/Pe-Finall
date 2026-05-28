import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const NewsletterContext = createContext(null);

export function NewsletterProvider({ children }) {
  const [newsletterDB, setNewsletterDB] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  const carregarSubscritores = useCallback((dbInstance) => {
    const currentDb = dbInstance || newsletterDB;
    if (!currentDb) return;
    const transaction = currentDb.transaction(["subscribers"], "readonly");
    const store = transaction.objectStore("subscribers");
    const request = store.getAll();
    request.onsuccess = () => {
        setSubscribers(request.result);
    };
  }, [newsletterDB]);

  useEffect(() => {
    if (newsletterDB) return; // Nao deixa a DB abrir varias vezes

    const newsletterDBRequest = indexedDB.open("NewsletterDB", 1);

    newsletterDBRequest.onerror = function(event) {
        console.error("Erro ao abrir NewsletterDB", event);
    };

    newsletterDBRequest.onupgradeneeded = function(event) {
        const dbInstance = event.target.result;
        if (!dbInstance.objectStoreNames.contains("subscribers")) {
            const store = dbInstance.createObjectStore("subscribers", { keyPath: "email" });
            store.createIndex("nome", "nome", { unique: false });
            store.createIndex("telefone", "telefone", { unique: false });
            console.log("Object store 'subscribers' criada");
        }
    };

    newsletterDBRequest.onsuccess = function(event) {
        const dbInstance = newsletterDBRequest.result;
        setNewsletterDB(dbInstance);
        carregarSubscritores(dbInstance);
    };
  }, [carregarSubscritores, newsletterDB]);

  const salvarSubscritor = useCallback((nome, email, telefone) => {
    return new Promise((resolve, reject) => {
        if (!newsletterDB) {
        reject(new Error('Base de dados não inicializada'));
            return;
        }
        const transaction = newsletterDB.transaction(["subscribers"], "readwrite");
        const store = transaction.objectStore("subscribers");
        const request = store.put({ nome, email, telefone });
        request.onsuccess = () => {
            carregarSubscritores(newsletterDB);
            resolve();
        };
      request.onerror = () => reject(new Error('Erro ao guardar subscritor'));
    });
  }, [newsletterDB, carregarSubscritores]);

  const verificarSubscritor = useCallback((email) => {
    return new Promise((resolve, reject) => {
        if (!newsletterDB) {
        reject(new Error('Base de dados não inicializada'));
            return;
        }
        const transaction = newsletterDB.transaction(["subscribers"], "readonly");
        const store = transaction.objectStore("subscribers");
        const request = store.get(email);
        request.onsuccess = () => resolve(!!request.result);
      request.onerror = () => reject(new Error('Erro ao verificar subscritor'));
    });
  }, [newsletterDB]);

  const exportarSubscritoresCSV = useCallback(() => {
    if (!newsletterDB) return;
    const transaction = newsletterDB.transaction(["subscribers"], "readonly");
    const store = transaction.objectStore("subscribers");
    const request = store.getAll();
    request.onsuccess = () => {
        let csv = "Nome,Email,Telefone\n";
        request.result.forEach(sub => {
            csv += `"${sub.nome.replace(/"/g, '""')}","${sub.email}","${sub.telefone || ""}"\n`;
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", "subscritores_newsletter.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
  }, [newsletterDB]);

  return (
    <NewsletterContext.Provider value={{ subscribers, salvarSubscritor, verificarSubscritor, exportarSubscritoresCSV, carregarSubscritores }}>
      {children}
    </NewsletterContext.Provider>
  );
}

export function useNewsletterDB() {
  const ctx = useContext(NewsletterContext);
  if (!ctx) throw new Error('useNewsletterDB tem de ser usado dentro de um NewsletterProvider');
  return ctx;
}