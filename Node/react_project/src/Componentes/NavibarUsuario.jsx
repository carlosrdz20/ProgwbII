import '../Estilos/NavibarUsuario.css';
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Navibar_Usuario ({ Nombre, Imagen }) {
  return (
    <div className='Contenedor'>
      <Link to={'/Login'} className='LinkUsuario'>
        <p className='Nombre_Usuario'>{Nombre}</p>
        <img className='Imagen_Usuario' src={require(`../Imagenes/${Imagen}`)} alt={'ImgUsuario'} />        
      </Link>
    </div>
  );
};

export default Navibar_Usuario;