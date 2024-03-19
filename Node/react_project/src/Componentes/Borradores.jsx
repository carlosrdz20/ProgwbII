import React, { useState } from "react"
import Heart from "react-heart"
import '../Estilos/PublicacionDisplay.css'
import { Row, Col } from 'react-bootstrap';
import Rating from "./Rating";

function Corazon(props) {
	const [active, setActive] = useState(false)
	return (
		<div style={{ width: "3rem" }}>
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
				<Col sm={3} md={3} xl={3} xxl={3}>	
					<img className="PublicUsu" src={`/Imagenes/${ImagenUsu}`} alt="Imagen de Usuario" />
				</Col>
				<Col sm={7} md={7} xl={7} xxl={7} className="PublicCentro">
					<div className="NombreSeguir">
						<a href="">{NombreUsu}</a>
						<button>+Seguir</button>						
					</div>
					<div className="FechaRating">
						<p>{Fecha}</p>
						<Rating initialRating={rating} onRatingChange={handleRatingChange} />
					</div>
				</Col>
				<Col sm={12} md={2} xl={2} xxl={2} className="PublicDerecha">
					<img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
					<Corazon/>
				</Col>
				<Col className="PublicTextoImg" md={12}>
					<p>{Contenido}</p>
					<img className="PublicImg" src={"Imagenes/Registro_BG.jpg"} alt="" />
				</Col>
			</Row>
		</div>
	);
}

export default PublicDisplay;