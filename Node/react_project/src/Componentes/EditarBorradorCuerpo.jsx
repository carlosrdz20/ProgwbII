import React, { useState, useEffect } from "react";
import '../Estilos/CrearPublicacion.css';
import { Row, Col,Container } from 'react-bootstrap';
import { FaRegPaperPlane } from "react-icons/fa";
import {  BsFillEraserFill } from "react-icons/bs";
import MenuLateral from "../Componentes/MenuIzquierdo.jsx";
import usePubAuth from '../Context/useAuthPub.js';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Context/useAuth';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiSolidFoodMenu } from "react-icons/bi";

function EditarBorrador() {
  const navigate = useNavigate();
    const { user } = useAuth();
    const {publicacion} = usePubAuth();
    const [paises, setPaises] = useState([]);
    const { logout } = useAuth();
    const [usarFoto, setFoto] = useState();
    const [usarFoto2, setFoto2] = useState();
    const [usarFoto3, setFoto3] = useState();

    const [formData, setFormData] = useState({
      IDPublicacion: publicacion ? publicacion._id : '',
      Titulo: publicacion ? publicacion.Titulo : '',
      Descripcion: publicacion ? publicacion.Descripcion : '',
      IDPais: publicacion && publicacion.pais ? publicacion.pais.idPais : '',
      Fotos1: publicacion ? publicacion.ImagenUno : '',
      Fotos2: publicacion ? publicacion.ImagenDos : '',
      Fotos3: publicacion ? publicacion.ImagenTres : '',
      Estatus: publicacion ? publicacion.Estatus : '',
      IDUsuario: user ? user.IDUsuario : ''
    });

    useEffect(() => {
      const token = localStorage.getItem('token');
      // Si no hay token, redirigir al usuario a la página de inicio
      if (!token) {
        navigate("/");
      }
        axios.get('http://localhost:4200/tpaises')
            .then(response => {
                setPaises(response.data);
                setFoto(`/Imagenes/${publicacion.ImagenUno}`)
                setFoto2(`/Imagenes/${publicacion.ImagenDos}`)
                setFoto3(`/Imagenes/${publicacion.ImagenTres}`)
            })
            .catch(error => {
                console.error('Error al obtener los países:', error);
            });

    }, []);

    const handleChange = (e, input) => {
        const { name, value, type, files } = e.target;
    
        if (type === "file") {
            setFormData((prevData) => ({
              ...prevData,
              [name]: files[0] 
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
          } else {
            
            setFormData((prevData) => ({
              ...prevData,
              [name]: value
            }));
          }
          console.log(formData);
    };

    const handlePublicar = (event) => {
        event.preventDefault();

        axios.put('http://localhost:4200/editarPublicacion', formData, {headers:{'Content-Type': 'multipart/form-data', 'authorization': 'Bearer ' + localStorage.getItem('token') }})
            .then(response => {
                console.log('Publicación editada:', response.data);
                alert("Publicación editada con éxito");
                navigate('/Inicio');
                // Puedes hacer alguna acción después de insertar la publicación, como redirigir al usuario a otra página
            })
            .catch(error => {
                alert("La cagaste");
                console.error('Error al insertar la publicación:', error);
                logout();
                alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
                navigate('/');
            });
    };

    const handleEditar = (event) => {
      event.preventDefault();

      axios.put('http://localhost:4200/editarBorrador', formData, {headers:{'Content-Type': 'multipart/form-data', 'authorization': 'Bearer ' + localStorage.getItem('token') }})
          .then(response => {
              console.log('Borrador editado:', response.data);
              alert("Borrador editada con éxito");
              navigate('/Inicio');
              // Puedes hacer alguna acción después de insertar la publicación, como redirigir al usuario a otra página
          })
          .catch(error => {
              
              console.error('Error al insertar la publicación:', error);
              alert(error.response.data.error);
          });
  };

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
                  <h1>Editar Borrador</h1>
                </Col>
                <Col md={12} className="CrearPublicTitulo">
                  <Container fluid>
                    <Row>
                      <Col md={1}>
                        <label for="input1" class="input-label">Título:</label>
                      </Col>
                      <Col md={7} style={{paddingLeft:'20px'}}>
                        <input type="text" id="Titulo" name="Titulo" class="blue-border" placeholder="Ingrese aquí" defaultValue = {formData.Titulo} onChange={(e) => handleChange(e, 4)}/>                      
                      </Col>
                      <Col md={4}>
                      <label for="combobox" class="input-label">País:</label>
                        <select id="combobox" name="IDPais" class="blue-border" value={formData.IDPais} onChange={(e) => handleChange(e, 4)}>
                          {paises.map(pais => (
                            <option key={pais.idPais} value={pais.idPais}>{pais.pais}</option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                
                <Col md={12} className="CrearPublicDesc">
                  <label for="input2" class="input-label">Descripción:</label>
                  <input type="text" id="Descripcion" name = "Descripcion" class="blue-border" placeholder="Ingrese aquí" defaultValue = {formData.Descripcion} onChange={(e) => handleChange(e, 4)}/>
                </Col>

                <Col md={12}>
                  <Container>
                    <Row>
                      <Col md={4}>
                        <div class="input-container">
                          <label for="photoInput" class="input-label" >Imagen 1:</label>
                          <input style={{marginBottom:'15px'}} type="file" id="Fotos1" name="Fotos1" accept="image/*" class="fotoinput" onChange={(e) => handleChange(e, 1)}/>
                        </div>
                        <div class="image-container">
                          <img style={{width: '100%'}} src={usarFoto} alt="Imagen" id="uploadedImage"/>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div class="input-container">
                          <label for="photoInput" class="input-label" >Imagen 2:</label>
                          <input style={{marginBottom:'15px'}} type="file" id="Fotos2" name="Fotos2" accept="image/*" class="fotoinput" onChange={(e) => handleChange(e, 2)}/>
                        </div>
                        <div class="image-container">
                          <img style={{width: '100%'}} src={usarFoto2} alt="Imagen" id="uploadedImage"/>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div class="input-container">
                            <label for="photoInput" class="input-label" >Imagen 3:</label>
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
                  <button onClick={handleEditar}>Editar Borrador <BsFillEraserFill  size={25}/></button>
                  <button onClick={handlePublicar}>Publicar <FaRegPaperPlane size={25}/></button>
                </Col>
              </Row>
            </Container>
          </Col>
          
        </Row>
      </Container>
    </div>
  );
  }

  export default EditarBorrador;
  