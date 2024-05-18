import React, { useState, useEffect } from "react";
import '../Estilos/InicioCuerpo.css';
import PublicDisplay from "./PublicDisplayInvitado.jsx";
import { Row, Col, Container } from 'react-bootstrap';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function InicioCuerpo() {
  const navigate = useNavigate();
  const [ UsuIni ] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);
  const [topPaises, setTopPaises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [vistaPublicaciones, setVistaPublicaciones] = useState('inicio');
  const [vistaPublicacionesB, setVistaPublicacionesB] = useState('inicio');
  const [FechaInicioBusqueda, setFechaInicioBusqueda] = useState('');
  const [FechaFinBusqueda, setFechaFinBusqueda] = useState('');
  const [paisBusqueda, setPaisBusqueda] = useState(1);
  const [textoBusquedaAvanzada, setTextoBusquedaAvanzada] = useState('');
  

  useEffect(() => {

      axios.get(`http://localhost:4200/invitado`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') 
        }
      })
        .then(response => {
          setPublicaciones(response.data.publicaciones);
          console.log("Se insertaron las publicaciones");
        })
        .catch(error => {
          console.error('Error al obtener las publicaciones:', error);
          alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
          navigate('/')
        });
  
    

    
  }, []);
  return (
    
    <div className="Cuerpo">
      <Container fluid>
        <Row>
        

          <Link to ="/">Regístrate o Inicia Sesión</Link>
          
          <Col xs={8} lg={6}>
            <Container>
            <Row >

                    <Col xs={12}>
                    </Col>
                    <Col xs={12}>
                      <Container fluid className="Paginacion">
                      </Container>
                    </Col>
                  
                
                <Col xs={12}>
                  {publicaciones.map(publicacion => (
                    <PublicDisplay
                      IDPublicacion={publicacion.IDPublicacion}
                      NombreUsu={publicacion.usuario.NombreUsuario}
                      ImagenUsu={publicacion.usuario.Foto}
                      Fecha={publicacion.FechaPub}
                      Pais={publicacion.pais.imagen}
                      Titulo={publicacion.Titulo}
                      Contenido={publicacion.Descripcion}
                      Imagen1={publicacion.ImagenUno}
                      Imagen2={publicacion.ImagenDos}
                      Imagen3={publicacion.ImagenTres}
                      Tipo="Propio"
                      Pagina = "Inicio"
                      PromCalificacion={publicacion.PromedioCalificaciones}
                      idUsuario={publicacion.usuario._id}
                      
                    />
                  ))}
                </Col>
              </Row>
            </Container>
          </Col>
          
          <Col xs={2} lg={3}>
            <Container fluid>
           
            </Container>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InicioCuerpo;
