import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage da key "${key}":`, error);
      return initialValue;
    }
  });

  // É guardado automaticamente sempre que o value mudar
  useEffect(() => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Erro ao guardar localStorage na key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}