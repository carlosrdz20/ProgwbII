import { Link, useNavigate } from "react-router-dom";
import "../Estilos/Login.css";
import Logo from "../Componentes/Logo.jsx";

export default function Login() {
  const navigate = useNavigate();

  const Enviar = (evento) => {
    evento.preventDefault();
    navigate('/');
  };

  return (
    <div className="loginApp">
      <div className="login-box">
        <h1 className="h1Propio">¡Bienvenido de vuelta!</h1>
        <Logo Imagen={'favicon.ico'}/>
        <form action="#" onSubmit={Enviar}>
          <div className="textbox">
            <input type="email" placeholder="Correo electrónico" name="email" required />
          </div>
          <div class="textbox">
            <input type="password" placeholder="Contraseña" name="password" required />
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