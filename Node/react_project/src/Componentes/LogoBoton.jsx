import React from "react";
import { Link } from 'react-router-dom';
import '../Estilos/LogoBoton.css'

// Este componente es el logo de la página pero sí se le da click te redirige al inicio, está en Navibar

function Logo({ Imagen }) {
  return(
    <div className='logoBoton-contenedor'>
      <Link to={'/'}>
        <img 
          src={`Imagenes/favicon.ico`}
          className='logoBoton' 
          alt={'Logo'}
        />
      </Link>
    </div>
  );
}

export default Logo;