import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Estilos/Navibar.css'
import LogoBoton from './LogoBoton.jsx';
import { useUser } from '../Context/UserContext';
import Buscador from './Buscador.jsx';
import NavibarUsuario from './NavibarUsuario.jsx';

function Navibar() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <nav className='Navbar'>
      <div className='NavbarIzquierda'>
        <LogoBoton />
      </div>
      <div className='NavbarCentro'>
        <Buscador />
      </div>
      <div className='NavbarDerecha'>
        <NavibarUsuario
          Nombre={user.NombreUsuario} 
          Imagen={user.Foto}
          Iniciado={true}
        />
      </div>
    </nav>
  );
}

export default Navibar;
