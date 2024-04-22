import React, { useState } from "react";
import Heart from "react-heart"
import { Link, useNavigate } from "react-router-dom";
import '../Estilos/PublicacionDisplay.css'
import { Row, Col } from 'react-bootstrap';
import Rating from "./Rating";
import { FaPencil } from "react-icons/fa6";
import { FaRegPaperPlane, FaTrash } from "react-icons/fa";
import Carousel from "./Carousel.jsx";
import axios from "axios";
import useAuth from '../Context/useAuth';
import usePubAuth from '../Context/useAuthPub.js';


function Corazon(props) {
	const navigate = useNavigate();
	const [active, setActive] = useState(props.Savedxd);	
	const { user, logout } = useAuth();
	
	const [formData, setFormData] = useState({
		IDPublicacion: props.IDPublicacionxd,
		IDUsuario: user.IDUsuario
	});

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



function PublicDisplay({ IDPublicacion, NombreUsu, ImagenUsu, Fecha, Pais, Titulo, Contenido, Imagen1, Imagen2, Imagen3, Tipo, Saved, Pagina }){
	const [rating, setRating] = useState(0);
	const navigate = useNavigate();	
	const {logout} = useAuth();
	const {guardarPublicacion} = usePubAuth();
  const handleRatingChange = (newRating) => {
    setRating(newRating);
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


  const Fecha2 = Fecha.split("T")[0]; //recortar la fecha
  //const Fecha2 = Fecha;
	
	return (
		<div className="PublicContenedor">
			<Row>
				<Col className="UsuInfo" md={12}>
					<Col className="ColImg" lg={3}>
						<img className="ImgUsu" src={`/Imagenes/${ImagenUsu}`} alt="Imagen de Usuario" />
					</Col>
					<Col lg={7} className="DivCentro">
						{Tipo === 'Propio' ? (
							<div className="NomBot">
								<Link className="LinkUsuName" to={Tipo === 'Propio' ? '/Perfil' : Tipo === 'Ajeno' ? '/PerfilAjeno' : Tipo === 'Borrador' ? '/Perfil' : '/Perfil'}>{NombreUsu}</Link>			
							</div>
						) : Tipo === 'Ajeno' ? (
							<div className="NomBot">
								<Link className="LinkUsuName" to={'/PerfilAjeno'}>{NombreUsu}</Link>
								<button>+Seguir</button>
							</div>
						) : Tipo === 'Borrador' ? (
							<div className="NomBot">
								<Link className="LinkUsuName" to={'/Perfil'}>{NombreUsu}</Link>
							</div>
						) : null}
						<div className="FechaRating">
							<p>{Fecha2}</p>
							<Rating initialRating={rating} onRatingChange={handleRatingChange} />
						</div>
					</Col>
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
						) : null}
				</Col>
				<Col className="PublicContenido" md={12}>
					<div>
						<h1>{Titulo}</h1>
					</div>
					<div>
						<p>{Contenido}</p>
					</div>
					<div className="CarouselDiv">	
						<Carousel
							Imagen1={`${Imagen1}`}
							Imagen2={`${Imagen2}`}
							Imagen3={`${Imagen3}`}
						/>							
					</div>

					{Tipo === 'Propio' && Pagina !== "Inicio"? (
						<div className="DivButtons">
							<button onClick={() => borrarPublicacion(IDPublicacion)} ><FaTrash /></button>
							<button onClick={() => EditarPublicacion(IDPublicacion)}><FaPencil /></button>
						</div>
					) : Tipo === 'Ajeno' ? (
						<></>
					) : Tipo === 'Borrador' && Pagina !== "Inicio" ? (
						<div className="DivButtons">
							<button onClick={() => borrarPublicacion(IDPublicacion)}><FaTrash /></button>
							<button onClick={() => EditarBorrador(IDPublicacion)}><FaPencil /></button>
							<button onClick={() => EnviarPublicacion(IDPublicacion)}><FaRegPaperPlane /></button>
						</div>
					) : null}
				</Col>
			</Row>
		</div>
	);
}

export default PublicDisplay;