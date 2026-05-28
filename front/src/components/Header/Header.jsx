// src/components/Header/Header.jsx
import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useClickOutside } from '../../hooks/useClickOutside';

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { lang, setLang, t } = useContext(LanguageContext);
  
  // Estado para controlar se o menu hamburgar está aberto
  const [isMenuActive, setIsMenuActive] = useState(false);
  const navRef = useRef(null);
  
  // Estado para controlar o dropdown de idiomas
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const authDropdownRef = useRef(null);

  const sunIcon = "☀️";
  const moonIcon = "🌙";

  useClickOutside(dropdownRef, () => setIsLangDropdownOpen(false));
  useClickOutside(authDropdownRef, () => setIsAuthDropdownOpen(false));
  useClickOutside(navRef, () => setIsMenuActive(false));

  const handleToggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleLinkClick = () => {
    setIsMenuActive(false);
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
        

        <nav className={`nav-links ${isMenuActive ? 'active' : ''}`} id="nav-links" ref={navRef}>          <ul>
            <li><a href="#sobre" onClick={handleLinkClick}>{t('nav_sobre', 'Sobre nós')}</a></li>
            <li><a href="#servicos" onClick={handleLinkClick}>{t('nav_servicos', 'Serviços')}</a></li>
            <li><a href="#eventos" onClick={handleLinkClick}>{t('nav_eventos', 'Eventos')}</a></li>
            <li><a href="#noticias" onClick={handleLinkClick}>{t('nav_noticias', 'Notícias')}</a></li>
            <li><a href="#Localizacao" onClick={handleLinkClick}>{t('nav_localizacao', 'Localização')}</a></li>
            <li>
              <a className="contacts" href="#contactos" onClick={handleLinkClick}>
                <strong>{t('nav_contactos', 'Contacte-nos')}</strong>
              </a>
            </li>
            <li className="lang-dropdown-container" ref={authDropdownRef}>
              <div 
                className="lang-dropdown-selected" 
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
              >
                <span>👤 {t('nav_conta', 'Conta')}</span> 
              </div>
              
              <ul 
                className="lang-dropdown-options" 
                style={{ display: isAuthDropdownOpen ? 'block' : 'none' }}
              >
                <li onClick={() => { setIsAuthDropdownOpen(false); handleLinkClick(); }}>
                  <Link to="/login">
                    {t('nav_login', 'Login')}
                  </Link>
                </li>
                <li onClick={() => { setIsAuthDropdownOpen(false); handleLinkClick(); }}>
                  <Link to="/register">
                    {t('nav_registo', 'Registo')}
                  </Link>
                </li>
              </ul>
            </li>
            
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