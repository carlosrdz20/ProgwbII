import '../Estilos/Base.css'
import Navibar from "../Componentes/Navibar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footibar from "../Componentes/Footer.jsx";
import MisFavoCuerpo from "../Componentes/MisFavoCuerpo.jsx"


export default function Inicio(){
  return (
  <div>
    <Navibar />
    <MisFavoCuerpo />
    <Footibar />
  </div>
  );
}