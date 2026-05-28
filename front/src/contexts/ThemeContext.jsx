import React, { createContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'; 

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const systemDefaultTheme = prefersDark ? 'dark' : 'light';

  const [theme, setThemeState] = useLocalStorage('theme', systemDefaultTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};