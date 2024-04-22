import React, { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Estilos/MisFavoCuerpo.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import FiltroLateral from "./FiltroDerecho.jsx";
import PublicDisplay from "./PublicacionDisplay.jsx";
import { Row, Col } from 'react-bootstrap';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import axios from "axios";
import useAuth from '../Context/useAuth';

function MisFavoCuerpo() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  

  const [ UsuIni ] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    // Realiza la solicitud para obtener las publicaciones cuando el componente se monta
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    axios.get(`http://localhost:4200/misfavoritos/${user.IDUsuario}`, {
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
  }, []);

  const actualizarPublicaciones = (nuevasPublicaciones) => {
    setPublicaciones(nuevasPublicaciones);
  };  

  return (
    <div className="Cuerpo">
      <Row>
        <Col className="Izquierdo" xs={12} md={12} lg={3}>
          <MenuLateral pagina={'Favoritos'}/>
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
              {publicaciones.length === 0 ? (
                  <div className="">
                    <img src={"/Imagenes/error.jpg"} alt="No tienes favoritos" style={{ marginLeft: '200px' }}/>
                    <h1>No tienes favoritos aún. ¡Explora y guarda tus publicaciones favoritas!</h1>
                  </div>
                ) : (
                  publicaciones.map(publicacion => (
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
                      Tipo={"Ajeno"}
                      Saved={true}
                      Pagina = "MisFavoritos"
                    />
                  ))
                )}
            </Col>
          </Row>
        </Col>

        <Col className="Derecho" xs={12} sm={12} md={12} lg={3}>
          <FiltroLateral actualizarPublicaciones={actualizarPublicaciones}/>
        </Col>
      </Row>
    </div>
  );
}

export default MisFavoCuerpo;
