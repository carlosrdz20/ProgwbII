import '../Estilos/Base.css'
import Navibar from "../Componentes/Navibar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footibar from "../Componentes/Footer.jsx";
import MisPublicCuerpo from "../Componentes/MisPublicCuerpo.jsx"


export default function Inicio(){
  return (
  <div>
    <Navibar />
    <MisPublicCuerpo />
    <Footibar />
  </div>
  );
}