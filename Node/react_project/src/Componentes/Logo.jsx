import React from "react";
import '../Estilos/Logo.css'

// Este Componente es solo la imagen del Logo utilizado en Login y registro

function Logo({ Imagen }) {
  return(
    <div 
    className='logo-contenedor'>
      <img 
        src={`/Imagenes/${Imagen}`}
        className='logo' 
        alt={`Imagen de ${Imagen}`}
      />
    </div>
  );
}

export default Logo;