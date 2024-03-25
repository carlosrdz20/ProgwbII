import React, { useState } from "react";
import '../Estilos/InicioCuerpo.css';
import DestPopu from "./DestPopu.jsx";
import MenuLateral  from "./MenuIzquierdo.jsx";
import PublicDisplay from "./PublicacionDisplay.jsx";
import { Row, Col } from 'react-bootstrap';
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";

function InicioCuerpo() {
  const [ UsuIni ] = useState(true);

  return (
    <div className="Cuerpo">
      <Row>
        <Col className="Izquierdo" xs={12} md={12} lg={3}>
          <MenuLateral pagina={'Inicio'} />
        </Col>

        <Col className="Centro" xs={12} sm={12} md={12} lg={6}>
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
              <PublicDisplay
                NombreUsu={'KFecito09'}
                ImagenUsu={'WillamDeVerde.jpg'}
                Fecha={'12/12/12'}
                Pais={'Bandera.png'}
                Contenido={'Lorem Ipsum Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... No hay nadie que ame el dolor mismo, que lo busque, lo encuentre y lo quiera, simplemente porque es el dolor.'}
                Imagen={'Registro_BG.jpg'}
                Tipo={'Ajeno'}
              />
              <PublicDisplay
                NombreUsu={'Carlangas72'}
                ImagenUsu={'Cato.jpg'}
                Fecha={'12/12/12'}
                Pais={'Bandera.png'}
                Contenido={'Lorem Ipsum Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... No hay nadie que ame el dolor mismo, que lo busque, lo encuentre y lo quiera, simplemente porque es el dolor.'}
                Imagen={'Registro_BG.jpg'}
                Tipo={'Propio'}
              />
              <PublicDisplay
                NombreUsu={'Carlangas72'}
                ImagenUsu={'Cato.jpg'}
                Fecha={'12/12/12'}
                Pais={'Bandera.png'}
                Contenido={'Lorem Ipsum Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... No hay nadie que ame el dolor mismo, que lo busque, lo encuentre y lo quiera, simplemente porque es el dolor.'}
                Imagen={'Registro_BG.jpg'}
                Tipo={'Borrador'}
              />
            </Col>
          </Row>
        </Col>

        <Col className="Derecho" xs={12} sm={12} md={12} lg={3}>
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
