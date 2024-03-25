import '../Estilos/Base.css'
import Navibar from "../Componentes/Navibar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footibar from "../Componentes/Footer.jsx";
import MisBorraCuerpo from "../Componentes/MisBorraCuerpo.jsx"


export default function Inicio(){
  return (
  <div>
    <Navibar />
    <MisBorraCuerpo />
    <Footibar />
  </div>
  );
}