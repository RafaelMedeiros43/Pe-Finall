import React from 'react';
import { Link} from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  return (
    
    <div className={styles.section}>
      <div className={styles.container}>
        <h2>Iniciar Sessão</h2>
        <form className={styles.form}>
          
          <div className={styles.inputGroup}>
            <label>Email:</label>
            <input 
              type="email" 
              required 
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input 
              type="password" 
              required 
              className={styles.inputField}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>

         
        </form>

        <p>
          Ainda não tens conta? <Link to="/register">Regista-te aqui</Link>
        </p>
         <Link to="/">Voltar ao Início</Link>
        </div>
      </div>
  );
}