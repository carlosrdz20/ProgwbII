import React from "react";
import '../Estilos/MenuIzquierdo.css'
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsFillArchiveFill, BsFillEraserFill } from "react-icons/bs";
import { FaRegPaperPlane, FaStar } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

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
        <Link className="MenuLinks">
          <BsFillArchiveFill style={{marginRight: "5px"}} size={45}/>
          Mis publicaciones
        </Link>
        <Link className="MenuLinks">
          <FaStar style={{marginRight: "5px"}} size={45} />
          Favoritos
        </Link>
        <Link className="MenuLinks">
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