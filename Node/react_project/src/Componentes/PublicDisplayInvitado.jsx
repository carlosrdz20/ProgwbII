import React, { useState, useEffect } from "react";
import Heart from "react-heart"
import { Link, useNavigate } from "react-router-dom";
import '../Estilos/PublicacionDisplay.css'
import { Row, Col, Container } from 'react-bootstrap';
import Rating from "./Rating";
import { FaPencil } from "react-icons/fa6";
import { FaRegPaperPlane, FaTrash } from "react-icons/fa";
import MiCarousel from "./Carousel.jsx";
import axios from "axios";
import useAuth from '../Context/useAuth';
import usePubAuth from '../Context/useAuthPub.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Corazon(props) {
	const navigate = useNavigate();
	const [active, setActive] = useState(props.Savedxd);	
}



function PublicDisplay({ IDPublicacion, idUsuario, NombreUsu, ImagenUsu, Fecha, Pais, Titulo, Contenido, Imagen1, Imagen2, Imagen3, Tipo, Saved, Pagina, Calificacion, PromCalificacion, Sigue }){
	const [rating, setRating] = useState(0);
	const navigate = useNavigate();	
	const {logout, user} = useAuth();
	const {guardarPublicacion} = usePubAuth();

	const [textoBoton, setTextoBoton] = useState("+Seguir");



	







	return (
		<Container fluid className="ContainerPublic">
      <Row>
        <Col xs={12}>
          <Container fluid>
            <Row>
              <Col xs={12} md={3}>
                  <div className="ImgContainer">
                    <img
                      className="ImgUsu" 
                      src={`/Imagenes/${ImagenUsu}`}
                      alt="Imagen de Usuario"
                    />
                  </div>
              </Col>
              <Col xs={12} md={7}>
                {Tipo === 'Propio' ? (
                  <div className="NomBot">
                    <Link className="LinkUsuName" to={Tipo === 'Propio' ? '/Perfil' : Tipo === 'Ajeno' ? '/PerfilAjeno' : Tipo === 'Borrador' ? '/Perfil' : '/Perfil'} >{NombreUsu}</Link>			
                  </div>
                ) : Tipo === 'Ajeno' ? (
                  <div className="NomBot">

                  </div>
                ) : Tipo === 'Borrador' ? (
                  <div className="NomBot">
                    <Link className="LinkUsuName" to={'/Perfil'}>{NombreUsu}</Link>
                  </div>
                ) : Tipo === 'mpubAjeno' ?(
				<div className="NomBot">
					<span className="LinkUsuName" onClick={(e) => { e.preventDefault(); }}>{NombreUsu}</span>
				  </div>
				): null}
                <div className="FechaRating">
                  <div>
                    <h3>
                      
                    </h3>
                  </div>
                  <div>
					{Tipo !== 'Borrador' && (
					<div>
						<h4>
						<label>Popularidad: </label>
						{PromCalificacion} <i className="bi bi-star-fill text-warning"></i>
						</h4>                    
					</div>
					)}                  
                  </div>
                  <div>
					{Tipo !== 'Propio' && Tipo !== 'Borrador' && (
					<div>
					
					</div>
					)}   
                  </div>
                </div>
              </Col>
              <Col xs={12} md={2}>
                {Tipo === 'Propio' ? (
                  <Col lg={2} className="PaisReacc">
                    <img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
                  </Col>
                ) : Tipo === 'Ajeno' ? (
                  <Col lg={2} className="PaisReacc">
                    <img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
                    <Corazon IDPublicacionxd={IDPublicacion} Savedxd={Saved} />
                  </Col>
                ) : Tipo === 'Borrador' ? (
                  <Col lg={2} className="PaisReacc">
                    <img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
                  </Col>
                ) : Tipo === 'mpubAjeno' ? (
					<Col lg={2} className="PaisReacc">
                    <img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
					<Corazon IDPublicacionxd={IDPublicacion} Savedxd={Saved} />
                  </Col>
				): null}
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12}>
          <Container fluid className="ContenedorContenido">
            <Row>
              <Col md={12}>
                <h1>{Titulo}</h1>
              </Col>
              <Col md={12}>
                <h4>{Contenido}</h4>
              </Col>
              <Col md={12}>
                <Container className="MiCarouselContainer">
                  <MiCarousel
                    Imagen1={`${Imagen1}`}
                    Imagen2={`${Imagen2}`}
                    Imagen3={`${Imagen3}`}
                  />                  
                </Container>
              </Col>
              <Col md={12} className="PublicBotones">
                {Tipo === 'Propio' && Pagina !== "Inicio"? (
                  <div className="DivButtons">

                  </div>
                ) : Tipo === 'Ajeno' ? (
                  <>
                  </>
                ) : Tipo === 'Borrador' && Pagina !== "Inicio" ? (
                  <div className="DivButtons">

                  </div>
                ) : null}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
	);
}

export default PublicDisplay;