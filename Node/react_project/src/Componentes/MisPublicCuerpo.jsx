import React, { useState, useEffect } from "react";
import '../Estilos/MisPublicCuerpo.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import FiltroLateral from "./FiltroDerecho.jsx";
import PublicDisplay from "./PublicacionDisplay.jsx";
import { Row, Col } from 'react-bootstrap';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Context/useAuth';

function InicioCuerpo() {
  const navigate = useNavigate();
  const [mispublicaciones, setMisPublicaciones] = useState([]);
  const { logout } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    // Realiza la solicitud para obtener las publicaciones cuando el componente se monta
    axios.get(`http://localhost:4200/mispublicaciones/${user.IDUsuario}`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token') 
      }
    })
      .then(response => {
        setMisPublicaciones(response.data);
        console.log("Se insertaron las publicaciones");
      })
      .catch(error => {
        console.error('Error al obtener las publicaciones:', error);
        logout();
        alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
        navigate('/');
      });
  }, []);

  return (
    <div className="Cuerpo">
      <Row>
        <Col className="Izquierdo" xs={12} md={12} lg={3}>
          <MenuLateral pagina={'Publicaciones'}/>        
        </Col>

        <Col className="Centro" xs={12} sm={12} md={12} lg={6}>
          <Row>
            <Col md={12} className="PaginacionCol">
              <div className="Paginacion">
                <button> <RiArrowLeftCircleFill size={50}/> </button>
                <button> 1 </button>
                <button> 2 </button>
                <button> 3 </button>
                <button> <RiArrowRightCircleFill size={50}/> </button>
              </div>
            </Col>
            <Col lg={12}>
            {mispublicaciones.map(publicacion => (
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
            />
            ))}
            </Col>
          </Row>
        </Col>

        <Col className="Derecho" xs={12} sm={12} md={12} lg={3}>
          <FiltroLateral />
        </Col>
      </Row>
    </div>
  );
}

export default InicioCuerpo;
