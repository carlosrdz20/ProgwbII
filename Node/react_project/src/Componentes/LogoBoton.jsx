import React from "react";
import { Link } from 'react-router-dom';
import '../Estilos/LogoBoton.css'

function Logo({ Imagen }) {
  return(
    <div className='logoBoton-contenedor'>
      <Link to={'/'}>
      <img 
      src={require(`../Imagenes/${Imagen}`)}
      className='logoBoton' 
      alt={`Imagen de ${Imagen}`}
      />
      </Link>
    </div>
  );
}

export default Logo;