import React, { useState } from "react"
import Heart from "react-heart"
import { Link } from "react-router-dom";
import '../Estilos/PublicacionDisplay.css'
import { Row, Col } from 'react-bootstrap';
import Rating from "./Rating";
import { FaPencil } from "react-icons/fa6";
import { FaRegPaperPlane, FaTrash } from "react-icons/fa";


function Corazon(props) {
	const [active, setActive] = useState(false)
	return (
		<div style={{ width: "50px" }}>
			<Heart isActive={active} onClick={() => setActive(!active)} animationScale = {1.2} animationTrigger = "both" activeColor = "rgb(227, 46, 118)" animationDuration = {.2} className = {`customHeart${active ? " active": ""}`}/>
		</div>
	);
}

function PublicDisplay({ NombreUsu, ImagenUsu, Fecha, Pais, Contenido, Imagen, Tipo }){
	const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
	
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
								<Link className="LinkUsuName" to={'/Perfil'}>{NombreUsu}</Link>				
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
							<p>{Fecha}</p>
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
								<Corazon />
							</Col>
						) : Tipo === 'Borrador' ? (
							<Col lg={2} className="PaisReacc">
								<img className="PublicBan" src={`/Imagenes/${Pais}`} alt="Bandera" />
							</Col>
						) : null}
				</Col>
				<Col className="PublicContenido" md={12}>
					<div>
						<p>{Contenido}</p>						
					</div>
					<div className="divImagen">
						<img className="PublicImagen" src={`/Imagenes/${Imagen}`} alt="Imagen de Contenido" />
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