import Navibar from "../Componentes/Navibar.jsx";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footibar from "../Componentes/Footer.jsx";
import MisPublicCuerpo from "../Componentes/MisPublicCuerpo.jsx"
import { Link, useNavigate } from "react-router-dom";


export default function Inicio(){

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Si no hay token, redirigir al usuario a la página de inicio
    if (!token) {
      navigate("/");
    }

  }, []);

  return (
  <div>
    <Navibar />
    <MisPublicCuerpo />
    <Footibar />
  </div>
  );
}