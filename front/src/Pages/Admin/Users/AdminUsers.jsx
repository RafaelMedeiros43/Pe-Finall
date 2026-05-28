import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminUsers.module.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [erro, setErro] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const carregarUtilizadores = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const resposta = await fetch('http://localhost:5000/api/user/getallprofiles', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (resposta.ok) {
          const dados = await resposta.json();
          setUsers(dados);
        } else {
          setErro('Não tens permissão para ver esta página.');
        }
      } catch (error) {
        console.error("Erro ao buscar utilizadores:", error);
        setErro('Erro de ligação ao servidor.');
      }
    };

    carregarUtilizadores();
  }, [navigate]);

  const handleDelete = async (id, username) => {
    const confirmacao = window.confirm(`Queres mesmo apagar a conta de ${username}?`);
    
    if (confirmacao) {
      try {
        const token = localStorage.getItem('token');
        
        const resposta = await fetch(`http://localhost:5000/api/user/deleteprofile${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (resposta.ok) {
          setUsers(users.filter(user => user.id !== id));
          alert(`${username} foi apagado com sucesso!`);
        } else {
          const dados = await resposta.json();
          alert(dados.message || 'Erro ao tentar apagar o utilizador.');
        }
      } catch (error) {
        console.error('Erro ao apagar utilizador:', error);
        alert('Erro de ligação ao servidor.');
      }
    }
  };

  return (
    <div className={styles.adminWrapper}>
      <div className={styles.adminContainer}>
        
        <h2>Gestão de Utilizadores</h2>
        <p>Painel exclusivo para Administradores.</p>

        {erro && <p>{erro}</p>}

        <div className={styles.tabelaContainer}>
          <table className={styles.tabela}>
            
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>
            </thead>
            
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td> 
                  <td>{user.email}</td>
                  <td>
                    <span className={user.role === 'admin' ? styles.badgeAdmin : styles.badgeUser}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.role !== 'admin' && (
                      <button 
                        onClick={() => handleDelete(user.id, user.username)} 
                        className={styles.btnApagar}
                      >
                        Apagar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              
              {users.length === 0 && !erro && (
                <tr>
                  <td colSpan="5">
                    A carregar utilizadores...
                  </td>
                </tr>
              )}
            </tbody>
            
          </table>
        </div>

      </div>
    </div>
  );
}