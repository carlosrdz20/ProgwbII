import React, { useState } from "react";
import '../Estilos/PerfilCuerpo.css';
import { MenuLateral } from "./MenuIzquierdo.jsx";
import { Row, Col } from 'react-bootstrap';
import { FaRegPaperPlane, FaStar } from "react-icons/fa";
import { BsFillArchiveFill, BsFillEraserFill } from "react-icons/bs";
import { Link } from "react-router-dom";



function PerfilCuerpo() {

  return (
    <div className="Cuerpo">
    <Row>
        <Col className="Izquierdo" xs={12}  md ={12} lg = {3}>
            <MenuLateral/>
        </Col>
        <Col className="ROW" xs={12} sm ={12} md ={12} lg = {6}>
            <Col className="COL">
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
            </Col>
            <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
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
                    <Link to={"/EditarPerfil"}>
                        <button className="btn">Editar Perfil</button>   
                    </Link>
                </div>
            </Col>
            <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
                <div className="foto">
                    <label htmlFor="Fotoperfil">Foto de perfil:</label>
                    <img src="/Imagenes/Perfil.png" alt="" className="FotoPerfil" />
                </div>
            </Col>
        </Col>
    </Row>
    </div>
  );
}

export default PerfilCuerpo;
