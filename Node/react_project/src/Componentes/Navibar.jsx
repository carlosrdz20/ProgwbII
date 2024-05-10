import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Estilos/Navibar.css'
import { Link } from 'react-router-dom';
import useAuth from '../Context/useAuth';
import NavibarUsuario from './NavibarUsuario.jsx';
import { Navbar, Container } from 'react-bootstrap';

function Navibar() {

  const { user } = useAuth();

  return (
    <Navbar className='Navibar'>
      <Container fluid>
      <Navbar.Brand href="/Inicio" className='LogoNavibar'>              
              <img 
                src={`Imagenes/favicon.ico`}
                className='logoBoton' 
                alt={'Logo'}
              />
              <h1>
                TravelersTalks
              </h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {user && (
              <NavibarUsuario
                Nombre={user.NombreUsuario} 
                Imagen={user.Foto}
                Iniciado={true}
              />
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
}

export default Navibar;
