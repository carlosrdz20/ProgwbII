import Footibar from "../Componentes/Footer.jsx";
import Navibar from "../Componentes/Navibar.jsx";
import CrearPublicacionCuerpo from "../Componentes/CrearPublicacionCuerpo.jsx";
import MenuIzquierdo from "../Componentes/MenuIzquierdo.jsx"

export default function CrearPublicacion(){
    return (
    <div>
      <Navibar/>
      <MenuIzquierdo/>
      <CrearPublicacionCuerpo/>
      <Footibar/>
    </div>
    );
  }