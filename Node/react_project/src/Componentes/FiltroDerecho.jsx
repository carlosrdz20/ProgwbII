import React from "react";
import '../Estilos/FiltroDerecho.css'

function FiltroLateral(){
  return (
    <div className="Filtros">
      <h1>"Filtros"</h1>
      <div className="FiltrosDiv">
        <p>Fecha Incial: </p>
        <input type="date" id="FiltroFeIni"/>
      </div>
      <div className="FiltrosDiv">
        <p>Fecha Final: </p>
        <input type="date" id="FiltroFeFin"/>
      </div>
      <div className="FiltrosDiv">
        <p>País: </p>
        <select name="FiltroPais" defaultValue="">
          <option value="Todos">Todos</option>
          <option value="Mexio">México</option>
          <option value="Japon">Japon</option>
          <option value="Etc">Etc</option>
        </select>
      </div>
      <div className="FiltrosDivBotones">
        <button>Limpiar</button>
        <button>Aplicar</button>
      </div>
    </div>
  );
}

export default FiltroLateral;