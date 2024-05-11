import React, { useState, useEffect } from "react";
import '../Estilos/FiltroDerecho.css'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Context/useAuth';
import { Row, Col, Container } from 'react-bootstrap';

function FiltroLateral({ actualizarPublicaciones, tipoMis }){
  const navigate = useNavigate();
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(1); //puse el ID 1 de inicio por si nunca entra al handleChange
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [publicaciones, setPublicaciones] = useState([]);
  const { user } = useAuth();
  const { logout } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:4200/tpaises')
        .then(response => {
            setPaises(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los países:', error);
        });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === 'FiltroPais') {
      setPaisSeleccionado(value);
    } else if (name === 'FiltroFeIni') {
      setFechaInicio(value);
    } else if (name === 'FiltroFeFin') {
      setFechaFin(value);
    }
  };

  const aplicarFiltros = () => {
    //Verificar si existe la fecha de inicio
    if(!fechaInicio){
      alert("Seleccione una fecha inicial.");
      return;
    }
    //Verificar si existe la fecha de fin
    if(!fechaFin){
      alert("Seleccione una fecha final.");
      return;
    }
    // Verificar si la fecha inicial es mayor que la fecha final
    if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
      alert("La fecha inicial no puede ser mayor que la fecha final");
      return;
    }
    
    if(tipoMis === 3){
      axios.get(`http://localhost:4200/misfavoritosfiltrados/${user.IDUsuario}?pais=${paisSeleccionado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
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
          logout();
          alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
          navigate('/')
        });
    }else if(tipoMis === 2){
      axios.get(`http://localhost:4200/mborradoresFiltro/${user.IDUsuario}?pais=${paisSeleccionado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
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
          logout();
          alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
          navigate('/')
        });
    }else if(tipoMis === 1){
      axios.get(`http://localhost:4200/mpubFiltrado/${user.IDUsuario}?pais=${paisSeleccionado}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
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
          logout();
          alert("La sesión ya expiró, por favor vuelve a iniciar sesión")
          navigate('/')
        });
    }

  };
  

  return (
    <Container fluid className="Filtros">
      <Row>
        <Col md={12}>
          <h1>Filtros</h1>
        </Col>
        <Col md={12} style={{textAlign: 'center'}}>
          <p>Fecha Inicial: </p>
          <input type="date" id="FiltroFeIni" name="FiltroFeIni" value={fechaInicio} onChange={handleChange} />
        </Col>
        <Col md={12} style={{textAlign: 'center'}}>
          <p>Fecha Final: </p>
          <input type="date" id="FiltroFeFin" name="FiltroFeFin" value={fechaFin} onChange={handleChange} />
        </Col>
        <Col md={12} style={{textAlign: 'center'}}>
          <p>País: </p>
          <select name="FiltroPais" defaultValue="" value={paisSeleccionado} onChange={handleChange}>
            {paises.map(pais => (
              <option key={pais.idPais} value={pais.idPais}>{pais.pais}</option>
            ))}
          </select>
        </Col>
        <Col md={12} style={{textAlign: 'center', marginTop: '10px'}}>
          <button onClick={() => aplicarFiltros()}>Aplicar</button>
        </Col>
      </Row>
    </Container>
  );
}

export default FiltroLateral;