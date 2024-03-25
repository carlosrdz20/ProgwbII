import Footibar from "../Componentes/Footer.jsx";
import Navibar from "../Componentes/Navibar.jsx";
import CrearPublicacionCuerpo from "../Componentes/CrearPublicacionCuerpo.jsx";
import { MenuLateral } from "../Componentes/MenuIzquierdo.jsx";

export default function CrearPublicacion(){
    return (
    <div>
      <Navibar/>
      <CrearPublicacionCuerpo/>
      <Footibar/>
    </div>
    );
  }