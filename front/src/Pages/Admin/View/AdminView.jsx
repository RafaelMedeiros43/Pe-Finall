import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminView.module.css';

export default function AdminView() {
  const estatisticas = {
    totalUsuarios: 124324,
    eventosAtivos: 52342,
    novasInscricoes: 122342
  };

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.container}>
        
        <header className={styles.header}>
          <h1>Visão Geral</h1>
          <p>Bem-vindo ao painel de controlo do Centro Académico Clínico dos Açores.</p>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total de Utilizadores</h3>
            <p className={styles.numero}>{estatisticas.totalUsuarios}</p>
          </div>
          
          <div className={styles.statCard}>
            <h3>Eventos Ativos</h3>
            <p className={styles.numero}>{estatisticas.eventosAtivos}</p>
          </div>
          
          <div className={styles.statCard}>
            <h3>Novas Inscrições</h3>
            <p className={styles.numero}>{estatisticas.novasInscricoes}</p>
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