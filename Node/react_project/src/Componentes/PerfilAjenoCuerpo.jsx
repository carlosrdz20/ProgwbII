import React, { useState } from "react";
import '../Estilos/PerfilAjeno.css';
import { MenuLateral } from "./MenuIzquierdo.jsx";
import { Row, Col } from 'react-bootstrap';
import { FaRegPaperPlane, FaStar } from "react-icons/fa";
import { BsFillArchiveFill, BsFillEraserFill } from "react-icons/bs";



function PerfilAjeno() {

  return (
    <div className="Cuerpo">
    <Row>
        <Col className="Izquierdo" xs={12}  md ={12} lg = {3}>
            <MenuLateral/>
        </Col>
        <Col className="col-5" xs={12} sm ={12} md ={12} lg = {6}>
          <Col className="ROW" xs={12} sm ={12} md ={12} lg = {6}>
              <Col className="COL">
                  <label className="Subtitulo">Seguidores</label>
                  <label className="Sub">1234</label>
                </Col>
                <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
                    <div className="foto">
                      <img src="/Imagenes/Perfil.png" alt="" className="FotoPerfil" />
                      <label className="USER">@Username</label> 
                    </div>
                    <button className="btn">+ Seguir</button>
                </Col>
                <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
                    <label className="Subtitulo">Seguidos</label>
                    <label className="Sub">1234</label>
                </Col>
          </Col>
      </Col>
    </Row>
    </div>
  );
}

export default PerfilAjeno;
