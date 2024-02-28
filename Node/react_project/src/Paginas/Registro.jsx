import { useState } from "react";
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
    username: "",
    name: "",
    email: "",
    foto: null,
    fecha_nacimiento: "",
    genero: "",
    password: "",
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
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación del nombre de usuario
    if (formData.username.length < 3 || formData.username.includes(" ")) {
      alert("El nombre de usuario debe tener al menos 3 caracteres y no puede contener espacios");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{6,}$/;

    if (formData.password.length < 6 || formData.username.includes(" ")) {
      alert("La contraseña debe contener al menos una mayúscula, una minúscula, un dígito, un carácter especial y ser mayor a 6 caracteres");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      alert("La contraseña debe contener al menos una mayúscula, una minúscula, un dígito y un carácter especial");
      return;
    }

    if (formData.password !== formData.passwordrep) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Validaciones básicas
    if (formData.password !== formData.passwordrep) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Validación del nombre completo
    if (formData.name.trim() === "" || !/^[a-zA-Z\s]*$/.test(formData.name)) {
      alert("Por favor ingresa un nombre válido solo letras y espacios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor ingresa un correo electrónico válido");
      return;
    }

        // Validación de la fecha de nacimiento
        const birthDate = new Date(formData.fecha_nacimiento);
        const now = new Date();
        const minAge = 18;
        const maxAge = 100;
        const minBirthDate = new Date(now.getFullYear() - minAge, now.getMonth(), now.getDate());
        const maxBirthDate = new Date(now.getFullYear() - maxAge, now.getMonth(), now.getDate());
    
        if (birthDate >= minBirthDate || birthDate <= maxBirthDate) {
          alert(`Debes tener entre ${minAge} y ${maxAge} años para registrarte.`);
          return;
        }

    // Si todas las validaciones son exitosas, continuar con el envío
    alert('Estas Registrandote');
    navigate('/');
  };

  return (
    <div className="Registro_App">
      <div className="Register-box">
        <h1>Registro</h1>
        <Logo Imagen={'favicon.ico'}/>
        <form action="#" onSubmit={handleSubmit}>
          <h4>Nombre de usuario</h4>
          <div class="textbox">
            <input type="text" placeholder="Nombre de usuario" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <h4>Nombre completo</h4>
          <div class="textbox">
            <input type="text" placeholder="Nombre completo" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <h4>Correo electronico</h4>
          <div class="textbox">
            <input type="email" placeholder="Correo electrónico" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <h4>Foto de perfil</h4>
          <div class="textbox">
            <input type="file"  name="foto" accept="image/*" required />
          </div>
          <h4>Fecha de nacimiento</h4>
          <div class="textbox">
            <input type="date"  name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
          </div>
          <h4>Genero</h4>
          <div class="textbox">
            <select name="genero" required>
              <option value="" disabled selected>Selecciona tu género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <h4>Contraseña</h4>
          <div class="textbox">
            <input type="password" placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <h4>Repetir contraseña</h4>
          <div class="textbox">
            <input type="password" placeholder="Repetir contraseña" name="passwordrep" value={formData.passwordrep} onChange={handleChange} required/>
          </div>
          <button type="submit" className="btn-IniSes">Iniciar Sesión <strong>{'>'}</strong> </button>
        </form>
        <div class="extras">
        <p>¿Ya tienes una cuenta? </p>
        <p> <Link to={'/Login'}>Inicia sesión aquí</Link> </p>
        </div>
      </div>
    </div>
  );
}