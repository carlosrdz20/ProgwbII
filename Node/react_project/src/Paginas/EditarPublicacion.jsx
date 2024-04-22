import Footibar from "../Componentes/Footer.jsx";
import Navibar from "../Componentes/Navibar.jsx";
import EditarPublicacion from "../Componentes/EditarPublicacionCuerpo.jsx";

export default function EditarPub(){
    return (
    <div>
      <Navibar/>
      <EditarPublicacion/>
      <Footibar/>
    </div>
    );
  }