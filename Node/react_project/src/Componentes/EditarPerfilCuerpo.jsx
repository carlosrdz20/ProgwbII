import '../Estilos/PerfilCuerpo.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import { Row, Col } from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from '../Context/UserContext';

function EditarPerfilCuerpo() {

  const { user, setUser } = useUser();
  const [fechaFormateada, setFecha] = useState();
  const [fotoxd, setFotoxd] = useState();
  const [user2, setuser2] = useState();
  const [formData, setFormData] = useState({
    email: '',
    password: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      setuser2(user);
      // Formatear la fecha
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
    alert('Se va a editar tu perfil con los datos proporcionados.');
    try {
      // Enviar los datos del formulario al servidor
      //FALTA CAMBIAR RUTA
      const response = await axios.put('http://localhost:4200/editarPerfil', user2, {headers:{'Content-Type': 'multipart/form-data'}});
      
      console.log(response.data);
      try {
        const response = await axios.post('http://localhost:4200/autentUsuario', formData);
  
        if (response.status === 200) {
          console.log("Datos del usuario:");
          console.log(response.data);
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        } else {
          
          alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
      alert('Perfil actualizado exitosamente');
      
    } catch (error) {
      console.error('Error al editar perfil:', error);
      alert('Ocurrió un error al editar su perfil, intente de nuevo más tarde.');
    }
    
  };

  return (
    <div className="PerfilCuerpo">
      <Row>
        <Col className="Izquierdo" xs={12}  md ={12} lg = {3}>
          <MenuLateral/>
        </Col>

        <Col className="PerfilROW" xs={12} sm ={12} md ={12} lg = {9}>
          <Col className="PerfilCOL">
            <form action="#" enctype="multipart/form-data">

            </form>
            <div className="InputContainer">
              <p>Nombre de usuario:</p>
              <input type="text" id="Usuario" className="InputPerfil" name="NombreUsuario" defaultValue={user.NombreUsuario} onChange={handleChange}/>
            </div>
            <div className="InputContainer">
              <p>Nombre completo:</p>
              <input type="text" id="Nombre" className="InputPerfil" name="Nombre" defaultValue={user.Nombre} onChange={handleChange}/>
            </div>
            <div className="InputContainer">
              <p>Contraseña Actual:</p>
              <input type="text" id="Password" className="InputPerfil" name="Contrasena" defaultValue={user.Contrasena} onChange={handleChange}/>
            </div>
          </Col>
          <Col className="PerfilCOL" xs={12} sm ={12} md ={12} lg = {6}>
            <div className="InputContainer">
              <p>Correo electronico:</p>
              <input type="text" id="Correo" className="InputPerfil" name="Correo" defaultValue={user.Correo} onChange={handleChange}/>
            </div>
            <div className="InputContainer">
              <p>Género:</p>
              <select id="Combobox" className="Combobox" name="Genero" defaultValue={user.Genero === 'masculino' ? "masculino" : "femenino"} onChange={handleChange}>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>
            <div className="InputContainer">
              <p>Fecha de nacimiento:</p>
              <input type="date" id="fecha" className="InputPerfil" name="FechaNacimiento" defaultValue={fechaFormateada} onChange={handleChange}/>
            </div>
            <div>
              <button className="btn" onClick={handleSubmit}>Aceptar cambios</button>  
            </div>
          </Col>
          <Col className="PerfilCOL" xs={12} sm ={12} md ={12} lg = {6}>
            <div className="foto">
              <p>Foto de perfil:</p>
              <input type="file"  name="Foto" accept="image/*" onChange={handleChange}></input>
              <img src={fotoxd} alt="" className="FotoPerfil" />
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default EditarPerfilCuerpo;
