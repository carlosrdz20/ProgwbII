import React, { useState, useEffect } from "react";
import '../Estilos/PerfilAjeno.css';
import MenuLateral from "./MenuIzquierdo.jsx";
import { Row, Col } from 'react-bootstrap';
import PublicDisplay from "./PublicacionDisplay.jsx";
import axios from "axios";



function PerfilAjenoCuerpo() {

  const [username, setUsername] = useState('');
  const [seguidores, setSeguidores] = useState();
  const [seguidos, setSeguidos] = useState();
  const [foto, setFoto] = useState();
  const [publicaciones, setPublicaciones] = useState([]);
  const [sigue, setSigue] = useState()
  const [textoSeguir, setTextoSeguir] = useState('+ Seguir')

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    console.log("Usuario ID: ", user._id);
    const buscarUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:4200/usuarioAjeno?userId=${localStorage.getItem('usuAjeno')}&sessionID=${user._id}`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
    
        if (response.status === 200) {
          const { usuario, seguidores, seguidos, sigue } = response.data;
          
          // Llenar los datos del usuario
          setUsername(usuario.NombreUsuario);
          setFoto(usuario.Foto);
          // Llenar los datos de seguidores y seguidos
          setSeguidores(seguidores);
          setSeguidos(seguidos);
          setSigue(sigue);
          if(sigue === 1){
            setTextoSeguir('Siguiendo');
          }else{
            setTextoSeguir('+ Seguir');
          }
          console.log("Sigue: ", sigue);
        } else {
          console.error('Error en la búsqueda:', response.status);
        }
      } catch (error) {
        console.error('Error fatal en búsqueda:', error);
      }
    };

    const ajenoPub = async () => {
          axios.get(`http://localhost:4200/mpubAjeno/${localStorage.getItem('usuAjeno')}`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token') 
      }
    })
      .then(response => {
        setPublicaciones(response.data);
        console.log("Se insertaron las publicaciones");
      })
      .catch(error => {
        console.error('Error al obtener las publicaciones:', error);
      });
    }

    buscarUsuario();
    ajenoPub();
  }, []); // Ejecutar una vez al cargar el componente

  const handleSeguirClick = async () => {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    console.log("Usuario ID: ", user._id);

    const data = {
      IDSeguidor: user._id,
      IDSeguido: localStorage.getItem('usuAjeno')
    };

    try {
      console.log(data.IDSeguidor);
      console.log(data.IDSeguido);
      await axios.post('http://localhost:4200/insertarSeguimiento', data, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
		  console.log('Guardado agregado correctamente');
      if(textoSeguir === '+ Seguir'){
        setTextoSeguir('Siguiendo');
      }else{
        setTextoSeguir('+ Seguir');
      }
		} catch (error) {
		  console.error('Error al agregar el guardado:', error);
		}
  };

  return (
    <div className="Cuerpo">
    <Row>
        <Col className="Izquierdo" xs={12}  md ={12} lg = {3}>
            <MenuLateral/>
        </Col>
        <Col className="col-5" xs={12} sm ={12} md ={12} lg = {6}>
          <Col className="ROW" xs={12} sm ={12} md ={12} lg = {6}>
              <Col className="COL">
                  <label className="Subtitulo">Seguidores</label>
                  <label className="Sub">{seguidores}</label>
                </Col>
                <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
                    <div className="foto">
                      <img src={`/Imagenes/${foto}`} alt="" className="FotoPerfil" />
                      <label className="USER">{username}</label> 
                    </div>
                    <button className="btn" onClick={handleSeguirClick}>
                    {textoSeguir}
                    </button>
                </Col>
                <Col className="COL" xs={12} sm ={12} md ={12} lg = {6}>
                    <label className="Subtitulo">Seguidos</label>
                    <label className="Sub">{seguidos}</label>
                </Col>
                
          </Col>
          <Col lg={12}>
            {publicaciones.map(publicacion => (
            <PublicDisplay
            IDPublicacion={publicacion.IDPublicacion}
            NombreUsu={publicacion.usuario.NombreUsuario}
            ImagenUsu={publicacion.usuario.Foto}
            Fecha={publicacion.FechaPub}
            Pais={publicacion.pais.imagen}
            Titulo={publicacion.Titulo}
            Contenido={publicacion.Descripcion}
            Imagen1={publicacion.ImagenUno}
            Imagen2={publicacion.ImagenDos}
            Imagen3={publicacion.ImagenTres}
            Tipo={publicacion.Tipo}
            Saved={publicacion.Saved}
            Pagina = "Inicio"
            Calificacion ={publicacion.Calificacion}
            PromCalificacion={publicacion.PromedioCalificaciones}
            idUsuario={publicacion.usuario._id}
            />
            ))}
        </Col>
      </Col>
    </Row>
    </div>
  );
}

export default PerfilAjenoCuerpo;
