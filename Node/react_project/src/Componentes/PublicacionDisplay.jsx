import React, { useState } from "react"
import Heart from "react-heart"
import { Link } from "react-router-dom";
import '../Estilos/PublicacionDisplay.css'
import { Row, Col } from 'react-bootstrap';
import Rating from "./Rating";

function Corazon(props) {
	const [active, setActive] = useState(false)
	return (
		<div style={{ width: "50px" }}>
			<Heart isActive={active} onClick={() => setActive(!active)} animationScale = {1.2} animationTrigger = "both" activeColor = "rgb(227, 46, 118)" animationDuration = {.2} className = {`customHeart${active ? " active": ""}`}/>
		</div>
	);
}

function PublicDisplay({ NombreUsu, ImagenUsu, Fecha, Pais, Contenido, Imagen }){
	const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
	
	return (
		<div className="PublicContenedor">
			<Row>
				<Col className="UsuInfo" md={12}>
					<Col lg={3}>
						<img className="ImgUsu" src={`/Imagenes/${ImagenUsu}`} alt="Imagen de Usuario" />
					</Col>
					<Col lg={7} className="DivCentro">
						<div className="NomBot">
							<Link className="LinkUsuName">{NombreUsu}</Link>
							<button>+Seguir</button>							
						</div>
						<div className="FechaRating">
							<p>{Fecha}</p>
							<Rating initialRating={rating} onRatingChange={handleRatingChange} />
						</div>
					</Col>
					<Col lg={2} className="PaisReacc">
						<img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
						<Corazon/>
					</Col>
				</Col>
				<Col className="PublicContenido" md={12}>
					<div>
						<p>{Contenido}</p>						
					</div>
					<div className="divImagen">
						<img className="PublicImagen" src={`/Imagenes/${Imagen}`} alt="Imagen de Contenido" />
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default PublicDisplay;