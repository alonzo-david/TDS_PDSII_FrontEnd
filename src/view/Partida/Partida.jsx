import React, { useState, useEffect } from "react";
import Pregunta from "../../components/Pregunta/Pregunta";
import Header from "../../components/Header/Header";
import "./Partida.css";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import { Container } from "@mui/system";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, IconButton } from "@mui/material";

const useStyles =  makeStyles((theme)=>({
   root:{
    height: '80vh',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"

   },
   partida:{
    height: '80vh',
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap"


   },
   media:{
    minHeight: "20%",
   },
   card:{
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems: "center",
    borderRadius: "100%",
    borderStyle: "hidden",
    boxShadow: "none",
    background: "#efefef",

    

   },
   IconBtn:{
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems: "center",


   }
}))

const Partida = () => {

  const [nuevaPartida, setNuevaPartida] = useState(false);
  useEffect(() => {
    console.log("useEffect Partida");
  }, []);


  const iniciarPartida = ()=> {
    swal({
      title: "Nueva Partida!",
      text: "Desea iniciar una nueva partida!",
      icon: "success",
      buttons: { cancel: "No", continue: "Si!"},
    }).then((value)=>{
      switch(value){
        case "continue":
          setNuevaPartida(true);

      }
      
    }
    );

  }

  const classes = useStyles();

  return (
    <React.Fragment>

      { nuevaPartida ?
        
      <Pregunta></Pregunta> 
      :
      <Container className={classes.root}
      >
      <Grid Container    className={classes.partida}>
 
      <Card sx={{ maxWidth: 285 }} className={classes.card}>
        <IconButton>
      <CardMedia
        component="img"
        
        image="https://i.ibb.co/XWmcbpG/profile-Img.jpg"
        alt="profile-img"
        className={classes.media}
      /> 
      
      </IconButton>
    </Card>
    
   
    <Card sx={{ maxWidth: 275 }} className={classes.card}>
    <IconButton onClick={iniciarPartida} className={classes.IconBtn}>
      <CardMedia
        component="img"
        className={classes.media}
        image="https://i.ibb.co/T1g45Yz/iniciar-Partida-Btn.jpg"
        alt="profile-img"
      />
       
        <Typography gutterBottom variant="h5" component="div">
          Iniciar Juego!
        </Typography>
       
    
      </IconButton>
  
    </Card>
   
       
        </Grid>
    
      </Container>
    
      }
      
      
      </React.Fragment>
  );
};

export default Partida;
