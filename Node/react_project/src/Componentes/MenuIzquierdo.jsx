import React from "react";
import '../Estilos/MenuIzquierdo.css'
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsFillArchiveFill, BsFillEraserFill } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoIosHeart } from "react-icons/io";

export function MenuLateral(){
  return (
    <>
      <div>
        <button>Crear Publicación <FaRegPaperPlane size={28}/></button>        
      </div>
      <div className="MenuOpc">
        <Link to={'/'} className="MenuLinks">
          <IoHome style={{marginRight: "5px"}} size={45}/>
          <p>Inicio</p>
        </Link>
        <Link to={'/MisPublicaciones'} className="MenuLinks">
          <BsFillArchiveFill style={{marginRight: "5px"}} size={45}/>
          Mis publicaciones
        </Link>
        <Link to={'/MisFavoritos'} className="MenuLinks">
          <IoIosHeart style={{marginRight: "5px"}} size={45} />
          Favoritos
        </Link>
        <Link to={'/MisBorradores'} className="MenuLinks">
          <BsFillEraserFill style={{marginRight: "5px"}} size={45}/>
          Borradores
        </Link>
        <Link to={'/Login'} className="MenuLinks">
          <RiLogoutBoxRLine style={{marginRight: "5px"}} size={45}/>
          Cerrar Sesión
        </Link>
      </div>
    </>
  );
}