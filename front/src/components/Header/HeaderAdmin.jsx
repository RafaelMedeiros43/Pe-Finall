import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../../contexts/ThemeContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useClickOutside } from '../../hooks/useClickOutside';

export default function HeaderAutenticacao() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { lang, setLang, t } = useContext(LanguageContext);
  
  // Estado para controlar se o menu hamburgar está aberto
  const [isMenuActive, setIsMenuActive] = useState(false);
  const navRef = useRef(null);
  
  // Estado para controlar o dropdown de idiomas
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sunIcon = "☀️";
  const moonIcon = "🌙";

  useClickOutside(dropdownRef, () => setIsLangDropdownOpen(false));
  useClickOutside(navRef, () => setIsMenuActive(false));

  const handleToggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setIsLangDropdownOpen(false);
  };

  const flags = { pt: 'pt', en: 'gb', es: 'es', fr: 'fr', de: 'de' };

  return (
    <header className="header">
      <div className="header-flex">
        <div className="circle">
          <div className="logo"></div>
          <div className="text">
            <p>
              {"Centro Académico Clínico dos Açores".split("").map((char, i, arr) => {
                const angle = 360 / arr.length;
                return (
                  <span 
                    key={i} 
                    style={{ 
                      transform: `translate(-50%, -50%) rotate(${i * angle}deg) translateY(-52px)` 
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
        <span className="header-text">
          <strong>{t('header_title', 'Centro Académico Clínico dos Açores')}</strong>
        </span>

        <nav className="nav-links"  id="nav-links" ref={navRef}>          
          <ul>
            <li><Link to ="/">{t('nav_inicio', 'Início')}</Link></li>
            <li><Link to ="/admin/eventos">{t('nav_eventos_admin', 'Eventos')}</Link></li>
            <li><Link to ="/admin/users">{t('nav_users', 'Utilizadores')}</Link></li>

            {/* DROPDOWN DE IDIOMAS */}
            <li className="lang-dropdown-container" ref={dropdownRef}>
              <div 
                className="lang-dropdown-selected" 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              >
                <span className={`fi fi-${flags[lang]}`}></span>{' '}
                <span className="lang-code">{lang.toUpperCase()}</span>
              </div>
              
              <ul 
                className="lang-dropdown-options" 
                style={{ display: isLangDropdownOpen ? 'block' : 'none' }}
              >
                {Object.keys(flags).map(l => (
                  <li key={l} onClick={() => handleLangChange(l)}>
                    <span className={`fi fi-${flags[l]}`}></span> {l.toUpperCase()}
                  </li>
                ))}
              </ul>
            </li>
            
            {/* Botão do dark mode */}
            <li>
              <button 
                id="theme-toggle" 
                className="btn theme-toggle-btn" 
                title="Alternar modo escuro" 
                onClick={toggleTheme}
              >
                {theme === 'dark' ? sunIcon : moonIcon}
              </button>
            </li>
          </ul>
          
          <div className="header-menu" id="header-menu" onClick={handleToggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </div>
    </header>
  );
}