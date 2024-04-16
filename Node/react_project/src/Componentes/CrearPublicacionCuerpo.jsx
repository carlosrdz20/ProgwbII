import React, { useState, useEffect } from "react";
import '../Estilos/CrearPublicacion.css';
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import { FaRegPaperPlane } from "react-icons/fa";
import {  BsFillEraserFill } from "react-icons/bs";
import MenuLateral from "../Componentes/MenuIzquierdo.jsx";
import { useUser } from '../Context/UserContext';

function CrearPublicacion() {
    const [paises, setPaises] = useState([]);
    const [paisSeleccionado, setPaisSeleccionado] = useState("");
    const { user, setUser } = useUser();

    const [formData, setFormData] = useState({
        Titulo: "",
        Descripcion: "",
        IDPais: 1, //puse el ID 1 de inicio por si nunca entra al handleChange
        ImagenUno: null,
        ImagenDos: null,
        ImagenTres: null,
        Estatus: "",
        IDUsuario: user.IDUsuario
      });
    
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === "file") {
          setFormData((prevData) => ({
            ...prevData,
            [name]: files[0] 
          }));
          
        } else {
          
          setFormData((prevData) => ({
            ...prevData,
            [name]: value
          }));
        }
        console.log(formData);
      };


      const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:4200/insertarPublicacion', formData, {headers:{'Content-Type': 'multipart/form-data'}})
            .then(response => {
                console.log('Publicación insertada:', response.data);
                // Puedes hacer alguna acción después de insertar la publicación, como redirigir al usuario a otra página
            })
            .catch(error => {
                console.error('Error al insertar la publicación:', error);
            });
    };

    const handleSubmitBorrador = (event) => {
        event.preventDefault();

        axios.post('http://localhost:4200/insertarBorrador', formData, {headers:{'Content-Type': 'multipart/form-data'}})
            .then(response => {
                console.log('Borrador insertado:', response.data);
                // Puedes hacer alguna acción después de insertar la publicación, como redirigir al usuario a otra página
            })
            .catch(error => {
                console.error('Error al insertar el borrador:', error);
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

            const userData = localStorage.getItem('user');
            if (userData) {
              // Parsear los datos del usuario y almacenarlos en el contexto de usuario
              setUser(JSON.parse(userData));
            }
    }, []);


    return (
        <div className="CrearPublicacion">
            <Row>
                <Col className="Izquierdo" xs={12}  md ={12} lg = {3}>
                    <MenuLateral/>
                </Col>

                <Col className="ROW" xs={12} sm ={12} md ={12} lg = {6}>
                    <Col className="COL">
                        <div class="input-container">
                            <label for="input1" class="input-label">Título:</label>
                            <input type="text" id="input1" class="blue-border" placeholder="Ingrese aquí" name="Titulo" onChange={handleChange} value={formData.Titulo}/>
                        </div>
                        <div class="input-container">
                            <label for="input2" class="input-label">Descripción:</label>
                            <input type="text" id="input2" class="blue-border" placeholder="Ingrese aquí" name="Descripcion" onChange={handleChange} value={formData.Descripcion}/>
                        </div>
                    </Col>
                    <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
                        <div class="input-container">
                            <label for="combobox" class="input-label">País:</label>
                            <select id="combobox" name="IDPais" className="blue-border" value={paisSeleccionado} onChange={handleChange}>
                                {paises.map(pais => (
                                    <option key={pais.idPais} value={pais.idPais}>{pais.pais}</option>
                                ))}
                            </select>
                        </div>
                        <div class="button-container">
                            <button class="btn" onClick={handleSubmitBorrador}>Borrador <BsFillEraserFill  size={25}/></button>
                        </div>
                    </Col>
                    <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
                        <div class="input-container">
                            <label for="photoInput" class="input-label" >Publicar:</label>
                            <input type="file" id="photoInput" name="Foto" accept="image/*" class="fotoinput" multiple onChange={handleChange}/>
                        </div>
                        <div class="image-container">
                            <img src="./Imagenes/Paisaje.jpg" alt="Imagen" id="uploadedImage"/>
                        </div>
                        <div class="button-container">
                            <button class="btn" onClick={handleSubmit} >Publicar <FaRegPaperPlane size={25}/></button>
                        </div>
                    </Col>
                </Col>
            </Row>
        </div>
    );
  }
  
  export default CrearPublicacion;
  