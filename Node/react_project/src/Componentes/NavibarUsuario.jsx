import React, { useState } from "react";
import '../Estilos/NavibarUsuario.css';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";

function Navibar_Usuario ({ Nombre, Imagen, Iniciado }) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };
  
  return (
    <div>
      {Iniciado ? (
        <div className="DivUsu">
          <Link className="UsuLink" to={'/Perfil'}>
            <h1 className="UsuNom" >{Nombre}</h1>
          </Link>   
          {error ? (
            <FaRegUserCircle size={75} color='#fff'/>
          ) : (
            <img className='UsuImg' onError={handleError} src={`/Imagenes/${Imagen}`}/>
          )}       
        </div>
      ) : (
        <div className="IniReg">
          <Link className="IniRegLink" to={'/Login'}>
            Iniciar Sesión
          </Link>
          /
          <Link className="IniRegLink" to={'/Registro'}>
            Registrarse          
          </Link>          
        </div>
      )}
    </div>
  );
};

export default Navibar_Usuario;