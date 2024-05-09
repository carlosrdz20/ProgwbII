import React, { useState, useEffect } from "react";
import '../Estilos/InicioCuerpo.css';
import DestPopu from "./DestPopu.jsx";
import MenuLateral  from "./MenuIzquierdo.jsx";
import PublicDisplay from "./PublicacionDisplay.jsx";
import { Row, Col } from 'react-bootstrap';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Context/useAuth';
import Buscador from './Buscador.jsx';

function InicioCuerpo() {
  const navigate = useNavigate();
  const [ UsuIni ] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);
  const [topPaises, setTopPaises] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    // Realiza la solicitud para obtener las publicaciones cuando el componente se monta
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    axios.get(`http://localhost:4200/tpublicaciones/${user.IDUsuario}/${user._id}`, {
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
  }, []);
  

  const handleParati = async () => {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    axios.get(`http://localhost:4200/tpublicaciones/${user.IDUsuario}/${user._id}`, {
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
        logout();
        alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
        navigate('/')
      });
  };

  const handleSiguiendo = async () => {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    axios.get(`http://localhost:4200/mpubSeguidos/${user.IDUsuario}/${user._id}`, {
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
        logout();
        alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
        navigate('/')
      });
  };

  const actualizarPublicaciones = (nuevasPublicaciones) => {
    setPublicaciones(nuevasPublicaciones);
  };  

  

  return (
    
    <div className="Cuerpo">
      <Buscador actualizarPublicaciones={actualizarPublicaciones} />
      <Row>
        <Col className="Izquierdo" xs={12} md={12} lg={3} xl={3}>
          <MenuLateral pagina={'Inicio'} />
        </Col>

        <Col className="Centro" xs={12} sm={12} md={12} lg={6} xl={6}>
          <Row>
          {UsuIni ? (
            <>
              <Col className="CentroBot" md={3}>
                <button onClick={handleParati}>Para ti</button>
                <button onClick={handleSiguiendo}>Siguiendo</button>
              </Col>
              <Col md={9} className="PaginacionCol">
                <div className="Paginacion">
                  <button> <RiArrowLeftCircleFill size={50}/> </button>
                  <button> 1 </button>
                  <button> 2 </button>
                  <button> 3 </button>
                  <button> <RiArrowRightCircleFill size={50}/> </button>
                </div>
              </Col>
            </>
          ) : (
            <Col md={12} className="PaginacionCol">
              <div className="Paginacion">
                <button> <RiArrowLeftCircleFill size={50}/> </button>
                <button> 1 </button>
                <button> 2 </button>
                <button> 3 </button>
                <button> <RiArrowRightCircleFill size={50}/> </button>
              </div>
            </Col>
          )}
            <Col lg={12}>
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
        </Col>

        <Col className="Derecho" xs={12} sm={12} md={12} lg={3} xl={3}>
          <div className="DestiPopus">
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
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default InicioCuerpo;
