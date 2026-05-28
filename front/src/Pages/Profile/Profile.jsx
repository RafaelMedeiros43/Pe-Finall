import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Perfil.module.css'; 

export default function Profile() {

  const nomeUtilizador = "João Silva"; 

  const handleLogout = () => {
    console.log("Sessão terminada");
  };

  return (
    <div className={styles.section}>
      
      <main className={styles.container}>
        
        <div className={styles.perfilCard}>
          <div className={styles.avatar}>
            {nomeUtilizador.charAt(0)}
          </div>
          
          <h2>Bem-vindo,</h2>
          <h1 className={styles.nome}>{nomeUtilizador}</h1>
          
          <p className={styles.mensagem}>
            Iniciaste sessão com sucesso no Centro Académico Clínico dos Açores.
          </p>

          <div className={styles.botoes}>
            <Link to="/" className={styles.btnVoltar}>
              Ir para a Página Inicial
            </Link>
            
            <button onClick={handleLogout} className={styles.btnSair}>
              Terminar Sessão
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}