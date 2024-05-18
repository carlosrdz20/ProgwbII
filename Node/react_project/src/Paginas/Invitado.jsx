import Navibar from "../Componentes/Navibar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footibar from "../Componentes/Footer.jsx";
import InicioInvita from "../Componentes/InicioInvitado.jsx";


export default function Inicio(){
  return (
  <div>
    <Navibar />
    <InicioInvita />
    <Footibar />
  </div>
  );
}