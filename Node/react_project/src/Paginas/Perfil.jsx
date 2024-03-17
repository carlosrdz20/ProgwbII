import Footibar from "../Componentes/Footer.jsx";
import Navibar from "../Componentes/Navibar.jsx";
import PerfilCuerpo from "../Componentes/PerfilCuerpo.jsx";

export default function Perfil(){
    return (
    <div>
      <Navibar />
      <PerfilCuerpo />
      <Footibar />
    </div>
    );
  }