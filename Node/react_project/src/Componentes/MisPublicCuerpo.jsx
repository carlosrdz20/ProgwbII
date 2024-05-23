import React, { useState, useEffect } from "react";
import MenuLateral from "./MenuIzquierdo.jsx";
import FiltroLateral from "./FiltroDerecho.jsx";
import PublicDisplay from "./PublicacionDisplay.jsx";
import { Row, Col, Container } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiSolidFoodMenu } from "react-icons/bi";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Context/useAuth';
import { FaFilter } from "react-icons/fa";

function InicioCuerpo() {
  const navigate = useNavigate();
  const [mispublicaciones, setMisPublicaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [paisFiltro, setFiltroPais] = useState(1);
  const [fechaInicio, setFiltroFI] = useState('');
  const [fechaFin, setFiltroFF] = useState('');
  const [vistaPublicaciones, setVistaPublicaciones] = useState('mispublicaciones');
  const { logout } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Si no hay token, redirigir al usuario a la página de inicio
    if (!token) {
      navigate("/");
    }
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);

    if(vistaPublicaciones === 'mispublicaciones' && token){
      console.log("Pasé por aquí");
      axios.get(`http://localhost:4200/mispublicaciones/${user.IDUsuario}?page=${currentPage}&limit=${limitPerPage}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') 
        }
      })
        .then(response => {
          setMisPublicaciones(response.data.publicaciones);
          setTotalPages(response.data.totalPages);
          console.log("Se insertaron las publicaciones");
        })
        .catch(error => {
          console.error('Error al obtener las publicaciones:', error);
          logout();
          alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
          navigate('/');
        });
    }else if(vistaPublicaciones === 'misFiltros' && token){
      axios.get(`http://localhost:4200/mpubFiltrado/${user.IDUsuario}?pais=${paisFiltro}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${currentPage}&limit=${limitPerPage}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') 
        }
      })
        .then(response => {
          setMisPublicaciones(response.data.publicaciones);
          setTotalPages(response.data.totalPages);
          console.log("Se insertaron las publicaciones");
        })
        .catch(error => {
          console.error('Error al obtener las publicaciones:', error);
          logout();
          alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
          navigate('/');
        });
    }


  }, [currentPage]);

  const actualizarPublicaciones = (nuevasPublicaciones) => {
    setMisPublicaciones(nuevasPublicaciones);
  };    

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
  
    const setFechaInicio = (newFechaInicio) =>{
      setFiltroFI(newFechaInicio);
    }

    const setFechaFin = (newFechaFin) =>{
      setFiltroFF(newFechaFin)
    }

    const setPaisFiltro = (newPaisFiltro) =>{
      setFiltroPais(newPaisFiltro)
      setVistaPublicaciones('misFiltros');
    }

    const totalPagesFiltro = (newPages) =>{
      setTotalPages(newPages);
    }
    // Generar los botones de página dinámicamente
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
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
                <MenuLateral pagina={'Publicaciones'}/>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>

          <Col xs={8} lg={6}>
            <Row>
              <Col md={12}>
                  <div className="Paginacion">
                    <button onClick={handlePrevPage}><RiArrowLeftCircleFill size={30} /></button>
                    {pageButtons}
                    <button onClick={handleNextPage}><RiArrowRightCircleFill size={30} /></button>
                  </div>
              </Col>
              <Col md={12}>
                  {mispublicaciones.length > 0 ? (
                  mispublicaciones.map(publicacion => (
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
                      Tipo= "Propio"
                      Saved={publicacion.Saved}
                      Pagina = "MisPublicaciones"
                      Calificacion ={publicacion.Calificacion}
                      PromCalificacion={publicacion.PromedioCalificaciones}
                      idUsuario={publicacion.usuario._id}
                    />
                  ))
                ) : (
                  // Si no se devolvieron publicaciones, muestra una imagen de error
                  <div>
                    <img src={"/Imagenes/error.jpg"} alt="No tienes favoritos" style={{ marginLeft: '200px' }}/>
                    <h1>No tienes publicaciones aún. ¡Comparte al mundo tus experiencias!</h1>
                  </div>
                )}
              </Col>
            </Row>
          </Col>

          <Col xs={2} lg={3}>

            <Container fluid>
              <button variant="primary" className="d-lg-none" onClick={handleShow2}>
                <FaFilter size={18}/>
              </button>              
            </Container>

            <Offcanvas show={show2} onHide={handleClose2} responsive="lg" className="bodycanvas" placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Container fluid>
                  <FiltroLateral actualizarPublicaciones={actualizarPublicaciones} tipoMis = {1} setFechaInicioF = {setFechaInicio} setFechaFinF = {setFechaFin} setPaisFiltro = {setPaisFiltro} totalPagesFiltro = {totalPagesFiltro}/> 
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
