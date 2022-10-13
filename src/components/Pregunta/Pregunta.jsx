import React, { useEffect } from "react";
import { Api, ApiPregunta } from "./../../services/Api";

const Pregunta = () => {
  useEffect(() => {
    pregunta();
  }, []);

  const pregunta = () => {
    ApiPregunta.Get("/preguntas.php?grupo=6&nivel=1")
      .then((res) => {
        console.log("Result Auth: ", res);
      })
      .catch((ex) => {
        console.error("error", ex);
      });
  };

  return <div></div>;
};
export default Pregunta;
