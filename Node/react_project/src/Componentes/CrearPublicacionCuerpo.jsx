import React from "react";
import '../Estilos/CrearPublicacion.css';
import { Row, Col } from 'react-bootstrap';
import { FaRegPaperPlane } from "react-icons/fa";
import {  BsFillEraserFill } from "react-icons/bs";
import MenuLateral from "../Componentes/MenuIzquierdo.jsx";




function CrearPublicacion() {

    return (
        <div className="CrearPublicacion">
            <Row>
                <Col className="Izquierdo" xs={12}  md ={12} lg = {3}>
                <MenuLateral/>
                </Col>
                <Col className="ROW" xs={12} sm ={12} md ={12} lg = {6}>
                    <Col className="COL">
                        <div class="input-container">
                            <label for="input1" class="input-label">Título:</label>
                            <input type="text" id="input1" class="blue-border" placeholder="Ingrese aquí"/>
                        </div>
                        <div class="input-container">
                            <label for="input2" class="input-label">Descripción:</label>
                            <input type="text" id="input2" class="blue-border" placeholder="Ingrese aquí"/>
                        </div>
                    </Col>
                    <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
                        <div class="input-container">
                            <label for="combobox" class="input-label">País:</label>
                            <select id="combobox" class="blue-border">
                                <option value="opcion1">Opción 1</option>
                                <option value="opcion2">Opción 2</option>
                                <option value="opcion3">Opción 3</option>
                            </select>
                        </div>
                        <div class="button-container">
                            <button class="btn">Borrador <BsFillEraserFill  size={25}/></button>
                        </div>
                    </Col>
                    <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
                        <div class="input-container">
                            <label for="photoInput" class="input-label">Publicar:</label>
                            <input type="file" id="photoInput" accept="image/*" class="fotoinput" multiple/>
                        </div>
                        <div class="image-container">
                            <img src="./Imagenes/Paisaje.jpg" alt="Imagen" id="uploadedImage"/>
                        </div>
                        <div class="button-container">
                            <button class="btn">Publicar <FaRegPaperPlane size={25}/></button>
                        </div>
                    </Col>
                </Col>
            </Row>
        </div>
    );
  }
  
  export default CrearPublicacion;
  