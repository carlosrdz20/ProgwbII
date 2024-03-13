import React from "react";
import '../Estilos/InicioCuerpo.css'
import { Row, Col } from 'react-bootstrap';
import { FaRegPaperPlane, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsFillArchiveFill, BsFillEraserFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import DestPopu from "./DestPopu";

function InicioCuerpo() {
  return (
    <div>
      <Row className="Cuerpo">
        <Col xs={3} className="CuerpoIzquierda"> 
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
        <Col xs={6} className="CuerpoCentro"> 
          Hola 2 
        </Col>
        <Col xs={3} className="CuerpoDerecha"> 
          <div className="CuerpoDerechaContenedor">
            <h1>Destinos Populares</h1>
            <DestPopu Pais={'México'} Imagen={'./Imagenes/Logo.png'}/>
            <DestPopu Pais={'Japon'} Imagen={'../src/Imagenes/Perfil.png'}/>
            <DestPopu Pais={'Paris'} Imagen={'../Imagenes/Registro_BG.jpg'}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default InicioCuerpo;