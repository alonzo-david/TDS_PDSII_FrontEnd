import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function ContainedButtons() {
  return (
    <div className="bottom mt-5 d-md-flex align-items-md-center">
      <div className="col-sm-12 col-md-6 col-xl-6 text-center ">
        <h1 className="display-1">¡UH OH!</h1>
        <h2>Estas perdido la página que buscas no existe.</h2>
        <h3>Cómo llegaste aquí es un misterio.</h3>
        <h5>Da click al botón de abajo para volver a la página de inicio.</h5>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" className="btngd mt-5">
            <font size="2">
              Inicio
            </font>
          </Button>
        </Link>
      </div>
    </div>
  );
}