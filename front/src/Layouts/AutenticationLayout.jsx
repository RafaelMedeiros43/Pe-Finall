import React from 'react';
import { Outlet } from 'react-router-dom';
//import Do header e footer apenas pra autenticaçao
import HeaderAutenticacao from '../components/Header/HeaderAutenticacao'; 
import AutenticationFooter from '../components/Footer/AutenticationFooter'
//Layout da pagina de autenticaçao
export default function AutenticationLayout() {
  return (
    <div>
      <HeaderAutenticacao />
      <main>
        <Outlet />
      </main>
      <footer>
       <AutenticationFooter />
      </footer>
      
    </div>
  );
}