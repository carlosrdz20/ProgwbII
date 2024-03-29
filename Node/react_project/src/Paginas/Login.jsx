import { Link, useNavigate } from "react-router-dom";
import "../Estilos/Login.css";
import Logo from "../Componentes/Logo.jsx";
import React, { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
     email: '',
      password: '' });

  const Enviar = (evento) => {
    evento.preventDefault();
    
    // Validación del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor ingresa un correo electrónico válido");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{6,}$/;
    // Validación de la contraseña (por ejemplo, longitud mínima)
    if (formData.password.length < 6 || formData.password.includes(" ")) {
      alert("La contraseña debe contener al menos una mayúscula, una minúscula, un dígito, un carácter especial y ser mayor a 6 caracteres");
      return;
    }

    // Si todas las validaciones son exitosas, puedes enviar el formulario
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="loginApp">
      <div className="login-box">
        <h1 className="h1Propio">¡Bienvenido de vuelta!</h1>
        <Logo Imagen={'favicon.ico'}/>
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
          <p> <Link to={'/'}>Navegar como invitado</Link> </p>
        </div>
      </div>

    </div>
  ); 
}