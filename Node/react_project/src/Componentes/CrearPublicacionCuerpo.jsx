import React, { useState, useEffect } from "react";
import '../Estilos/CrearPublicacion.css';
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import { FaRegPaperPlane } from "react-icons/fa";
import {  BsFillEraserFill } from "react-icons/bs";
import MenuLateral from "../Componentes/MenuIzquierdo.jsx";
import { useUser } from '../Context/UserContext';
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Context/useAuth';

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
                alert("No jaló")
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
                logout();
                alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
                navigate('/');
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
                            <input type="text" id="input1" class="blue-border" placeholder="Ingrese aquí" name="Titulo" onChange={(e) => handleChange(e, 4)} value={formData.Titulo}/>
                        </div>
                        <div class="input-container">
                            <label for="input2" class="input-label">Descripción:</label>
                            <input type="text" id="input2" class="blue-border" placeholder="Ingrese aquí" name="Descripcion" onChange={(e) => handleChange(e, 4)} value={formData.Descripcion}/>
                        </div>
                    </Col>
                    <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
                        <div class="input-container">
                            <label for="combobox" class="input-label">País:</label>
                            <select id="combobox" name="IDPais" className="blue-border" value={paisSeleccionado} onChange={(e) => handleChange(e, 4)}>
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
                            <input type="file" id="Fotos1" name="Fotos1" accept="image/*" class="fotoinput" onChange={(e) => handleChange(e, 1)}/>
                        </div>
                        <div class="image-container">
                            <img src={usarFoto} alt="Imagen" id="uploadedImage"/>
                        </div>
                        <div class="input-container">
                            <label for="photoInput" class="input-label" >Publicar:</label>
                            <input type="file" id="Fotos2" name="Fotos2" accept="image/*" class="fotoinput" onChange={(e) => handleChange(e, 2)}/>
                        </div>
                        <div class="image-container">
                            <img src={usarFoto2} alt="Imagen" id="uploadedImage"/>
                        </div>
                        <div class="input-container">
                            <label for="photoInput" class="input-label" >Publicar:</label>
                            <input type="file" id="Fotos3" name="Fotos3" accept="image/*" class="fotoinput" multiple onChange={(e) => handleChange(e, 3)}/>
                        </div>
                        <div class="image-container">
                            <img src={usarFoto3} alt="Imagen" id="uploadedImage"/>
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
  