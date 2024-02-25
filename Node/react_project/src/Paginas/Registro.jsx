import { Link } from "react-router-dom";

export default function Registro(){
  return (
    <div>
      <h1>Registro</h1>
      <div>
        <li> <Link to={'/Login'}>Login</Link> </li>
        <li> <Link to={'/'}>Inicio</Link> </li>
      </div> 
    </div>
  );
}