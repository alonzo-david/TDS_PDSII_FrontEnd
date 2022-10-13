import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Footer = () => {
  const JFooter = [
    {
      title: "Servicios",
      t1: "Instalaciones",
      t2: "Tiendas",
      t3: "Privilegio",
      t4: "Servicio a Empresas",
      t5: "Bodas",
    },
    {
      title: "Venta en línea",
      t1: "Retira en tienda",
      t2: "Métodos de pago",
      t3: "Preguntas frecuentes",
      t4: "Privacidad y seguridad",
      t5: "Términos y condiciones",
    },
    {
      title: "Nuestros Valores",
      t1: "Sostenibilidad",
      t2: "Garantía Total",
      t3: "Certificación Sistema B",
      t4: "",
      t5: "",
    },
    {
      title: "Grupo CEMACO",
      t1: "Únete a nuestro equipo",
      t2: "Sobre nosotros",
      t3: "Deseas se un proveedor",
      t4: "Juguetón",
      t5: "Bebé Juguetón",
    },
    {
      title: "Mantente Conectado",
      t1: "Compra por Whatsapp",
      t2: "(502)2499-9990",
      t3: "tusamigos@cemaco.com",
      t4: "Chat en línea",
      t5: "",
    },
  ];
  
  return (
    <div className="bar-info">
      <Grid
        container
        spacing={0}
      >
        
      </Grid>
    </div>
  );
};

export default Footer;
