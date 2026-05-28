import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Perfil.module.css'; 

export default function Profile() {
  const [utilizador, setUtilizador] = useState(null);
  const [erro, setErro] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const buscarPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const resposta = await fetch('http://localhost:5000/api/user/getprofile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (resposta.ok) {
          const dados = await resposta.json();
          setUtilizador(dados); 
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        setErro('Não foi possível carregar os dados do perfil.');
      }
    };

    buscarPerfil();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!utilizador && !erro) {
    return <div>A carregar perfil...</div>;
  }

  return (
    <div className={styles.section}>
      
      <main className={styles.container}>
        
        <div className={styles.perfilCard}>
          <div className={styles.avatar}>
            {utilizador?.username ? utilizador.username.charAt(0).toUpperCase() : '?'}
          </div>
          
          <h2>Bem-vindo,</h2>
          <h1 className={styles.nome}>{utilizador?.username}</h1>
          
          <p className={styles.mensagem}>
            Iniciaste sessão com sucesso no Centro Académico Clínico dos Açores.
          </p>

          <div>
            <p><strong>Email:</strong> {utilizador?.email}</p>
            <p><strong>Cargo:</strong> {utilizador?.role}<span></span></p>
          </div>

          <div className={styles.botoes}>
            <Link to="/" className={styles.btnVoltar}>
              Ir para a Página Inicial
            </Link>
            
            <button onClick={handleLogout} className={styles.btnSair}>
              Terminar Sessão
            </button>
          </div>

          {erro && <p>{erro}</p>}
        </div>

      </main>
    </div>
  );
}