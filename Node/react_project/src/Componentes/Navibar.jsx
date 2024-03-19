import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Estilos/Navibar.css'
import LogoBoton from './LogoBoton.jsx';
import Buscador from './Buscador.jsx';
import NavibarUsuario from './NavibarUsuario.jsx';

function Navibar() {
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
          Nombre={'15CaracteresMax'} //Máximo 15 caracteres
          Imagen={'Cato.jpg'}
          Iniciado={true}
        />
      </div>
    </nav>
  );
}

export default Navibar;
