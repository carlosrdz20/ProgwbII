import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import '../Estilos/Footer.css'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


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
            <p>"Descripción"</p>
          </Col>
          <Col className="Footibar_MyCol">
            <h3>Links</h3>
            <Row>Link 1</Row>
            <Row>Link 2</Row>
            <Row>Link 3</Row>
          </Col>
          <Col className="Footibar_MyCol">
            <h3>Ayuda</h3>
            <Row>Link 1</Row>
            <Row>Link 2</Row>
            <Row>Link 3</Row>
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