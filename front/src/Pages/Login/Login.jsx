import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')

  const navigate = useNavigate()

  const handleSubmeter = async (e) => {
    e.preventDefault()
    setErro('')

    try {
      const resposta = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) 
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.message || 'Ocorreu um erro ao fazer login.');
        return;
      }

    
      localStorage.setItem('token', dados.token);

      navigate('/');
      
    } catch (error) {
      console.error('Erro na ligação:', error);
      setErro('Não foi possível conectar ao servidor.');
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2>Iniciar Sessão</h2>
        
        <form onSubmit={handleSubmeter} className={styles.form}>
          
          <div className={styles.inputGroup}>
            <label>Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className={styles.inputField}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className={styles.inputField}
            />
          </div>

          {erro && <p>{erro}</p>}

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