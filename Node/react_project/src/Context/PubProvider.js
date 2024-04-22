import React, { createContext, useState, useEffect } from "react";

export const PublicacionContext = createContext();

const PublicacionProvider = (props) => {
  const [publicacion, setPublicacion] = useState(JSON.parse(localStorage.getItem('publicacion')) || null);

  useEffect(() => {
    const storedPublicacion = JSON.parse(localStorage.getItem('publicacion'));
    if (storedPublicacion) {
      setPublicacion(storedPublicacion);
    }
  }, []);

  const guardarPublicacion = (datosPublicacion) => {
    setPublicacion(datosPublicacion);
    localStorage.setItem('publicacion', JSON.stringify(datosPublicacion));
  };

  const contextValue = {
    guardarPublicacion,
    publicacion
  };

  return (
    <PublicacionContext.Provider value={contextValue}>
      {props.children}
    </PublicacionContext.Provider>
  );
};

export default PublicacionProvider;
