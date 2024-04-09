import React from "react";
import '../Estilos/MisFavoCuerpo.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import FiltroLateral from "./FiltroDerecho.jsx";
import PublicDisplay from "./PublicacionDisplay.jsx";
import { Row, Col } from 'react-bootstrap';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";

function InicioCuerpo() {
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
              <PublicDisplay
                NombreUsu={'KFecito09'}
                ImagenUsu={'WillamDeVerde.jpg'}
                Fecha={'12/12/12'}
                Pais={'Bandera.png'}
                Contenido={'Lorem Ipsum Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... No hay nadie que ame el dolor mismo, que lo busque, lo encuentre y lo quiera, simplemente porque es el dolor.'}
                Imagen1={'Registro_BG.jpg'}
                Imagen2={'Logo.png'}
                Imagen3={'Paisaje.jpg'}
                Tipo={'Ajeno'}
              />
              <PublicDisplay
                NombreUsu={'KFecito09'}
                ImagenUsu={'WillamDeVerde.jpg'}
                Fecha={'12/12/12'}
                Pais={'Bandera.png'}
                Contenido={'Lorem Ipsum Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... No hay nadie que ame el dolor mismo, que lo busque, lo encuentre y lo quiera, simplemente porque es el dolor.'}
                Imagen1={'Registro_BG.jpg'}
                Imagen2={'Logo.png'}
                Imagen3={'Paisaje.jpg'}
                Tipo={'Ajeno'}
              />
              <PublicDisplay
                NombreUsu={'KFecito09'}
                ImagenUsu={'WillamDeVerde.jpg'}
                Fecha={'12/12/12'}
                Pais={'Bandera.png'}
                Contenido={'Lorem Ipsum Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... No hay nadie que ame el dolor mismo, que lo busque, lo encuentre y lo quiera, simplemente porque es el dolor.'}
                Imagen1={'Registro_BG.jpg'}
                Imagen2={'Logo.png'}
                Imagen3={'Paisaje.jpg'}
                Tipo={'Ajeno'}
              />
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
