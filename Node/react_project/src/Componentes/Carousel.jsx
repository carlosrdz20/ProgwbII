import React from 'react';
import Slider from 'react-slick';
import '../Estilos/PublicacionDisplay.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from 'react-bootstrap/Carousel';

const MiCarousel = ({ Imagen1, Imagen2, Imagen3 }) => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="PublicImagen" src={`/Imagenes/${Imagen1}`} alt="Imagen de Contenido" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="PublicImagen" src={`/Imagenes/${Imagen2}`} alt="Imagen de Contenido" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="PublicImagen" src={`/Imagenes/${Imagen3}`} alt="Imagen de Contenido" />
      </Carousel.Item>
    </Carousel>
  );
};

export default MiCarousel;