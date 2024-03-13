import '../Estilos/Inicio.css'
import Navibar from "../Componentes/Navibar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footibar from "../Componentes/Footer.jsx";
import InicioCuerpo from "../Componentes/InicioCuerpo.jsx";


export default function Inicio(){
  return (
  <div>
    <Navibar />
    <InicioCuerpo />
    <Footibar />
  </div>
  );
}