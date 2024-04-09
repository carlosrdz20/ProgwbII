import Footibar from "../Componentes/Footer.jsx";
import Navibar from "../Componentes/Navibar.jsx";
import CrearPublicacionCuerpo from "../Componentes/CrearPublicacionCuerpo.jsx";

export default function CrearPublicacion(){
    return (
    <div>
      <Navibar/>
      <CrearPublicacionCuerpo/>
      <Footibar/>
    </div>
    );
  }