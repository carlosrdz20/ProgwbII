import React from "react";
import '../Estilos/Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function Footibar(){
  return (
    <footer className="Footibar">
      <Container className="MyContainerFooter">
        <Row className="Footibar_Redes">
          <p>Siguenos en nuestras redes sociales:
            <a className="LinkRedes" 
              href="https://www.facebook.com/profile.php?id=100089611345857"> 
              <FaFacebookF size={25}/> 
            </a>
            <a className="LinkRedes" 
              href="https://www.instagram.com/cajadeerrores/"> 
              <FaInstagram size={32}/> 
            </a>
          </p>
        </Row>
        <hr />
        <Row className="Footibar_Informacion">
          <Col>
            <h3>Sobre la empresa</h3>
            <p>"Caja de Errores vio una oportunidad de 
              comuncar a las personas del mundo de una manera divertida 
              y divertida, creando Travelers Talks, una página donde las personas
              pueden compartir imagenes e información de sus viajes por todo el mundo,
              de manera que ayudarán a otros a poder escoger sus proximos viajes
              o lugares que no conocian y empezar a encontrar lugares populares y preciosos"</p>
          </Col>
        </Row>
        <hr />
        <Row className="Footibar_Copyright">
          <p>© 2024 Travelers Talks</p>
        </Row>
      </Container>
    </footer>
  );
}

export default Footibar;