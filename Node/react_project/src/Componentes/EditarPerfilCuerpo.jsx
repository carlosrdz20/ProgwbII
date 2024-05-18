import '../Estilos/PerfilCuerpo.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import { Row, Col, Container } from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuth from '../Context/useAuth';
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiSolidFoodMenu } from "react-icons/bi";

function EditarPerfilCuerpo() {
  const navigate = useNavigate();
  const [fechaFormateada, setFecha] = useState();
  const [fotoxd, setFotoxd] = useState();
  const [user2, setuser2] = useState();
  const { user, logout, login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setuser2(user);
      // Formatear la fecha
      console.log(user.FechaNacimiento);
      setFecha(user.FechaNacimiento.split('T')[0]);
      setFotoxd(`/Imagenes/${user.Foto}`);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === "file") {
      setuser2((prevData) => ({
        ...prevData,
        [name]: files[0] 
      }));
      setFotoxd(URL.createObjectURL(files[0]));
    } else {
      // Si el nombre del campo es "FechaNacimiento", validar la fecha
      if (name === "FechaNacimiento") {
        const selectedDate = new Date(value);
        const minDate = new Date("2007-01-01");
  
        if (selectedDate > minDate) {
          // Si la fecha seleccionada es posterior al 1 de enero de 2007, mostrar un mensaje de error
          alert("Debes poner una fecha anterior al 2007.");
          return; // Detener la ejecución
        }
      }
  
      setuser2((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
    console.log(user2);
    // Actualizar el estado formData
    setFormData({
      email: user2.Correo,
      password: user2.Contrasena
    });
  };  

  // Función para enviar el formulario y realizar las validaciones
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Editando perfil",user2);
    try {
      // Enviar los datos del formulario al servidor
      //FALTA CAMBIAR RUTA
      const response = await axios.put('http://localhost:4200/editarPerfil', user2, {headers:{'Content-Type': 'multipart/form-data', 'authorization': 'Bearer ' + localStorage.getItem('token')}});
      
      console.log(response.data);
      try {
        const response = await axios.post('http://localhost:4200/autentUsuario', formData);
  
        if (response.status === 200) {
          console.log("Datos del usuario:");
          console.log(response.data);
          login(response.data, response.data.token)
          navigate('/Inicio')
        } else {
          alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert(error.response.data.error);
      }
      alert('Perfil actualizado exitosamente');
      
    } catch (error) {
      console.error('Error al editar perfil:', error);
      alert(error.response.data.error);
    }
    
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='Cuerpo'>
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

          <Col xs={10} md={9} style={{padding:'20px'}}>
            <Container className='PerfilCuerpo'>
              <Row>
              <Col xs={8} style={{marginTop:'30px'}}>
                  <Container fluid>
                    <Row>
                      <Col xs={12} className='PerfilCol'>
                        <Container fluid>
                          <Row>
                            <Col xs={12} md={6}>
                              <label>Nombre de usuario: </label>
                              <input type="text" id="Usuario" className="InputPerfil" name="NombreUsuario" defaultValue={user.NombreUsuario} onChange={handleChange}/>
                            </Col>
                            <Col xs={12} md={6}>
                              <label>Correo electronico: </label>
                              <input type="text" id="Correo" className="InputPerfil" name="Correo" defaultValue={user.Correo} onChange={handleChange}/>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                      <Col xs={12} className='PerfilCol'>
                        <Container fluid>
                          <Row>
                            <Col xs={12} md={6}>
                              <label>Nombre completo: </label>
                              <input type="text" id="Nombre" className="InputPerfil" name="Nombre" defaultValue={user.Nombre} onChange={handleChange}/>
                            </Col>
                            <Col xs={12} md={6}>
                              <div>
                                <label>Genero: </label>                                
                              </div>
                              <select id="Combobox" className="Combobox" name="Genero" defaultValue={user.Genero === 'masculino' ? "masculino" : "femenino"} onChange={handleChange}>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                              </select>
                            </Col>
                          </Row>  
                        </Container>
                      </Col>
                      <Col xs={12} className='PerfilCol'>
                        <Container fluid>
                          <Row>
                            <Col xs={12} md={6}>
                              <label>Contraseña actual: </label>
                              <input type="text" id="Password" className="InputPerfil" name="Contrasena" defaultValue={user.Contrasena} onChange={handleChange}/>
                            </Col>
                            <Col xs={12} md={6}>
                              <label>Fecha de nacimiento: </label>
                              <input type="date" id="fecha" className="InputPerfil" name="FechaNacimiento" defaultValue={fechaFormateada} onChange={handleChange}/>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col xs={4}>
                  <Container fluid>
                    <Row>
                      <Col xs={12}>
                        <Col xs={12}>
                          <label class="input-label">Foto de Perfil: </label>
                          <input type="file"  name="Foto" accept="image/*" onChange={handleChange}></input>
                        </Col>
                        <Col xs={12}>
                          <div className='FPcontainer' style={{marginTop:'10px'}}>
                            <img
                              className='FPImg'
                              src={fotoxd}
                              alt="Foto de Perfil"
                            />
                          </div>
                        </Col>                      
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col xs={12} className='PerfilBotones'>
                  <button onClick={handleSubmit}>Aceptar cambios</button>  
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditarPerfilCuerpo;
