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

function PublicDisplay({}){
	const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
	
	return (
		<div className="PublicContenedor">
			<Row>
				<Col md={2}>	
					<img className="PublicUsu" src={"Imagenes/Perfil.png"} alt="Imagen de Usuario" />
				</Col>
				<Col md={8} className="PublicCentro">
					<div className="NombreSeguir">
						<a className="NombreUsu" href="">Nombre de Usuario</a>
						<button>+Seguir</button>						
					</div>
					<div className="FechaRating">
						<p>12/12/12</p>
						<Rating initialRating={rating} onRatingChange={handleRatingChange} />
					</div>
				</Col>
				<Col md={2} className="PublicDerecha">
					<img className="PublicBan" src={"Imagenes/bandera.png"} alt="" />
					<Corazon/>
				</Col>
				<Col className="PublicTextoImg" md={12}>
					<p>Prueba de Texto Prueba de Texto Prueba de Texto Prueba de Texto Prueba de Texto Prueba de Texto Prueba de Texto Prueba de Texto Prueba de Texto Prueba de Texto</p>
					<img className="PublicImg" src={"Imagenes/Registro_BG.jpg"} alt="" />
				</Col>
			</Row>
		</div>
	);
}

export default PublicDisplay;