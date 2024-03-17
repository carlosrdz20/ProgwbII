import React, { useState } from "react";
import '../Estilos/InicioCuerpo.css';
import DestPopu from "./DestPopu";
import PublicDisplay from "./PublicacionDisplay";
import { Row, Col } from 'react-bootstrap';
import { FaRegPaperPlane, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsFillArchiveFill, BsFillEraserFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TbPointFilled } from "react-icons/tb";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";


function InicioCuerpo() {
  const [ UsuIni ] = useState(true);

  return (
    <div className="Cuerpo">
      <Row>
        <Col xs={12} md={12} lg={3} className="CuerpoIzquierda"> 
          <div className="CuerpoIzquierdaBoton">
            <button style={{fontSize: '35px'}}>Crear Publicación <FaRegPaperPlane size={28}/> </button>            
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
        <Col xs={12} sm={12} md={12} lg={6} className="CuerpoCentro"> 
          <Row className="RowCentral">
          {UsuIni ? (
            <div>
              <Row>
                <Col md={3} className="CuerpoCentroBotones">
                  <button>Para ti</button>
                  <button>Siguiendo</button>
                </Col>
                <Col md={9} className="PaginacionCol">
                  <div className="Paginacion">
                    <button className="PaginacionBotones"> <RiArrowLeftCircleFill size={40}/> </button>
                    <button className="PaginacionBotonesCentro"> <TbPointFilled size={30}/> </button>
                    <button className="PaginacionBotonesCentro"> <TbPointFilled size={30}/> </button>
                    <button className="PaginacionBotonesCentro"> <TbPointFilled size={30}/> </button>
                    <button className="PaginacionBotones"> <RiArrowRightCircleFill size={40}/> </button>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <div>
              <Row>
                <Col md={12} className="PaginacionCol">
                  <div className="Paginacion">
                    <button className="PaginacionBotones"> <RiArrowLeftCircleFill size={40}/> </button>
                    <button className="PaginacionBotonesCentro"> <TbPointFilled size={30}/> </button>
                    <button className="PaginacionBotonesCentro"> <TbPointFilled size={30}/> </button>
                    <button className="PaginacionBotonesCentro"> <TbPointFilled size={30}/> </button>
                    <button className="PaginacionBotones"> <RiArrowRightCircleFill size={40}/> </button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
            <Col md={12}>
              <PublicDisplay
                ImagenUsu={"Omniman.jpg"}
                NombreUsu={"KFecitoPrueba"}
                Fecha={"10/09/2024"}
                Pais={"Bandera.png"}
                Contenido={"Preuba de contenido Preuba de contenido  Preuba de contenido Preuba de contenido Preuba de contenido Preuba de contenido Preuba de contenido"}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} lg={3} className="CuerpoDerecha">
          <div className="CuerpoDerechaContenedor">
            <h1>"Destinos Populares"</h1>
            <DestPopu Num={"1"} Pais={'México'} Imagen={'/Imagenes/bandera.png'}/>
            <DestPopu Num={"2"} Pais={'Japon'} Imagen={'/Imagenes/japon.png'}/>
            <DestPopu Num={"3"} Pais={'Francia'} Imagen={'Imagenes/espana.png'}/>
            <DestPopu Num={"4"} Pais={'Alemania'} Imagen={'/Imagenes/canada.png'}/>
            <DestPopu Num={"5"} Pais={'Korea'} Imagen={'Imagenes/alemania.png'}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default InicioCuerpo;
