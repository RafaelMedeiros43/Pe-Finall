import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

export default function Register() {
  
  return (
    <div className={styles.section}>
        <div className={styles.container}>
          <h2>Registo de Utilizador</h2>
          
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Nome Completo</label>
              <input 
                type="text" 
                className={styles.inputField}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input 
                type="email" 
                className={styles.inputField}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input 
                type="password" 
                className={styles.inputField}
                required
              />
            </div>

            <button type="submit" className={styles.button}>Criar Conta</button>
          </form>

          <p>
            Já tens uma conta? <Link to="/login">Entra aqui</Link>
          </p>
          <div className={styles.header}>
            <Link to="/">Voltar ao Início</Link>
          </div>
        </div>
    </div>
  );
}