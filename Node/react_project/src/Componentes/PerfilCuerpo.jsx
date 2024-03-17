import React, { useState } from "react";
import '../Estilos/PerfilCuerpo.css';
import { MenuLateral } from "./MenuIzquierdo.jsx";



function PerfilCuerpo() {

  return (
    <div className="Cuerpo">
      <div>
        <MenuLateral />
      </div>
      <div className="RecuadoPerfil">
        <div className="Columna">
            <div className="InputContainer">
                <label htmlFor="Usuario">Nombre de usuario:</label>
                <input type="text" id="Usuario" className="InputPerfil"/>
            </div>
            <div className="InputContainer">
                <label htmlFor="Nombre">Nombre completo:</label>
                <input type="text" id="Nombre" className="InputPerfil"/>
            </div>
            <div className="InputContainer">
                <label htmlFor="Password">Contraseña Actual:</label>
                <input type="text" id="Password" className="InputPerfil"/>
            </div>
            <div className="InputContainer">
                <label htmlFor="NPassword">Contraseña Nueva:</label>
                <input type="text" id="NPassword" className="InputPerfil"/>
            </div>
        </div>
        <div className="Columna">
            <div className="InputContainer">
                <label htmlFor="Correo">Correo electronico:</label>
                <input type="text" id="Correo" className="InputPerfil"/>
            </div>
            <div className="InputContainer">
                <label htmlFor="Combobox">Género:</label>
                <select id="Combobox" className="Combobox">
                    <option value="opcion1">Masculino</option>
                    <option value="opcion2">Femenino</option>
                </select>
            </div>
            <div className="InputContainer">
                <label htmlFor="fecha">Fecha de nacimiento:</label>
                <input type="date" id="fecha" className="InputPerfil" />
            </div>
            <div>
                <button>Editar perfil</button>
            </div>
        </div>
        <div className="Columna">
            <div className="foto">
                <label htmlFor="Fotoperfil">Foto de perfil:</label>
                <img src="/Imagenes/Perfil.png" alt="" className="FotoPerfil" />
            </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilCuerpo;
