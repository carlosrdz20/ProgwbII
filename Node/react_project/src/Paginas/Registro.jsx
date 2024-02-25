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

  return (
    <div className="Registro_App">
      <div className="Register-box">
        <h1>Registro</h1>
        <Logo Imagen={'favicon.ico'}/>
        <form action="#" onSubmit={Enviar}>
          <h4>Nombre de usuario</h4>
          <div class="textbox">
            <input type="text" placeholder="Nombre de usuario" name="username" required />
          </div>
          <h4>Nombre completo</h4>
          <div class="textbox">
            <input type="text" placeholder="Nombre completo" name="name" required />
          </div>
          <h4>Correo electronico</h4>
          <div class="textbox">
            <input type="email" placeholder="Correo electrónico" name="email" required />
          </div>
          <h4>Foto de perfil</h4>
          <div class="textbox">
            <input type="file"  name="foto" accept="image/*" required />
          </div>
          <h4>Fecha de nacimiento</h4>
          <div class="textbox">
            <input type="date"  name="fecha_nacimiento" required />
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
            <input type="password" placeholder="Contraseña" name="password" required />
          </div>
          <h4>Repetir contraseña</h4>
          <div class="textbox">
            <input type="password" placeholder="Repetir contraseña" name="passwordrep" required/>
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