import React from "react";
import '../Estilos/PerfilCuerpo.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import { Row, Col } from 'react-bootstrap';

function EditarPerfilCuerpo() {

  return (
    <div className="Cuerpo">
      <Row>
        <Col className="Izquierdo" xs={12}  md ={12} lg = {3}>
            <MenuLateral/>
        </Col>
        <Col className="PerfilROW" xs={12} sm ={12} md ={12} lg = {6}>
          <Col className="PerfilCOL">
            <div className="InputContainer">
              <p>Nombre de usuario:</p>
              <input type="text" id="Usuario" className="InputPerfil"/>
            </div>
            <div className="InputContainer">
              <p>Nombre completo:</p>
              <input type="text" id="Nombre" className="InputPerfil"/>
            </div>
            <div className="InputContainer">
              <p>Contraseña Actual:</p>
              <input type="text" id="Password" className="InputPerfil"/>
            </div>
            <div className="InputContainer">
              <p>Contraseña Nueva:</p>
              <input type="text" id="NPassword" className="InputPerfil"/>
            </div>
          </Col>
          <Col className="PerfilCOL" xs={12} sm ={12} md ={12} lg = {6}>
            <div className="InputContainer">
              <p>Correo electronico:</p>
              <input type="text" id="Correo" className="InputPerfil"/>
            </div>
            <div className="InputContainer">
              <p>Género:</p>
              <select id="Combobox" className="Combobox">
                <option value="opcion1">Masculino</option>
                <option value="opcion2">Femenino</option>
              </select>
            </div>
            <div className="InputContainer">
              <p>Fecha de nacimiento:</p>
              <input type="date" id="fecha" className="InputPerfil" />
            </div>
            <div>
              <button class="btn">Aceptar cambios</button>
            </div>
          </Col>
          <Col className="PerfilCOL" xs={12} sm ={12} md ={12} lg = {6}>
            <div class="input-container">
              <p>Nueva foto de perfil:</p>
              <input className="InputFoto" type="file" id="photoInput" accept="image/*" class="fotoinput" multiple/>
            </div>
            <div className="foto">
              <p>Foto de perfil:</p>
              <img src="/Imagenes/Perfil.png" alt="" className="FotoPerfil" />
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default EditarPerfilCuerpo   ;
