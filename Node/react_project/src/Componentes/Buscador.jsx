import { FaSearch } from "react-icons/fa";
import { Form, Button, Modal, Container } from 'react-bootstrap';
import '../Estilos/Buscador.css'
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Buscador({actualizarPublicaciones}) {

  const [texto, setTexto] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [paises, setPaises] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [paisSeleccionado, setPaisSeleccionado] = useState(1); //puse el ID 1 de inicio por si nunca entra al handleChange

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === 'texto') {
      setTexto(value);
    }
    else if (name === 'FiltroPais') {
      setPaisSeleccionado(value);
    } else if (name === 'FiltroFeIni') {
      setFechaInicio(value);
    } else if (name === 'FiltroFeFin') {
      setFechaFin(value);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:4200/tpaises')
        .then(response => {
            setPaises(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los países:', error);
        });
  }, []);

  const busquedaNormal = () => {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    
      axios.get(`http://localhost:4200/busquedaPublicaciones/${user.IDUsuario}/${user._id}?textoBusqueda=${texto}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') 
        }
      })
        .then(response => {
          const nuevasPublicaciones = response.data;
          // Llamar a la función de callback para actualizar las publicaciones en MisFavoCuerpo
          actualizarPublicaciones(nuevasPublicaciones);
          console.log("Se insertaron las publicaciones filtradas");
        })
        .catch(error => {
          console.error('Error al obtener las publicaciones filtradas:', error);
        });

  };

  const busquedaAvanzada = () => {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    
      axios.get(`http://localhost:4200/busquedaAvanzada/${user.IDUsuario}/${user._id}?textoBusqueda=${texto}&fechaInicio=${fechaInicio}&fechaFin==${fechaFin}&paisSeleccionado=${paisSeleccionado}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token') 
        }
      })
        .then(response => {
          const nuevasPublicaciones = response.data;
          // Llamar a la función de callback para actualizar las publicaciones en MisFavoCuerpo
          actualizarPublicaciones(nuevasPublicaciones);
          console.log("Se insertaron las publicaciones filtradas");
          toggleModal()
        })
        .catch(error => {
          console.error('Error al obtener las publicaciones filtradas:', error);
        });

  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <Container fluid className='BuscadorContenedor'>
      <div className='Barra'>
        <Button className='btn btn-primary' onClick={busquedaNormal}> <FaSearch size={"15px"} /> </Button>
        <input type="search" placeholder='Buscar' className='BarraBuscador' aria-label='Buscar' name="texto" value={texto} onChange={handleChange}/>
      </div>
      <div>
        <button className='btn btn-primary Navbar_Buscador_BusAvan' onClick={toggleModal}> Búsqueda Avanzada </button>
      </div>
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Búsqueda Avanzada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="Filtros">
            <div className="FiltrosDiv">
              <p>Texto de Búsqueda: </p>
              <input type="text" name="texto" value={texto} onChange={handleChange} />
            </div>
            <div className="FiltrosDiv">
              <p>Fecha Inicial: </p>
              <input type="date" name="FiltroFeIni" value={fechaInicio} onChange={handleChange} />
            </div>
            <div className="FiltrosDiv">
              <p>Fecha Final: </p>
              <input type="date" name="FiltroFeFin" value={fechaFin} onChange={handleChange} />
            </div>
            <div className="FiltrosDiv">
              <p>País: </p>
              <select name="FiltroPais" value={paisSeleccionado} onChange={handleChange}>
              {paises.map(pais => (
            <option key={pais.idPais} value={pais.idPais}>{pais.pais}</option>
          ))}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={busquedaAvanzada}>
            Buscar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}