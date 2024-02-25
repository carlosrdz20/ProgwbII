import React from "react";
import '../Estilos/Logo.css'

function Logo({ Imagen }) {
  return(
    <div 
    className='logo-contenedor'>
      <img 
      src={require(`../Imagenes/${Imagen}`)}
      className='logo' 
      alt={`Imagen de ${Imagen}`}/>
    </div>
  );
}

export default Logo;