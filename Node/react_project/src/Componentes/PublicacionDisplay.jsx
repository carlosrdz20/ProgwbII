import React, { useState } from "react";
import Heart from "react-heart"
import { Link } from "react-router-dom";
import '../Estilos/PublicacionDisplay.css'
import { Row, Col } from 'react-bootstrap';
import Rating from "./Rating";
import { FaPencil } from "react-icons/fa6";
import { FaRegPaperPlane, FaTrash } from "react-icons/fa";
import Carousel from "./Carousel.jsx";
import axios from "axios";


function Corazon(props) {
	const [active, setActive] = useState(false);
	const userData = localStorage.getItem('user');
	const user = JSON.parse(userData);
	const [formData, setFormData] = useState({
		IDPublicacion: props.IDPublicacionxd,
		IDUsuario: user.IDUsuario
	});

	const HandleClick = async () => {
		setActive(!active);
		try {
			await axios.post('http://localhost:4200/insertarGuardado', formData);
		  console.log('Guardado agregado correctamente');
		} catch (error) {
		  console.error('Error al agregar el guardado:', error);
		}
	};

	return (
		<div style={{ width: "50px" }}>
			<Heart isActive={active} onClick={HandleClick} animationScale = {1.2} animationTrigger = "both" activeColor = "rgb(227, 46, 118)" animationDuration = {.2} className = {`customHeart${active ? " active": ""}`}/>
		</div>
	);
}

function PublicDisplay({ IDPublicacion, NombreUsu, ImagenUsu, Fecha, Pais, Titulo, Contenido, Imagen1, Imagen2, Imagen3, Tipo }){
	const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const Fecha2 = Fecha.split("T")[0]; //recortar la fecha
	
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
								<Corazon IDPublicacionxd={IDPublicacion} />
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
					{Tipo === 'Propio' ? (
							<div className="DivButtons">
								<button><FaTrash /></button>
								<button><FaPencil /></button>
							</div>
						) : Tipo === 'Ajeno' ? (
							<></>
						) : Tipo === 'Borrador' ? (
							<div className="DivButtons">
								<button><FaTrash /></button>
								<button><FaPencil /></button>
								<button><FaRegPaperPlane /></button>
							</div>
						) : null}
				</Col>
			</Row>
		</div>
	);
}

export default PublicDisplay;