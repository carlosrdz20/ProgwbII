import React, { useState, useEffect } from "react";
import '../Estilos/PerfilCuerpo.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import { Row, Col, Container } from 'react-bootstrap';
import PublicDisplay from "./PublicacionDisplay.jsx";
import axios from "axios";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiSolidFoodMenu } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";


function PerfilAjenoCuerpo() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [seguidores, setSeguidores] = useState();
  const [seguidos, setSeguidos] = useState();
  const [foto, setFoto] = useState();
  const [publicaciones, setPublicaciones] = useState([]);
  const [sigue, setSigue] = useState()
  const [textoSeguir, setTextoSeguir] = useState('+ Seguir')

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Si no hay token, redirigir al usuario a la página de inicio
    if (!token) {
      navigate("/");
    }
    else{
      const userData = localStorage.getItem('user');
      const user = JSON.parse(userData);
      console.log("Usuario ID: ", user._id);
      const buscarUsuario = async () => {
        try {
          const response = await axios.get(`http://localhost:4200/usuarioAjeno?userId=${localStorage.getItem('usuAjeno')}&sessionID=${user._id}`, {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('token')
            }
          });
      
          if (response.status === 200) {
            const { usuario, seguidores, seguidos, sigue } = response.data;
            
            // Llenar los datos del usuario
            setUsername(usuario.NombreUsuario);
            setFoto(usuario.Foto);
            // Llenar los datos de seguidores y seguidos
            setSeguidores(seguidores);
            setSeguidos(seguidos);
            setSigue(sigue);
            if(sigue === 1){
              setTextoSeguir('Siguiendo');
            }else{
              setTextoSeguir('+ Seguir');
            }
            console.log("Sigue: ", sigue);
          } else {
            console.error('Error en la búsqueda:', response.status);
          }
        } catch (error) {
          console.error('Error fatal en búsqueda:', error);
        }
      };
  
      const ajenoPub = async () => {
            axios.get(`http://localhost:4200/mpubAjeno/${localStorage.getItem('usuAjeno')}/${user.IDUsuario}/${user._id}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') 
        }
      })
        .then(response => {
          setPublicaciones(response.data);
          console.log("Se insertaron las publicaciones");
        })
        .catch(error => {
          console.error('Error al obtener las publicaciones:', error);
        });
      }
  
      buscarUsuario();
      ajenoPub();
    }

  }, []); // Ejecutar una vez al cargar el componente

  const handleSeguirClick = async () => {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    console.log("Usuario ID: ", user._id);

    const data = {
      IDSeguidor: user._id,
      IDSeguido: localStorage.getItem('usuAjeno')
    };

    try {
      console.log(data.IDSeguidor);
      console.log(data.IDSeguido);
      await axios.post('http://localhost:4200/insertarSeguimiento', data, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
		  console.log('Guardado agregado correctamente');
      if(textoSeguir === '+ Seguir'){
        setTextoSeguir('Siguiendo');
      }else{
        setTextoSeguir('+ Seguir');
      }
		} catch (error) {
		  console.error('Error al agregar el guardado:', error);
		}
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="Cuerpo">
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

          <Col xs={8} md={6} style={{padding:'20px'}}>
            <Container className="PerfilAjenoCuerpo">
              <Row>
                <Col xs={12}>
                  <Container fluid>
                    <Row style={{alignItems:'center'}}>
                      <Col xs={4}>
                        <div>
                          <label>Seguidores</label>
                        </div>
                        <div>
                          <label>{seguidores}</label>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div>
                          <label className="PerfilAjenoUsuario">{username}</label> 
                        </div>
                        <div className="FPcontainer">
                          <img src={`/Imagenes/${foto}`} alt="" className="FPImg" />
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div>
                          <label>Seguidos</label>                          
                        </div>
                        <div>
                          <label>{seguidos}</label>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col xs={12}>
                  <button onClick={handleSeguirClick}> {textoSeguir} </button>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
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
                    Tipo="mpubAjeno"
                    Saved={publicacion.Saved}
                    Pagina = "Inicio"
                    Calificacion ={publicacion.Calificacion}
                    PromCalificacion={publicacion.PromedioCalificaciones}
                    idUsuario={publicacion.usuario._id}
                    />
                    ))}
                </Col>
              </Row>
            </Container>
          </Col>

        </Row>
      </Container>
    </div>
  );
}

export default PerfilAjenoCuerpo;
