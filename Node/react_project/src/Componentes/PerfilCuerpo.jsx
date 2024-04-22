import '../Estilos/PerfilCuerpo.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from '../Context/UserContext';
import useAuth from '../Context/useAuth';

function PerfilCuerpo() {

  const { user } = useAuth();
  const [fechaFormateada, setFecha] = useState();
  const [fotoxd, setFotoxd] = useState();
  const [user2, setuser2] = useState();

  useEffect(() => {
    if (user) {
      setuser2(user);
      // Formatear la fecha
      setFecha(user.FechaNacimiento.split('T')[0]);
      setFotoxd(`/Imagenes/${user.Foto}`);
    }
  }, []);

  return (
    <div className="PerfilCuerpo">
      <Row>
        <Col className="Izquierdo" xs={12}  md ={12} lg = {3}>
          <MenuLateral/>
        </Col>

        <Col className="PerfilROW" xs={12} sm ={12} md ={12} lg = {9}>
          <Col className="PerfilCOL">
            <form action="#" enctype="multipart/form-data">

            </form>
            <div className="InputContainer">
              <p>Nombre de usuario:</p>
              <input type="text" id="Usuario" className="InputPerfil" name="NombreUsuario" defaultValue={user.NombreUsuario} disabled/>
            </div>
            <div className="InputContainer">
              <p>Nombre completo:</p>
              <input type="text" id="Nombre" className="InputPerfil" name="Nombre" defaultValue={user.Nombre} disabled/>
            </div>
            <div className="InputContainer">
              <p>Contraseña Actual:</p>
              <input type="text" id="Password" className="InputPerfil" name="Contrasena" defaultValue={user.Contrasena} disabled/>
            </div>
          </Col>
          <Col className="PerfilCOL" xs={12} sm ={12} md ={12} lg = {6}>
            <div className="InputContainer">
              <p>Correo electronico:</p>
              <input type="text" id="Correo" className="InputPerfil" name="Correo" defaultValue={user.Correo} disabled/>
            </div>
            <div className="InputContainer">
              <p>Género:</p>
              <select id="Combobox" className="Combobox" name="Genero" defaultValue={user.Genero === 'masculino' ? "masculino" : "femenino"} disabled>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>
            <div className="InputContainer">
              <p>Fecha de nacimiento:</p>
              <input type="date" id="fecha" className="InputPerfil" name="FechaNacimiento" defaultValue={fechaFormateada} disabled/>
            </div>
            <div>
              <Link to={"/EditarPerfil"}>
                <button className="btn">Editar Perfil</button>   
              </Link>
            </div>
          </Col>
          <Col className="PerfilCOL" xs={12} sm ={12} md ={12} lg = {6}>
            <div className="foto">
              <p>Foto de perfil:</p>
              <img src={fotoxd} alt="" className="FotoPerfil" />
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default PerfilCuerpo;
