import React, { useEffect } from "react";
import Pregunta from "../../components/Pregunta/Pregunta";

import "./Partida.css";



const Partida = () => {
  useEffect(() => {
    console.log("useEffect Partida");
  }, []);

  

  return (
    <div>
      <h1>Partida</h1>
    </div>
  );
};

export default Partida;
