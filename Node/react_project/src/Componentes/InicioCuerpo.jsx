import React from "react";
import { Row, Col } from 'react-bootstrap';
import { FaRegPaperPlane, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsFillArchiveFill, BsFillEraserFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import DestPopu from "./DestPopu";
import '../Estilos/InicioCuerpo.css';

function InicioCuerpo() {
  return (
    <div className="Cuerpo">
      <Row>
        <Col xs={12} md={12} lg={3} className="CuerpoIzquierda"> 
          <div className="CuerpoIzquierdaBoton">
            <button>Crear Publicación <FaRegPaperPlane size={28}/> </button>            
          </div>
          <div>
            <ul>
              <li> 
                <Link to={'/'} className="CuerpoIzquerdaLinks">
                  <IoHome style={{marginRight: "5px"}} size={30}/>
                  Inicio
                </Link> 
              </li>
              <li> 
                <Link className="CuerpoIzquerdaLinks">
                  <BsFillArchiveFill style={{marginRight: "5px"}} size={30}/>
                  Mis publicaciones
                </Link> 
              </li>
              <li> 
                <Link className="CuerpoIzquerdaLinks">
                  <BsFillEraserFill style={{marginRight: "5px"}} size={30}/>
                  Borradores
                </Link> 
              </li>
              <li> 
                <Link className="CuerpoIzquerdaLinks">
                  <FaStar style={{marginRight: "5px"}} size={30} />
                  Favoritos
                </Link> 
              </li>
              <li> 
                <Link to={'/Login'} className="CuerpoIzquerdaLinks">
                  <RiLogoutBoxRLine style={{marginRight: "5px"}} size={30}/>
                  Cerrar Sesión
                </Link> 
              </li>
            </ul>            
          </div>
        </Col>
        <Col xs={12} md={12} lg={7} className="CuerpoCentro"> 
          <Row className="RowCentral">
            <Col md={6}>
              Botones de seguir
            </Col>
            <Col md={6}>
              Paginación
            </Col>
            <Col md={12}>
              Publicaciones
            </Col>            
          </Row>
        </Col>
        <Col xs={12} md={12} lg={2} className="CuerpoDerecha">
          <div className="CuerpoDerechaContenedor">
            <h1>Destinos Populares</h1>
            <DestPopu Num={"1"} Pais={'México'} Imagen={require('../Imagenes/bandera.png')}/>
            <DestPopu Num={"2"} Pais={'Japon'} Imagen={require('../Imagenes/japon.png')}/>
            <DestPopu Num={"3"} Pais={'Francia'} Imagen={require('../Imagenes/espana.png')}/>
            <DestPopu Num={"4"} Pais={'Alemania'} Imagen={require('../Imagenes/canada.png')}/>
            <DestPopu Num={"5"} Pais={'Korea'} Imagen={require('../Imagenes/alemania.png')}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default InicioCuerpo;
