import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../Estilos/Registro.css'
import Logo from "../Componentes/Logo";



export default function Registro(){
  const navigate = useNavigate();

  const Enviar = (evento) => {
    evento.preventDefault();
    alert('Estas Registrandote');
    navigate('/');
  };

  const [formData, setFormData] = useState({
    NombreUsuario: "",
    Nombre: "",
    Correo: "",
    foto: null,
    FechaNacimiento: "",
    Genero: "",
    Contrasena: "",
    passwordrep: ""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? e.target.files[0] : value
    }));
  };

  // Función para enviar el formulario y realizar las validaciones
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    alert('Estas Registrandote');
    try {
      // Enviar los datos del formulario al servidor
      console.log("Llegue Aqui");
      const response = await axios.post('http://localhost:4200/insertarUsuario', formData);
      console.log("Llegue Aqui 2")
      console.log(response.data);
      alert('Usuario registrado exitosamente');
      
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Ocurrió un error al registrar el usuario');
    }
    
  };

  return (
    <div className="Registro_App">
      <div className="Register-box">
        <h1>Registro</h1>
        <Logo Imagen={'favicon.ico'}/>
        <form action="#" onSubmit={handleSubmit}>
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
            <input type="file"  name="foto" accept="image/*" required />
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
              <option value="otro">Otro</option>
            </select>
          </div>
          <h4>Contraseña</h4>
          <div class="textbox">
            <input type="password" placeholder="Contraseña" name="Contrasena" value={formData.Contrasena} onChange={handleChange} required />
          </div>
          <h4>Repetir contraseña</h4>
          <div class="textbox">
            <input type="password" placeholder="Repetir contraseña" name="passwordrep" value={formData.passwordrep} onChange={handleChange} required/>
          </div>
          <button type="submit" className="btn-IniSes">Registrate <strong>{'>'}</strong> </button>
        </form>
        <div class="extras">
        <p>¿Ya tienes una cuenta? </p>
        <p> <Link to={'/Login'}>Inicia sesión aquí</Link> </p>
        </div>
      </div>
    </div>
  );
}