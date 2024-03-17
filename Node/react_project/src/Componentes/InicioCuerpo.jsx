import React, { useState } from "react";
import '../Estilos/InicioCuerpo.css';
import { MenuLateral } from "./MenuIzquierdo.jsx";
import DestPopu from "./DestPopu";
import PublicDisplay from "./PublicacionDisplay";
import { FaRegPaperPlane, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsFillArchiveFill, BsFillEraserFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TbPointFilled } from "react-icons/tb";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";


function InicioCuerpo() {
  const [ UsuIni ] = useState(true);

  return (
    <div className="Cuerpo">
      <div>
        <MenuLateral />
      </div>
      <div>
        Centro
      </div>
      <div>
        Destinos Populares
      </div>
    </div>
  );
}

export default InicioCuerpo;
