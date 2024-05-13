import React, { useState, useEffect } from "react";
import MenuLateral from "./MenuIzquierdo.jsx";
import FiltroLateral from "./FiltroDerecho.jsx";
import PublicDisplay from "./PublicacionDisplay.jsx";
import { Row, Col, Container} from 'react-bootstrap';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import useAuth from '../Context/useAuth';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";

function InicioCuerpo() {
  const navigate = useNavigate();
  const [misborradores, setMisBorradores] = useState([]);
  const { logout } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    // Realiza la solicitud para obtener las publicaciones cuando el componente se monta
    axios.get(`http://localhost:4200/misborradores/${user.IDUsuario}`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token') 
      }
    })
      .then(response => {
        setMisBorradores(response.data);
        console.log("Se insertaron las publicaciones");
      })
      .catch(error => {
        console.error('Error al obtener las publicaciones:', error);
        logout();
        alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
        navigate('/');
      });
  }, []);

  const actualizarPublicaciones = (nuevasPublicaciones) => {
    setMisBorradores(nuevasPublicaciones);
  };  

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
                <MenuLateral pagina={'Borradores'}/>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>
          
          <Col xs={8} lg={6}>
            <Row>
              <Col md={12}>
                <div className="Paginacion">
                  <button> <RiArrowLeftCircleFill size={30}/> </button>
                  <button> 1 </button>
                  <button> 2 </button>
                  <button> 3 </button>
                  <button> <RiArrowRightCircleFill size={30}/> </button>
                </div>
              </Col>
              <Col md={12}>
              {misborradores.length > 0 ? (
                  misborradores.map(publicacion => (
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
                      Tipo= "Borrador"
                      Saved={publicacion.Saved}
                      Pagina = "MisPublicaciones"
                    />
                  ))
                ) : (
                  // Si no se devolvieron publicaciones, muestra una imagen de error
                  <div>
                    <img src={"/Imagenes/error.jpg"} alt="No tienes favoritos" style={{ marginLeft: '200px' }}/>
                    <h1>No tienes borradores. ¡Puedes agregar borradores para compartirlos más tarde!</h1>
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
                  <FiltroLateral actualizarPublicaciones={actualizarPublicaciones} tipoMis = {2}/>
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
