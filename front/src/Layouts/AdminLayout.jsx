import React from 'react';
import { Link } from 'react-router-dom';

import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../components/Header/HeaderAdmin';
import AutenticationFooter from '../components/Footer/AutenticationFooter';
export default function AdminLayout() {
  const LoggedUser = { nome: 'Admin', role: 'admin' }; 

  if (LoggedUser.role !== 'admin') {
    return <Link to="/" />;
  }

  return (
    <div>
      <HeaderAdmin />
      <main>
        <Outlet />
      </main>
      <AutenticationFooter />
      
    </div>
  );
}