import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

export default function Register() {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const navigate = useNavigate();

  const handleSubmeter = async (e) => {
    e.preventDefault();
    setErro(''); 
    setSucesso(''); 

    try {
      const resposta = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.message || 'Erro ao criar conta.');
        return;
      }

      setSucesso(dados.message || 'Conta criada com sucesso!');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Erro na ligação:', error);
      setErro('Não foi possível conectar ao servidor.');
    }
  };

  return (
    <div className={styles.section}>
        <div className={styles.container}>
          <h2>Registo de Utilizador</h2>
          
          <form onSubmit={handleSubmeter} className={styles.form}>
            
            <div className={styles.inputGroup}>
              <label>Nome Completo</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>

            {erro && <p>{erro}</p>}
            
            {sucesso && <p >{sucesso}</p>}

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