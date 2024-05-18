import { Link, useNavigate } from "react-router-dom";
import "../Estilos/Login.css";
import { useUser } from '../Context/UserContext.js';
import React, { useState, useContext  } from 'react';
import axios from "axios";
import useAuth from '../Context/useAuth';


export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { login } = useAuth();
  
  
  const [formData, setFormData] = useState({
    email: '',
    password: '' });

  const Enviar = async (evento) => {
    evento.preventDefault();

     // Validación del correo electrónico
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(formData.email)) {
       alert("Por favor ingresa un correo electrónico válido");
       return;
     }
     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{6,}$/;
     // Validación de la contraseña (por ejemplo, longitud mínima)
     if (formData.password.length < 6 || formData.password.includes(" ") || !passwordRegex.test(formData.password)) {
       alert("La contraseña debe contener al menos una mayúscula, una minúscula, un dígito, un carácter especial y ser mayor a 6 caracteres");
       return;
     }

    try {
      const response = await axios.post('http://localhost:4200/autentUsuario', formData);

      if (response.status === 200) {
        console.log("Datos del usuario:");
        console.log(response.data);
        login(response.data, response.data.token)
        alert("Iniciaste Sesion");
        navigate('/Inicio')
      } else {
        alert('Correo y contraseña incorrectos. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Credenciales inválidas: ', error);
      alert(error.response.data.error);
    }

    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="loginApp">
      <div className="login-box">
        <h1 className="h1Propio">¡Bienvenido de vuelta!</h1>
          <div 
            className='logo-contenedor'>
              <img 
              src={`/Imagenes/favicon.ico`}
              className='logo' 
              alt={`Imagen de favicon.ico`}
            />
          </div>
        <form action="#" onSubmit={Enviar}>
          <div className="textbox">
            <input type="email" placeholder="Correo electrónico" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div class="textbox">
            <input type="password" placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-IniSes">Iniciar Sesión <strong>{'>'}</strong> </button>
        </form>
        <div class="extras">
          <p>¿No tienes una cuenta? </p>
          <p> <Link to={'/Registro'}>Registrate aquí</Link> </p>
          <hr />
          <p> <Link to={'/Invitado'}>Navegar como invitado</Link> </p>
        </div>
      </div>

    </div>
  ); 
}