import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../Estilos/Registro.css'


export default function Registro(){
  const navigate = useNavigate();

  const Enviar = (evento) => {
    evento.preventDefault();
    navigate('/');
  };



  const [formData, setFormData] = useState({
    NombreUsuario: "",
    Nombre: "",
    Correo: "",
    Foto: null,
    FechaNacimiento: "",
    Genero: "",
    Contrasena: ""
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

  // Función para enviar el formulario y realizar las validaciones
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Registro",formData);
    try {
      // Enviar los datos del formulario al servidor
      
      const response = await axios.post('http://localhost:4200/insertarUsuario', formData, {headers:{'Content-Type': 'multipart/form-data'}});
      
      console.log(response.data);
      alert('Te has registrado con éxito.');
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert(error.response.data.error);
    }
    
  };

  return (
    <div className="Registro_App">
      <div className="Register-box">
        <h1>Registro</h1>
          <div 
            className='logo-contenedor'>
              <img 
              src={`/Imagenes/favicon.ico`}
              className='logo' 
              alt={`Imagen de favicon.ico`}
            />
          </div>        <form action="#" enctype="multipart/form-data" onSubmit={handleSubmit} >
          <h4>Nombre de usuario</h4>
          <div class="textbox">
            <input type="text" placeholder="Nombre de usuario" name="NombreUsuario" value={formData.NombreUsuario} onChange={handleChange} required />
          </div>
          <h4>Nombre completo</h4>
          <div class="textbox">
            <input type="text" placeholder="Nombre completo" name="Nombre" value={formData.Nombre} onChange={handleChange} required />
          </div>
          <h4>Correo electronico</h4>
          <div class="textbox">
            <input type="email" placeholder="Correo electrónico" name="Correo" value={formData.Correo} onChange={handleChange} required />
          </div>
          <h4>Foto de perfil</h4>
          <div class="textbox">
            <input type="file"  name="Foto" accept="image/*" required onChange={handleChange} />
          </div>
          <h4>Fecha de nacimiento</h4>
          <div class="textbox">
            <input type="date"  name="FechaNacimiento" value={formData.FechaNacimiento} onChange={handleChange} required />
          </div>
          <h4>Genero</h4>
          <div class="textbox">
            <select name="Genero" value={formData.Genero} onChange={handleChange} required>
              <option value="" disabled selected>Selecciona tu género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>
          <h4>Contraseña</h4>
          <div class="textbox">
            <input type="password" placeholder="Contraseña" name="Contrasena" value={formData.Contrasena} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-IniSes">Registrate <strong>{'>'}</strong> </button>
        </form>
        <div class="extras">
        <p>¿Ya tienes una cuenta? </p>
        <p> <Link to={'/'}>Inicia sesión aquí</Link> </p>
        </div>
      </div>
    </div>
  );
}