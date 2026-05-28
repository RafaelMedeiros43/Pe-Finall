import { useEffect } from 'react';

export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Se clicou dentro do elemento, não faz nada
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Se clicou fora, executa a função 
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}