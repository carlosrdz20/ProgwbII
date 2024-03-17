import { FaSearch } from "react-icons/fa";
import { Form, Button } from 'react-bootstrap';
import '../Estilos/Buscador.css'

export default function Buscador() {
  return (
    <div className='NavbarBuscadorContenedor'>
      <div className='Navbar_Buscador_Contenedor'>
        <Form className="Navbar-Buscador d-flex" role="search">
          <input type="search" placeholder='Buscar' className='Navbar-Buscador' aria-label='Buscar'/>
          <Button className='Navbar_Buscador_Boton'> <FaSearch /> </Button>
        </Form>
      </div>
      <div>
        <button className='Navbar_Buscador_BusAvan'> Busqueda Avanzada </button>
      </div>
    </div>
  );
}