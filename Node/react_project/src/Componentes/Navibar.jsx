import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';
import '../Estilos/Navibar.css';
import LogoBoton from './LogoBoton.jsx';
import NavibarUsuario from './NavibarUsuario.jsx';
import Buscador from './Buscador.jsx';

function Navibar() {
  return (
    <nav className='Navbar'>
      <Container className='MyContainerNavibar'>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={2} lg={2} className='NavbarLogo'>
            <LogoBoton Imagen={'favicon.ico'} />
          </Col>
          <Col xs={12} md={7} lg={7}>
            <Buscador />
          </Col>
          <Col xs={12} md={4} lg={3}>
            <NavibarUsuario Nombre={'Usuario'} Imagen={'Perfil.png'} />
          </Col>
        </Row>
      </Container>
    </nav>
  );
}

export default Navibar;
