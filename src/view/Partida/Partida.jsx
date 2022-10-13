import React, { useEffect } from "react";
import Pregunta from "../../components/Pregunta/Pregunta";

import "./Partida.css";

const Partida = () => {
  useEffect(() => {
    console.log("useEffect Partida");
  }, []);

  return (
    <div>
      <Pregunta></Pregunta>
    </div>
  );
};

export default Partida;
