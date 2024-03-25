import React from "react";
import '../Estilos/MenuIzquierdo.css'
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsFillArchiveFill, BsFillEraserFill } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoIosHeart } from "react-icons/io";

function MenuLateral({ pagina }){
  return (
    <div>
      <div>
        <Link to={"/CrearPublicacion"}>
        <button>Crear Publicación <FaRegPaperPlane size={28}/></button>   
        </Link>
      </div>
      <div className="MenuOpc">
        <Link to={'/'} className={pagina === 'Inicio' ? "MenuLinks PaginaActual" : "MenuLinks"}>
          <IoHome style={{marginRight: "5px"}} size={45}/>
          <p>Inicio</p>
        </Link>
        <Link to={'/MisPublicaciones'} className={pagina === 'Publicaciones' ? "MenuLinks PaginaActual" : "MenuLinks"}>
          <BsFillArchiveFill style={{marginRight: "5px"}} size={45}/>
          Mis publicaciones
        </Link>
        <Link to={'/MisFavoritos'} className={pagina === 'Favoritos' ? "MenuLinks PaginaActual" : "MenuLinks"}>
          <IoIosHeart style={{marginRight: "5px"}} size={45} />
          Favoritos
        </Link>
        <Link to={'/MisBorradores'} className={pagina === 'Borradores' ? "MenuLinks PaginaActual" : "MenuLinks"}>
          <BsFillEraserFill style={{marginRight: "5px"}} size={45}/>
          Borradores
        </Link>
        <Link to={'/Login'} className="MenuLinks">
          <RiLogoutBoxRLine style={{marginRight: "5px"}} size={45}/>
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
}

export default MenuLateral;