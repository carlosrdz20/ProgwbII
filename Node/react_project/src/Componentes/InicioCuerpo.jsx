import React, { useState, useEffect } from "react";
import '../Estilos/InicioCuerpo.css';
import DestPopu from "./DestPopu.jsx";
import MenuLateral  from "./MenuIzquierdo.jsx";
import PublicDisplay from "./PublicacionDisplay.jsx";
import { Row, Col } from 'react-bootstrap';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import axios from "axios";

function InicioCuerpo() {
  const [ UsuIni ] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Realiza la solicitud para obtener las publicaciones cuando el componente se monta
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    axios.get(`http://localhost:4200/tpublicaciones/${user.IDUsuario}`)
      .then(response => {
        setPublicaciones(response.data);
        console.log("Se insertaron las publicaciones");
      })
      .catch(error => {
        console.error('Error al obtener las publicaciones:', error);
      });
  }, []);

  return (
    <div className="Cuerpo">
      <Row>
        <Col className="Izquierdo" xs={12} md={12} lg={3} xl={3}>
          <MenuLateral pagina={'Inicio'} />
        </Col>

        <Col className="Centro" xs={12} sm={12} md={12} lg={6} xl={6}>
          <Row>
          {UsuIni ? (
            <>
              <Col className="CentroBot" md={3}>
                <button>Para ti</button>
                <button>Siguiendo</button>
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
            />
            ))}
            </Col>
          </Row>
        </Col>

        <Col className="Derecho" xs={12} sm={12} md={12} lg={3} xl={3}>
          <div className="DestiPopus">
            <h1>"Destinos Populares"</h1>
            <div className="Paises">
              <DestPopu Num={"1"} Pais={'México'} Imagen={'/Imagenes/bandera.png'}/>
              <DestPopu Num={"2"} Pais={'Japon'} Imagen={'/Imagenes/japon.png'}/>
              <DestPopu Num={"3"} Pais={'Francia'} Imagen={'Imagenes/espana.png'}/>
              <DestPopu Num={"4"} Pais={'Alemania'} Imagen={'/Imagenes/canada.png'}/>
              <DestPopu Num={"5"} Pais={'Korea'} Imagen={'Imagenes/alemania.png'}/>              
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default InicioCuerpo;
