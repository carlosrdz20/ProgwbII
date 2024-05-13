import React, { useState, useEffect } from "react";
import '../Estilos/CrearPublicacion.css';
import axios from "axios";
import { Row, Col, Container } from 'react-bootstrap';
import { FaRegPaperPlane } from "react-icons/fa";
import {  BsFillEraserFill } from "react-icons/bs";
import MenuLateral from "../Componentes/MenuIzquierdo.jsx";
import { useUser } from '../Context/UserContext';
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Context/useAuth';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiSolidFoodMenu } from "react-icons/bi";

function CrearPublicacion() {
    const navigate = useNavigate();
    const [paises, setPaises] = useState([]);
    const [paisSeleccionado, setPaisSeleccionado] = useState("");
    const [usarFoto, setFoto] = useState();
    const [usarFoto2, setFoto2] = useState();
    const [usarFoto3, setFoto3] = useState();
    const { user } = useAuth();
    const { logout } = useAuth();

    const [formData, setFormData] = useState({
      Titulo: "",
      Descripcion: "",
      IDPais: 1, //puse el ID 1 de inicio por si nunca entra al handleChange
      Fotos1: null,
      Fotos2: null,
      Fotos3: null,
      Estatus: "",
      IDUsuario: user.IDUsuario
    });
    
    const handleChange = (e, input) => {
      const { name, value, type, files } = e.target;
      
        if (type === "file" && files.length > 0) {
          // Actualiza el estado formData con solo el primer archivo seleccionado
          setFormData((prevData) => ({
          ...prevData,
          [name]: files[0] // Aquí solo se toma el primer archivo
        }));

          if(input === 1){
            setFoto(URL.createObjectURL(files[0]));
          }
          if(input === 2){
            setFoto2(URL.createObjectURL(files[0]));
          }
          if(input === 3){
            setFoto3(URL.createObjectURL(files[0]));
          }
          }else {
            // Si es un campo de texto, actualizamos el estado directamente
            setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        }
        console.log(formData);
      };


      const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:4200/insertarPublicacion', formData, {headers:{'Content-Type': 'multipart/form-data', 'authorization': 'Bearer ' + localStorage.getItem('token') }})
        .then(response => {
          console.log('Publicación insertada:', response.data);
          alert("Publicación creada con éxito");
          navigate('/Inicio');
          // Puedes hacer alguna acción después de insertar la publicación, como redirigir al usuario a otra página
        })
        .catch(error => {
          console.error('Error al insertar la publicación:', error);
          if (error.response && error.response.data && error.response.data.error) {
            alert(error.response.data.error);
          } else {
            alert("Error al insertar la publicación. Por favor, agrega todos los datos");
          }
        });
      };

    const handleSubmitBorrador = (event) => {
      event.preventDefault();

      axios.post('http://localhost:4200/insertarBorrador', formData, {headers:{'Content-Type': 'multipart/form-data', 'authorization': 'Bearer ' + localStorage.getItem('token')}})
      .then(response => {
        console.log('Borrador insertado:', response.data);
        alert("Borrador creado con éxito");
        navigate('/Inicio');
        // Puedes hacer alguna acción después de insertar la publicación, como redirigir al usuario a otra página
      })
      .catch(error => {
        console.error('Error al insertar el borrador:', error);
        alert(error.response.data.error);
      });
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
          
          <Col xs={10} md={9} style={{padding:'20px'}}>
            <Container className="CreaPublicCuerpo">
              <Row>
                <Col md={12}>
                  <h1>Crear Publicación</h1>
                </Col>
                
                <Col md={12} className="CrearPublictTitulo">
                  <Container fluid>
                    <Row>
                      <Col md={1}>
                        <label for="input1" class="input-label">Título: </label>
                      </Col>
                      <Col md={7} style={{paddingLeft:'20px'}}>
                        <input type="text" id="input1" class="blue-border" placeholder="Ingrese aquí" name="Titulo" onChange={(e) => handleChange(e, 4)} value={formData.Titulo}/>
                      </Col>
                      <Col md={4}>
                        <label for="combobox" class="input-label">País: </label>
                        <select id="combobox" name="IDPais" className="blue-border" value={formData.IDPais} onChange={(e) => handleChange(e, 4)}>
                          {paises.map(pais => (
                            <option key={pais.idPais} value={pais.idPais}>{pais.pais}</option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                
                <Col md={12} className="CrearPublicDesc">
                  <label for="input2" class="input-label">Descripción: </label>
                  <input type="text" id="input2" class="blue-border" placeholder="Ingrese aquí" name="Descripcion" onChange={(e) => handleChange(e, 4)} value={formData.Descripcion}/>
                </Col>
                
                <Col md={12}>
                  <Container>
                    <Row>
                      <Col md={4}>
                        <div class="input-container">
                          <label for="photoInput" class="input-label" >Imagen 1: </label>
                          <input style={{marginBottom:'15px'}} type="file" id="Fotos1" name="Fotos1" accept="image/*" class="fotoinput" onChange={(e) => handleChange(e, 1)}/>
                        </div>
                        <div class="image-container">
                          <img style={{width: '100%'}} src={usarFoto} alt="Imagen" id="uploadedImage"/>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div class="input-container">
                          <label for="photoInput" class="input-label" >Imagen 2: </label>
                          <input style={{marginBottom:'15px'}} type="file" id="Fotos2" name="Fotos2" accept="image/*" class="fotoinput" onChange={(e) => handleChange(e, 2)}/>
                        </div>
                        <div class="image-container">
                          <img style={{width: '100%'}} src={usarFoto2} alt="Imagen" id="uploadedImage"/>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div class="input-container">
                          <label for="photoInput" class="input-label" >Imagen 3: </label>
                          <input style={{marginBottom:'15px'}} type="file" id="Fotos3" name="Fotos3" accept="image/*" class="fotoinput" multiple onChange={(e) => handleChange(e, 3)}/>
                        </div>
                        <div class="image-container">
                          <img style={{width: '100%'}} src={usarFoto3} alt="Imagen" id="uploadedImage"/>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Col>

                <Col md={12} className="CrearPublicBotones">
                  <button onClick={handleSubmitBorrador}>Borrador <BsFillEraserFill  size={25}/></button>
                  <button onClick={handleSubmit} >Publicar <FaRegPaperPlane size={25}/></button>
                </Col>
              </Row>
            </Container>
          </Col>

        </Row>
      </Container>
    </div>
    );
  }
  
  export default CrearPublicacion;
  