import React, { useState, useEffect } from "react";
import Heart from "react-heart"
import { Link, useNavigate } from "react-router-dom";
import '../Estilos/PublicacionDisplay.css'
import { Row, Col, Container } from 'react-bootstrap';
import Rating from "./Rating";
import { FaPencil } from "react-icons/fa6";
import { FaRegPaperPlane, FaTrash } from "react-icons/fa";
import MiCarousel from "./Carousel.jsx";
import axios from "axios";
import useAuth from '../Context/useAuth';
import usePubAuth from '../Context/useAuthPub.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Corazon(props) {
	const navigate = useNavigate();
	const [active, setActive] = useState(props.Savedxd);	
	const { user, logout } = useAuth();
	
	const [formData, setFormData] = useState({
		IDPublicacion: props.IDPublicacionxd,
		IDUsuario: user.IDUsuario
	});

	
	useEffect(() => {
		
		const token = localStorage.getItem('token');
		
		if (!token) {
		  navigate("/");
		}
		// Aquí puedes realizar otras acciones después de que el estado textoBoton cambie
	  }, []);
	const HandleClick = async () => {

		setActive(!active);
		try {
			await axios.post('http://localhost:4200/insertarGuardado', formData, {
				headers: {
				  authorization: 'Bearer ' + localStorage.getItem('token')
				}
			  });
		  console.log('Guardado agregado correctamente');
		} catch (error) {
		  console.error('Error al agregar el guardado:', error);
		  logout();
		  alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
		  navigate('/');
		}
	};

	return (
		<div style={{ width: "50px" }}>
			<Heart isActive={active} onClick={HandleClick} animationScale = {1.2} animationTrigger = "both" activeColor = "rgb(227, 46, 118)" animationDuration = {.2} className = {`customHeart${active ? " active": ""}`}/>
		</div>
	);
}



