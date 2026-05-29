import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AdminView.module.css';

export default function AdminView() {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');

  const [estatisticas, setEstatisticas] = useState({
    totalUsuarios: 0,
    eventosAtivos: 0,
    novasInscricoes: 0
  });

  useEffect(() => {
    const carregarEstatisticas = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const respostaUsers = await fetch('http://localhost:5000/api/user/getallprofiles', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const respostaEventos = await fetch('http://localhost:5000/api/event/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        let contagemUsers = 0;
        let contagemEventos = 0;

        if (respostaUsers.ok) {
          const users = await respostaUsers.json();
          contagemUsers = users.length;
        } else {
          setErro('Não tens permissão para ver os utilizadores.');
        }

        if (respostaEventos.ok) {
          const dadosEventos = await respostaEventos.json();
          contagemEventos = dadosEventos.events.length
        }

        setEstatisticas(prev => ({
          ...prev,
          totalUsuarios: contagemUsers,
          eventosAtivos: contagemEventos
        }));

      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
        setErro('Erro de ligação ao servidor.');
      }
    };

    carregarEstatisticas();
  }, [navigate]);

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.container}>
        
        <header className={styles.header}>
          <h1>Visão Geral</h1>
          <p>Bem-vindo ao painel de controlo do Centro Académico Clínico dos Açores.</p>
        </header>

        {erro && <p style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{erro}</p>}

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total de Utilizadores</h3>
            <p className={styles.numero}>{estatisticas.totalUsuarios}</p>
          </div>
          
          <div className={styles.statCard}>
            <h3>Eventos Ativos</h3>
            <p className={styles.numero}>{estatisticas.eventosAtivos}</p>
          </div>
          
          
        </section>

        <section className={styles.actionsSection}>
          <h2>Ações Rápidas</h2>
          <div className={styles.actionsGrid}>
            
            <Link to="/admin/users" className={styles.actionBtn}>
              <span className={styles.icon}>👥</span>
              Gerir Utilizadores
            </Link>
            
            <Link to="/admin/eventos" className={styles.actionBtn}>
              <span className={styles.icon}>📅</span>
              Gerir Eventos
            </Link>
            
          </div>
        </section>

      </div>
    </div>
  );
}