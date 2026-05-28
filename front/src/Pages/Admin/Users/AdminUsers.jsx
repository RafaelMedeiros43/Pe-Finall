import React, { useState, useEffect } from 'react';
import styles from './AdminUsers.module.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([
      { id: 1, nome: 'João Silva', email: 'joao@uac.pt', role: 'user' },
      { id: 2, nome: 'Maria Santos', email: 'maria@uac.pt', role: 'admin' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      { id: 3, nome: 'Pedro Costa', email: 'pedro@uac.pt', role: 'user' },
      

    ]);
  }, []);

  const handleDelete = (id, nome) => {
    const confirmacao = window.confirm(`Queres mesmo apagar a conta de ${nome}?`);
    
    if (confirmacao) {
      
      setUsers(users.filter(user => user.id !== id));
      alert(`${nome} foi apagado com sucesso!`);
    }
  };

  return (
    <div className={styles.adminWrapper}>
      <div className={styles.adminContainer}>
        
        <h2>Gestão de Utilizadores</h2>
        <p>Painel exclusivo para Administradores.</p>

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
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={user.role === 'admin' ? styles.badgeAdmin : styles.badgeUser}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.role !== 'admin' && (
                      <button 
                        onClick={() => handleDelete(user.id, user.nome)} 
                        className={styles.btnApagar}
                      >
                        Apagar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>

      </div>
    </div>
  );
}