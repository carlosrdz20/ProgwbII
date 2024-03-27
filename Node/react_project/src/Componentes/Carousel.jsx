import React from 'react';
import Slider from 'react-slick';
import '../Estilos/PublicacionDisplay.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ Imagen1, Imagen2, Imagen3 }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div className='ImgContenedor'>
        <img className="PublicImagen" src={`/Imagenes/${Imagen1}`} alt="Imagen de Contenido" />
      </div>
      <div className='ImgContenedor'>
        <img className="PublicImagen" src={`/Imagenes/${Imagen2}`} alt="Imagen de Contenido" />
      </div>
      <div className='ImgContenedor'>
        <img className="PublicImagen" src={`/Imagenes/${Imagen3}`} alt="Imagen de Contenido" />
      </div>
      {/* Agrega más elementos div para más slides */}
    </Slider>
  );
};

export default Carousel;