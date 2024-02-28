import { Link } from "react-router-dom";

export default function Inicio(){
  return (
  <div>
    <h1>Inicio</h1>
    <div>
      <li> <Link to={'/Login'}>Login</Link> </li>
      <li> <a href="/Registro">Registro</a> </li>
    </div> 
  </div>
  );
}