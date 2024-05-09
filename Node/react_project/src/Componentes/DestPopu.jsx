import React, { useState } from "react";
import '../Estilos/DestPopu.css'
import { TiFlag } from "react-icons/ti";

function DestPopu({ Imagen, Pais, Num }) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <div className="DestPopuContenedor">
      {error ? (
        <TiFlag />
      ) : (
        <img 
          src={`/Imagenes/${Imagen}`}
          alt="Bandera"
          onError={handleError}
          style={{marginRight:"5px"}}
        />
      )}
      <p> {(`${Num}.-${Pais}`)} </p>
    </div>
  );
}

export default DestPopu;