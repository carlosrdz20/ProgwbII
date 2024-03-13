import React, { useState } from "react";
import '../Estilos/DestPopu.css'
import { TiFlag } from "react-icons/ti";

function DestPopu({ Imagen, Pais }) {
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
          src={Imagen}
          alt="Bandera"
          onError={handleError}
        />
      )}
      <p>{Pais}</p>
    </div>
  );
}

export default DestPopu;