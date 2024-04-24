import React, { useState, useEffect } from "react";
import '../Estilos/CrearPublicacion.css';
import { Row, Col } from 'react-bootstrap';
import { FaRegPaperPlane } from "react-icons/fa";
import {  BsFillEraserFill } from "react-icons/bs";
import MenuLateral from "../Componentes/MenuIzquierdo.jsx";
import usePubAuth from '../Context/useAuthPub.js';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../Context/useAuth';

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
        IDPublicacion: publicacion._id,
        Titulo: publicacion.Titulo,
        Descripcion: publicacion.Descripcion,
        IDPais: publicacion.pais.idPais,
        Fotos1: publicacion.ImagenUno,
        Fotos2: publicacion.ImagenDos,
        Fotos3: publicacion.ImagenTres,
        Estatus: publicacion.Estatus,
        IDUsuario: user.IDUsuario
    });

    useEffect(() => {
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
              alert("La cagaste");
              console.error('Error al insertar la publicación:', error);
              logout();
              alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
              navigate('/');
          });
  };

  return (
    <div className="EditarBorrador">
        <Row>
          <Col className="Izquierdo" xs={12}  md ={12} lg = {3}>
            <MenuLateral/>
          </Col>
          <Col className="ROW" xs={12} sm ={12} md ={12} lg = {6}>
            <Col className="COL">
              <div class="input-container">
                <label for="input1" class="input-label">Título:</label>
                <input type="text" id="Titulo" name="Titulo" class="blue-border" placeholder="Ingrese aquí" defaultValue = {formData.Titulo} onChange={(e) => handleChange(e, 4)}/>
              </div>
              <div class="input-container">
                <label for="input2" class="input-label">Descripción:</label>
                <input type="text" id="Descripcion" name = "Descripcion" class="blue-border" placeholder="Ingrese aquí" defaultValue = {formData.Descripcion} onChange={(e) => handleChange(e, 4)}/>
              </div>
            </Col>
            <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
              <div class="input-container">
                <label for="combobox" class="input-label">País:</label>
                <select id="combobox" name="IDPais" class="blue-border" value={formData.IDPais} onChange={(e) => handleChange(e, 4)}>
                            {paises.map(pais => (
                                    <option key={pais.idPais} value={pais.idPais}>{pais.pais}</option>
                                ))}
                </select>
              </div>
              <div class="button-container">
                <button class="btn" onClick={handleEditar}>Editar Borrador <BsFillEraserFill  size={25}/></button>
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
                <button class="btn" onClick={handlePublicar}>Publicar <FaRegPaperPlane size={25}/></button>
              </div>
            </Col>
          </Col>
        </Row>
    </div>
  );
  }

  export default EditarBorrador;
  