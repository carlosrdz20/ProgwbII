import React from "react";
import '../Estilos/PerfilCuerpo.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

function PerfilCuerpo() {
  return (
    <div className="PerfilCuerpo">
      <Row>
        <Col className="Izquierdo" xs={12}  md ={12} lg = {3}>
          <MenuLateral/>
        </Col>

        <Col className="PerfilROW" xs={12} sm ={12} md ={12} lg = {9}>
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
              <Link to={"/EditarPerfil"}>
                <button className="btn">Editar Perfil</button>   
              </Link>
            </div>
          </Col>
          <Col className="PerfilCOL" xs={12} sm ={12} md ={12} lg = {6}>
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

export default PerfilCuerpo;
