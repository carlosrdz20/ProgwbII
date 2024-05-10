import React from "react";
import '../Estilos/MenuIzquierdo.css'
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsFillArchiveFill, BsFillEraserFill } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoIosHeart } from "react-icons/io";
import useAuth from '../Context/useAuth';

function MenuLateral({ pagina }){
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="CuerpoMenu">
      <div>
        <Link to={"/CrearPublicacion"}>
        <button className="MiBoton">Crear Publicación <FaRegPaperPlane size={20}/></button>   
        </Link>
      </div>
      <div className="MenuOpc">
        <Link to={'/Inicio'} className={pagina === 'Inicio' ? "MenuLinks PaginaActual" : "MenuLinks"}>
          <IoHome style={{marginRight: "5px"}} size={30}/>
          Inicio
        </Link>
        <Link to={'/MisPublicaciones'} className={pagina === 'Publicaciones' ? "MenuLinks PaginaActual" : "MenuLinks"}>
          <BsFillArchiveFill style={{marginRight: "5px"}} size={30}/>
          Mis publicaciones
        </Link>
        <Link to={'/MisFavoritos'} className={pagina === 'Favoritos' ? "MenuLinks PaginaActual" : "MenuLinks"}>
          <IoIosHeart style={{marginRight: "5px"}} size={30} />
          Favoritos
        </Link>
        <Link to={'/MisBorradores'} className={pagina === 'Borradores' ? "MenuLinks PaginaActual" : "MenuLinks"}>
          <BsFillEraserFill style={{marginRight: "5px"}} size={30}/>
          Borradores
        </Link>
        <Link to={'/'} className="MenuLinks" onClick={handleLogout}>
          <RiLogoutBoxRLine style={{marginRight: "5px"}} size={30}/>
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
}

export default MenuLateral;