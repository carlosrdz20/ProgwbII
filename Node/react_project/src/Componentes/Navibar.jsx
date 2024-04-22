import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Estilos/Navibar.css'
import LogoBoton from './LogoBoton.jsx';
import useAuth from '../Context/useAuth';
import Buscador from './Buscador.jsx';
import NavibarUsuario from './NavibarUsuario.jsx';

function Navibar() {

  const { user } = useAuth();

  return (
    <nav className='Navbar'>
      <div className='NavbarIzquierda'>
        <LogoBoton />
      </div>
      <div className='NavbarCentro'>
        <Buscador />
      </div>
      <div className='NavbarDerecha'>
      {user && (
          <NavibarUsuario
            Nombre={user.NombreUsuario} 
            Imagen={user.Foto}
            Iniciado={true}
          />
        )}
      </div>
    </nav>
  );
}

export default Navibar;
