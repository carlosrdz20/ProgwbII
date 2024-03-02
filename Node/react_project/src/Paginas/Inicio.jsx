import { Link } from "react-router-dom";
import '../Estilos/Inicio.css'
import Navibar from "../Componentes/Navibar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footibar from "../Componentes/Footer.jsx";

export default function Inicio(){
  return (
  <div>
    <Navibar />
    <h1>Inicio</h1>
    <div className="InicioBody">
      <li> <Link to={'/Login'}>Login</Link> </li>
      <li> <Link to={'/Registro'}>Registro</Link> </li>
    </div>
    <Footibar />
  </div>
  );
}