import React, { useState } from "react";
import '../Estilos/CrearPublicacion.css';
import { MenuLateral } from "./MenuIzquierdo.jsx";

function CrearPublicacion() {

    return (
    <div className="Cuerpo">
        <div>
          <MenuLateral />
        </div>
        <div class="contenedor">
            <div class="recuadro">
                <div class="recuadro-pequeno">
                    <div class="column">
                        <div class="input-container">
                            <label for="input1" class="input-label">Título:</label>
                            <input type="text" id="input1" class="blue-border" placeholder="Ingrese aquí"/>
                        </div>
                        <div class="input-container">
                            <label for="input2" class="input-label">Descripción:</label>
                            <input type="text" id="input2" class="blue-border" placeholder="Ingrese aquí"/>
                        </div>
                    </div>
                    <div class="column">
                        <div class="input-container">
                            <label for="combobox" class="input-label">País:</label>
                            <select id="combobox" class="blue-border">
                                <option value="opcion1">Opción 1</option>
                                <option value="opcion2">Opción 2</option>
                                <option value="opcion3">Opción 3</option>
                            </select>
                        </div>
                        <div class="button-container">
                        <   button class="button">Guardar como borrador</button>
                        </div>
                    </div>
                    <div class="column">
                        <div class="input-container">
                            <label for="photoInput" class="input-label">Publicar:</label>
                            <input type="file" id="photoInput" accept="image/*" class="fotoinput"/>
                        </div>
                        <div class="image-container">
                            <img src="./imagen.jpg" alt="Imagen" id="uploadedImage"/>
                        </div>
                        <div class="button-container">
                            <button class="button">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default CrearPublicacion;
  