function PublicDisplay({ IDPublicacion, idUsuario, NombreUsu, ImagenUsu, Fecha, Pais, Titulo, Contenido, Imagen1, Imagen2, Imagen3, Tipo, Saved, Pagina, Calificacion, PromCalificacion, Sigue }){
	const [rating, setRating] = useState(0);
	const navigate = useNavigate();	
	const {logout, user} = useAuth();
	const {guardarPublicacion} = usePubAuth();
	const [ratingData, setRatingData] = useState({
		IDPublicacion: IDPublicacion,
		IDUsuario: user.IDUsuario,
		Calificacion: 0
	});
	const [textoBoton, setTextoBoton] = useState("+Seguir");

	useEffect(() => {
		
		const token = localStorage.getItem('token');
		
		if (!token) {
		  navigate("/");
		}
		console.log("Sigue; ", Sigue);
		if(Sigue === 1){
            setTextoBoton('Siguiendo');
          }else{
            setTextoBoton('+ Seguir');
          }
	
		// Aquí puedes realizar otras acciones después de que el estado textoBoton cambie
	  }, [Sigue]);
	
	const handleRatingChange = async (newRating) => {
		const data = {
			Calificacion: newRating,
			IDPublicacion: IDPublicacion,
			IDUsuario: user.IDUsuario
		  };
	
		try {
			axios.post('http://localhost:4200/insertarCalificacion', {
				Calificacion: newRating,
				IDPublicacion: IDPublicacion,
				IDUsuario: user.IDUsuario
			  }, {
				headers: {
					authorization: 'Bearer ' + localStorage.getItem('token')
				}
			})
			.then(() => {
				console.log('Guardado agregado correctamente');
			})
			.catch(error => {
				console.error('Error al agregar el guardado:', error);
			});
		} catch (error) {
			console.error('Error al agregar el guardado:', error);
		}
	};
	

  const EditarPublicacion = async (idPublicacion) => {

    try {
		const response = await axios.get(`http://localhost:4200/bpID/${idPublicacion}`, {
			headers: {
			  authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: {
			  IDPublicacion: idPublicacion
			}
		  });
		  
      if (response.status === 200) {
        console.log("Datos de la publicación:");
        console.log(response.data);
        guardarPublicacion(response.data)
        alert("Publicación Editar");
        navigate('/EditarPublicacion'); // Navegar a la página de edición
      } else {
        console.error('Error Publicación:');
		alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
		navigate('/');
      }
    } catch (error) {
      console.error('Error Publicación fatal:', error);
	  alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
	  logout();
	  navigate('/');
    }
  };

  const EditarBorrador = async (idPublicacion) => {

    try {
		const response = await axios.get(`http://localhost:4200/bpID/${idPublicacion}`, {
			headers: {
			  authorization: 'Bearer ' + localStorage.getItem('token')
			},
			data: {
			  IDPublicacion: idPublicacion
			}
		  });
		  
      if (response.status === 200) {
        console.log("Datos de la publicación:");
        console.log(response.data);
        guardarPublicacion(response.data)
        alert("Borrador Editar");
        navigate('/EditarBorrador'); // Navegar a la página de edición
      } else {
        console.error('Error Publicación:');
		alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
		navigate('/');
      }
    } catch (error) {
      console.error('Error Publicación fatal:', error);
	  alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
	  logout();
	  navigate('/');
    }
  };

  const borrarPublicacion = async (idPublicacion) => {
	const confirmacion = window.confirm('¿Estás seguro de que deseas borrar esta publicación?');
	if(confirmacion){
		try {
			const response = await axios.put(`http://localhost:4200/borrarPublicacion/${idPublicacion}`, {
				IDPublicacion: idPublicacion // Pasa los datos directamente como un objeto
			}, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token') // Ajusta el nombre del encabezado
				}
			});
			
			if (response.status === 200) {
				navigate('/Inicio');
			} else {
				console.error('Error Publicación:');
				alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
				navigate('/');
			}
		} catch (error) {
			console.error('Error Publicación fatal:', error);
			alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
			logout();
			navigate('/');
		}
	}

};

	const EnviarPublicacion = async (idPublicacion) => {
		const confirmacion = window.confirm('¿Estás seguro de que deseas enviar esta publicación?');
		if(confirmacion){
			try {
				const response = await axios.put(`http://localhost:4200/enviarPublicacion/${idPublicacion}`, {
					IDPublicacion: idPublicacion // Pasa los datos directamente como un objeto
				}, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token') // Ajusta el nombre del encabezado
					}
				});
				
				if (response.status === 200) {
					navigate('/Inicio');
				} else {
					console.error('Error Publicación:');
					alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
					navigate('/');
				}
			} catch (error) {
				console.error('Error Publicación fatal:', error);
				alert("La sesión ya expiró, por favor vuelve a iniciar sesión");
				logout();
				navigate('/');
			}
		}

	};


	const handleSeguirClick = async (idUsuario) => {
		const userData = localStorage.getItem('user');
		const user = JSON.parse(userData);
		console.log("Usuario ID: ", user._id);
	
		const data = {
		  IDSeguidor: user._id,
		  IDSeguido: idUsuario
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
		  if(textoBoton === '+ Seguir'){
			setTextoBoton('Siguiendo');
		  }else{
			setTextoBoton('+ Seguir');
		  }
			} catch (error) {
			  console.error('Error al agregar el guardado:', error);
			}
	  };
	

  const Fecha2 = Fecha.split("T")[0]; //recortar la fecha
  //const Fecha2 = Fecha;
	
	return (
		<Container fluid className="ContainerPublic">
      <Row>
        <Col xs={12}>
          <Container fluid>
            <Row>
              <Col xs={12} md={3}>
                  <div className="ImgContainer">
                    <img
                      className="ImgUsu" 
                      src={`/Imagenes/${ImagenUsu}`}
                      alt="Imagen de Usuario"
                    />
                  </div>
              </Col>
              <Col xs={12} md={7}>
                {Tipo === 'Propio' ? (
                  <div className="NomBot">
                    <Link className="LinkUsuName" to={Tipo === 'Propio' ? '/Perfil' : Tipo === 'Ajeno' ? '/PerfilAjeno' : Tipo === 'Borrador' ? '/Perfil' : '/Perfil'} >{NombreUsu}</Link>			
                  </div>
                ) : Tipo === 'Ajeno' ? (
                  <div className="NomBot">
                    <Link className="LinkUsuName" to={'/PerfilAjeno'} onClick={() => localStorage.setItem('usuAjeno', idUsuario)}>{NombreUsu}</Link>
                    <button onClick={() => handleSeguirClick(idUsuario)}>{textoBoton}</button>
                  </div>
                ) : Tipo === 'Borrador' ? (
                  <div className="NomBot">
                    <Link className="LinkUsuName" to={'/Perfil'}>{NombreUsu}</Link>
                  </div>
                ) : Tipo === 'mpubAjeno' ?(
				<div className="NomBot">
					<span className="LinkUsuName" onClick={(e) => { e.preventDefault(); }}>{NombreUsu}</span>
				  </div>
				): null}
                <div className="FechaRating">
                  <div>
                    <h3>
                      {Fecha2}
                    </h3>
                  </div>
                  <div>
					{Tipo !== 'Borrador' && (
					<div>
						<h4>
						<label>Popularidad: </label>
						{PromCalificacion} <i className="bi bi-star-fill text-warning"></i>
						</h4>                    
					</div>
					)}                  
                  </div>
                  <div>
					{Tipo !== 'Propio' && Tipo !== 'Borrador' && (
					<div>
					<Rating initialRating={Calificacion} onRatingChange={handleRatingChange} />
					</div>
					)}   
                  </div>
                </div>
              </Col>
              <Col xs={12} md={2}>
                {Tipo === 'Propio' ? (
                  <Col lg={2} className="PaisReacc">
                    <img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
                  </Col>
                ) : Tipo === 'Ajeno' ? (
                  <Col lg={2} className="PaisReacc">
                    <img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
                    <Corazon IDPublicacionxd={IDPublicacion} Savedxd={Saved} />
                  </Col>
                ) : Tipo === 'Borrador' ? (
                  <Col lg={2} className="PaisReacc">
                    <img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
                  </Col>
                ) : Tipo === 'mpubAjeno' ? (
					<Col lg={2} className="PaisReacc">
                    <img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
					<Corazon IDPublicacionxd={IDPublicacion} Savedxd={Saved} />
                  </Col>
				): null}
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12}>
          <Container fluid className="ContenedorContenido">
            <Row>
              <Col md={12}>
                <h1>{Titulo}</h1>
              </Col>
              <Col md={12}>
                <h4>{Contenido}</h4>
              </Col>
              <Col md={12}>
                <Container className="MiCarouselContainer">
                  <MiCarousel
                    Imagen1={`${Imagen1}`}
                    Imagen2={`${Imagen2}`}
                    Imagen3={`${Imagen3}`}
                  />                  
                </Container>
              </Col>
              <Col md={12} className="PublicBotones">
                {Tipo === 'Propio' && Pagina !== "Inicio"? (
                  <div className="DivButtons">
                    <button onClick={() => borrarPublicacion(IDPublicacion)} ><FaTrash /></button>
                    <button onClick={() => EditarPublicacion(IDPublicacion)}><FaPencil /></button>
                  </div>
                ) : Tipo === 'Ajeno' ? (
                  <>
                  </>
                ) : Tipo === 'Borrador' && Pagina !== "Inicio" ? (
                  <div className="DivButtons">
                    <button onClick={() => borrarPublicacion(IDPublicacion)}><FaTrash /></button>
                    <button onClick={() => EditarBorrador(IDPublicacion)}><FaPencil /></button>
                    <button onClick={() => EnviarPublicacion(IDPublicacion)}><FaRegPaperPlane /></button>
                  </div>
                ) : null}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
	);
}

export default PublicDisplay;