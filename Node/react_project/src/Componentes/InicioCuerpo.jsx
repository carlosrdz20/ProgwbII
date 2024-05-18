import React, { useState, useEffect } from "react";
import '../Estilos/InicioCuerpo.css';
import DestPopu from "./DestPopu.jsx";
import MenuLateral  from "./MenuIzquierdo.jsx";
import PublicDisplay from "./PublicacionDisplay.jsx";
import { Row, Col, Container } from 'react-bootstrap';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaFlag } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Context/useAuth';
import Buscador from './Buscador.jsx';
import Offcanvas from 'react-bootstrap/Offcanvas';

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
  const { logout } = useAuth();

  useEffect(() => {
    

    if(localStorage.getItem('token')){
      const userData = localStorage.getItem('user');
      const user = JSON.parse(userData);
      let requestUrl = '';
      if(vistaPublicaciones === 'inicio' && vistaPublicacionesB !== 'busqueda' && vistaPublicacionesB !== 'busquedaAvanzada'){
        requestUrl =`http://localhost:4200/tpublicaciones/${user.IDUsuario}/${user._id}`;
      }else if(vistaPublicaciones === 'siguiendo' && vistaPublicacionesB !== 'busqueda' && vistaPublicacionesB !== 'busquedaAvanzada'){
        requestUrl = `http://localhost:4200/mpubSeguidos/${user.IDUsuario}/${user._id}`;
      }else if(vistaPublicacionesB === 'busqueda'){
        requestUrl = `http://localhost:4200/busquedaPublicaciones/${user.IDUsuario}/${user._id}?textoBusqueda=${textoBusqueda}`;
      }else if(vistaPublicacionesB === 'busquedaAvanzada'){
        requestUrl = `http://localhost:4200/busquedaAvanzada/${user.IDUsuario}/${user._id}?textoBusqueda=${textoBusquedaAvanzada}&fechaInicio=${FechaInicioBusqueda}&fechaFin==${FechaFinBusqueda}&paisSeleccionado=${paisBusqueda}`;
      }
      if(vistaPublicaciones === 'inicio' && vistaPublicacionesB !== 'busqueda' && vistaPublicacionesB !== 'busquedaAvanzada'){
        axios.get(`${requestUrl}?page=${currentPage}&limit=${limitPerPage}`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token') 
          }
        })
          .then(response => {
            setPublicaciones(response.data.publicaciones);
            setTotalPages(response.data.totalPages)
            console.log("Se insertaron las publicaciones");
          })
          .catch(error => {
            console.error('Error al obtener las publicaciones:', error);
            logout();
            alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
            navigate('/')
          });
    
          axios.get(`http://localhost:4200/topPaises`, {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('token') 
            }
          })
            .then(response => {
              setTopPaises(response.data);
              console.log("Se insertaron las publicaciones");
            })
            .catch(error => {
              console.error('Error al obtener las publicaciones:', error);
            });
      }else if(vistaPublicaciones === 'siguiendo' && vistaPublicacionesB !== 'busqueda'){
        axios.get(`${requestUrl}?page=${currentPage}&limit=${limitPerPage}`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token') 
          }
        })
          .then(response => {
            setPublicaciones(response.data.publicaciones);
            setTotalPages(response.data.totalPages)
            console.log("Se insertaron las publicaciones");
          })
          .catch(error => {
            console.error('Error al obtener las publicaciones:', error);
            logout();
            alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
            navigate('/')
          });
    
          axios.get(`http://localhost:4200/topPaises`, {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('token') 
            }
          })
            .then(response => {
              setTopPaises(response.data);
              console.log("Se insertaron las publicaciones");
            })
            .catch(error => {
              console.error('Error al obtener las publicaciones:', error);
            });
      }else if(vistaPublicacionesB === 'busqueda' || vistaPublicacionesB === 'busquedaAvanzada'){
        axios.get(`${requestUrl}&page=${currentPage}&limit=${limitPerPage}`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token') 
          }
        })
          .then(response => {
            setPublicaciones(response.data.publicaciones);
            setTotalPages(response.data.totalPages);
            console.log("Se insertaron las publicaciones");
          })
          .catch(error => {
            console.error('Error al obtener las publicaciones:', error);
            logout();
            alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
            navigate('/')
          });
    
          axios.get(`http://localhost:4200/topPaises`, {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('token') 
            }
          })
            .then(response => {
              setTopPaises(response.data);
              console.log("Se insertaron las publicaciones");
            })
            .catch(error => {
              console.error('Error al obtener las publicaciones:', error);
            });
      }
    }else{
      navigate("/");
    }

    
  }, [currentPage,vistaPublicaciones]);
  
    // Función para manejar el cambio de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
  
    // Función para retroceder a la página anterior
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    // Función para avanzar a la siguiente página
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    // Generar los botones de página dinámicamente
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }


  const handleParati = async () => {
    setCurrentPage(1);
    setVistaPublicaciones('inicio');
    setVistaPublicacionesB('');
  };

  const handleSiguiendo = async () => {
    setVistaPublicacionesB('');
    setVistaPublicaciones('siguiendo');
    setCurrentPage(1);
  };

  const setTextoBusquedaNuevo = (nuevoTexto) =>{
      setTextoBusqueda(nuevoTexto);
      setVistaPublicacionesB('busqueda');
  }

  const setTextoBusquedaAvanzadaB = (nuevoTextoBA) =>{
      setTextoBusquedaAvanzada(nuevoTextoBA);
      setVistaPublicacionesB('busquedaAvanzada');
  }

  const setTotalPagesBusqueda = (setTotalPagesBusqueda) =>{
        setTotalPages(setTotalPagesBusqueda);
  }

  const actualizarPublicaciones = (nuevasPublicaciones) => {
    setPublicaciones(nuevasPublicaciones);
  };
  
  const setFIBusqueda = (setNewFIBusqueda) =>{
    setFechaInicioBusqueda(setNewFIBusqueda);
  }

  const setFFBusqueda = (setNewFFBusqueda) =>{
    setFechaFinBusqueda(setNewFFBusqueda);
  }

  const setPaisBusquedaS = (newPaisSeleccionado) =>{
    setPaisBusqueda(newPaisSeleccionado);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  return (
    
    <div className="Cuerpo">
      <Container fluid>
        <Row>
        {localStorage.getItem('token') && // Verifica si hay un token en el localStorage
            <Col xs={2} lg={3}>
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
                  <MenuLateral pagina={'Inicio'}/>
                </Offcanvas.Body>
              </Offcanvas>
            </Col>
          }
          
          <Col xs={8} lg={6}>
            <Container>
            <Row >
                {localStorage.getItem('token') && UsuIni ? (
                  <>                    
                    <Col xs={12}>
                      <Buscador actualizarPublicaciones={actualizarPublicaciones} setTextoBusquedaNuevo = {setTextoBusquedaNuevo} setTotalPagesBusqueda = {setTotalPagesBusqueda} setFIBusqueda = {setFIBusqueda} setFFBusqueda = {setFFBusqueda} setPaisBusquedaS = {setPaisBusquedaS} setTextoBusquedaAvanzadaB = {setTextoBusquedaAvanzadaB}  />
                    </Col>
                    <Col xs={12} md={5} className="Siguiendo">
                        <button onClick={handleParati}>Para ti</button>
                        <button onClick={handleSiguiendo}>Siguiendo</button>
                    </Col>
                    <Col xs={12} md={7}>
                    <div className="Paginacion">
                    <button onClick={handlePrevPage}><RiArrowLeftCircleFill size={30} /></button>
                    {pageButtons}
                    <button onClick={handleNextPage}><RiArrowRightCircleFill size={30} /></button>
                  </div>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={12}>
                    </Col>
                    <Col xs={12}>
                      <Container fluid className="Paginacion">
                      </Container>
                    </Col>
                  </>
                )}
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
                      Tipo={publicacion.Tipo}
                      Saved={publicacion.Saved}
                      Pagina = "Inicio"
                      Calificacion ={publicacion.Calificacion}
                      PromCalificacion={publicacion.PromedioCalificaciones}
                      idUsuario={publicacion.usuario._id}
                      Sigue={publicacion.SigueUsuario}
                    />
                  ))}
                </Col>
              </Row>
            </Container>
          </Col>
          
          <Col xs={2} lg={3}>
            <Container fluid>
              <button variant="primary" className="d-lg-none" onClick={handleShow2}>
                <FaFlag size={18}/>
              </button>              
            </Container>

            <Offcanvas show={show2} onHide={handleClose2} responsive="lg" className="bodycanvas" placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Container fluid className="DestiPopus">
                  <h1>"Destinos Populares"</h1>
                  <div className="Paises">
                    {topPaises.map((pais, index) => (
                      <DestPopu
                        key={index} // Es importante proporcionar una clave única para cada elemento en el arreglo
                        Num={index + 1} // El índice comienza en 0, por lo que sumamos 1 para obtener el número correcto
                        Pais={pais.pais}
                        Imagen={pais.imagen}
                      />
                  ))}
                  </div>      
                </Container>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default InicioCuerpo;
