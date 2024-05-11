import '../Estilos/PerfilCuerpo.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from '../Context/UserContext';
import useAuth from '../Context/useAuth';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiSolidFoodMenu } from "react-icons/bi";

function PerfilCuerpo() {

  const { user } = useAuth();
  const [fechaFormateada, setFecha] = useState();
  const [fotoxd, setFotoxd] = useState();
  const [user2, setuser2] = useState();

  useEffect(() => {
    if (user) {
      setuser2(user);
      // Formatear la fecha
      setFecha(user.FechaNacimiento.split('T')[0]);
      setFotoxd(`/Imagenes/${user.Foto}`);
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className='Cuerpo'>
      <Container fluid>
        <Row>
          <Col xs={2} md={3}>
            <Container fluid>
              <button variant="primary" className="d-lg-none" onClick={handleShow}>
                <BiSolidFoodMenu size={25}/>
              </button>
            </Container>

            <Offcanvas show={show} onHide={handleClose} responsive="lg" className="bodycanvas">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <MenuLateral/>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>

          <Col xs={10} md={9} style={{padding:'20px'}}>
            <Container className='PerfilCuerpo'>
              <Row>
                <Col xs={8} style={{marginTop:'30px'}}>
                  <Container fluid>
                    <Row>
                      <Col xs={12} className='PerfilCol'>
                        <Container fluid>
                          <Row>
                            <Col xs={12} md={6}>
                              <label>Nombre de usuario: </label>
                              <input type="text" id="Usuario" className="InputPerfil" name="NombreUsuario" defaultValue={user.NombreUsuario} disabled/>
                            </Col>
                            <Col xs={12} md={6}>
                              <label>Correo electronico: </label>
                              <input type="text" id="Correo" className="InputPerfil" name="Correo" defaultValue={user.Correo} disabled/>  
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                      <Col xs={12} className='PerfilCol'>
                        <Container fluid>
                          <Row>
                            <Col xs={12} md={6}>
                              <label>Nombre completo: </label>
                              <input type="text" id="Nombre" className="InputPerfil" name="Nombre" defaultValue={user.Nombre} disabled/>
                            </Col>
                            <Col xs={12} md={6}>
                              <div>
                                <label>Genero: </label>                                
                              </div>
                              <select id="Combobox" className="Combobox" name="Genero" defaultValue={user.Genero === 'masculino' ? "masculino" : "femenino"} disabled>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                              </select>
                            </Col>
                          </Row>  
                        </Container>
                      </Col>
                      <Col xs={12} className='PerfilCol'>
                        <Container fluid>
                          <Row>
                            <Col xs={12} md={6}>
                              <label>Contraseña actual: </label>
                              <input type="text" id="Password" className="InputPerfil" name="Contrasena" defaultValue={user.Contrasena} disabled/>
                            </Col>
                            <Col xs={12} md={6}>
                              <label>Fecha de nacimiento: </label>
                              <input type="date" id="fecha" className="InputPerfil" name="FechaNacimiento" defaultValue={fechaFormateada} disabled/>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col xs={4}>
                  <Container fluid>
                    <Row>
                      <Col xs={12}>
                        <Col xs={12}>
                          <label class="input-label">Foto de Perfil: </label>
                        </Col>
                        <Col xs={12}>
                          <div className='FPcontainer'>
                            <img
                              className='FPImg'
                              src={fotoxd}
                              alt="Foto de Perfil"
                            />
                          </div>
                        </Col>                      
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col xs={12} className='PerfilBotones'>
                  <Link to={"/EditarPerfil"}>
                    <button>Editar Perfil</button> 
                  </Link>
                </Col>
              </Row>
            </Container>
          </Col>

        </Row>
      </Container>
    </div>

  );
}

export default PerfilCuerpo;
