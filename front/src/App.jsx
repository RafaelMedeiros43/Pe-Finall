import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import { AdminPanelProvider } from './contexts/AdminPanelContext';
import { EventosProvider } from './contexts/EventosContext';
import { NewsletterProvider } from './contexts/NewsletterContext';

import './style.css';


// Componentes da Página Principal
import Hero from './components/Hero/Hero';
import About from './components/SobreNos/SobreNos';
import Graficos from './components/Graficos/Graficos';
import Partners from './components/Parceiros/Parceiros';
import Services from './components/Servicos/Servicos';
import Eventos from './components/Eventos/Eventos';
import Noticias from './components/Noticias/Noticias';
import Localizacao from './components/Localizacao/Localizacao';

import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Profile from './Pages/Profile/Profile'
import AdminView from './Pages/Admin/View/AdminView'
import AdminEventos from './Pages/Admin/Eventos/AdminEventos'
import AdminUsers from './Pages/Admin/Users/AdminUsers'

import MainLayout from './Layouts/MainLayout';
import AutenticationLayout from './Layouts/AutenticationLayout';
import AdminLayout from './Layouts/AdminLayout'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AdminPanelProvider>
            <EventosProvider>
              <NewsletterProvider>
                <BrowserRouter>
                  <div className="app-container">
                    <main>
                      <Routes>
                        <Route element={<MainLayout />}>
                          <Route path="/" element={
                            <>
                              <Hero />
                              <About />
                              <Graficos />
                              <Partners />
                              <Services />
                              <Eventos />
                              <Noticias />
                              <Localizacao />
                              
                            </>
                          } />
                        </Route>

                        <Route element={<AutenticationLayout />}>
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/profile" element={<Profile />} />                
                        </Route>
                        <Route element={<AdminLayout />}>
                          <Route path ="/admin" element={<AdminView/>}/>
                          <Route path ="/admin/users" element={<AdminUsers/>}/>
                          <Route path ="/admin/eventos" element={<AdminEventos/>}/>
                        </Route>
                      </Routes>
                    </main>
                  </div>
                </BrowserRouter>
              </NewsletterProvider>
            </EventosProvider>
          </AdminPanelProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;