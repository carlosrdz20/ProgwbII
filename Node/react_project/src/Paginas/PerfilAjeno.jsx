import Navibar from "../Componentes/Navibar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import PerfilAjenoCuerpo from "../Componentes/PerfilAjenoCuerpo.jsx";
import Footibar from "../Componentes/Footer.jsx"


export default function PerfilAjeno(){
  return (
  <div>
    <Navibar/>
    <PerfilAjenoCuerpo/>
    <Footibar />
  </div>
  );
}