import React, { useState, useEffect } from "react";
import { Api, ApiPregunta } from "./../../services/Api";
import axios from "axios";
import swal from 'sweetalert';
import { Card, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";

const useStyles =  makeStyles((theme)=>({
  root:{
    height: '80vh',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap:"5%"
    

   },
   respuestasContainer:{

    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap"


   },
   card:{
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems: "center",
    borderRadius: "10%",
    padding: "10px 20px",
    borderStyle: "solid",
    boxShadow: "5% 5%",
    background: "#efefef",
  
   },
   cardSeleccionada:{
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems: "center",
    borderRadius: "10%",
    padding: "10px 20px",
    borderStyle: "solid",
    boxShadow: "5% 5%",
    background: "#2d922a",
    color: "#fff",
    borderColor: "#000"

   },
   IconBtn:{
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems: "center",
    borderRadius: "10%",
    padding: "10px 20px",
    borderStyle: "solid",
    boxShadow: "5% 5%",
    background: "#efefef",


   },
   comprobarContainer:{
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems: "center",
    marginTop: "4%",
   },
   cardBtnComprobar:{
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems: "center",
    borderRadius: "10%",
    padding: "10px 20px",
    borderStyle: "solid",
    boxShadow: "5% 5%",
    background: "#efefef",
   },
   

}));





const Pregunta = () => {

  const [pregunta, setPregunta] = useState({pregunta: "", respuesta1: {
    respuesta: "",
    esCorrecta: 0,
    seleccionada: false
  },
  respuesta2: {
    respuesta: "",
    esCorrecta: 0,
    seleccionada: false
  },
  respuesta3: {
    respuesta: "",
    esCorrecta: 0,
    seleccionada: false
  }

});

const [nivel, setNivel] = useState(1)
const [siguienteNivel, setSiguienteNivel] = useState(false)
const [grupo, setGrupo] = useState(1);


  useEffect(() => {
    getPreguntas();
    setSiguienteNivel(false);
  }, [siguienteNivel]);



  const getPreguntas = () => {
  
    axios.get(`http://ec2-44-203-35-246.compute-1.amazonaws.com/preguntas.php?nivel=${nivel}&grupo=${grupo}`)
    .then(res => {
      console.log(res);
      setPregunta(prevPregunta => {
        return {...prevPregunta, 
          pregunta: res.data.pregunta, 
          respuesta1: {
            respuesta: res.data.respuesta_1.text,
            esCorrecta: res.data.respuesta_1.is_correct,
            seleccionada: false
            
            
          },
          respuesta2: {
            respuesta: res.data.respuesta_2.text,
            esCorrecta: res.data.respuesta_2.is_correct,
            seleccionada: false
          },
          respuesta3: {
            respuesta: res.data.respuesta_3.text,
            esCorrecta: res.data.respuesta_3.is_correct,
            seleccionada: false
          }

        }
      });



    }).catch(err =>{
      console.log(err);
    })

   


    /*
    ApiPregunta.Get("/preguntas.php?nivel=1&grupo=1")
      .then((res) => {
        console.log("Result Auth: ", res.json());
      })
      .catch((ex) => {
        console.error("error prueba", ex);
      });*/
  };

  const comprobarRespuesta = ()=>{
      
    if(pregunta.respuesta1.seleccionada && pregunta.respuesta1.esCorrecta == 1){
       
       swal({
        title: "Respuesta Correcta!",
        text: "You clicked the button!",
        icon: "success",
        buttons: { cancel: "Intentar de nuevo!", continue: "Continuar al siguiente nivel!"},
      }).then((value)=>{
        switch(value){
          case "continue":
            setNivel(nivel + 1);
            setSiguienteNivel(true);

    
        
      }}
      );
    }else if(pregunta.respuesta2.seleccionada && pregunta.respuesta2.esCorrecta == 1){
      
      swal({
        title: "Respuesta Correcta!",
        text: "You clicked the button!",
        icon: "success",
        buttons:{ cancel: "Intentar de nuevo!", continue: "Continuar al siguiente nivel!"},
      }).then((value)=>{
        switch(value){
          case "continue":
            setNivel(nivel + 1);
            setSiguienteNivel(true);

        }
        
      }
      );
    }else if(pregunta.respuesta3.seleccionada && pregunta.respuesta3.esCorrecta == 1){
      
      swal({
        title: "Respuesta Correcta!",
        text: "You clicked the button!",
        icon: "success",
        buttons: { cancel: "Intentar de nuevo!", continue: "Continuar al siguiente nivel!"},
      }).then((value)=>{
        switch(value){
          case "continue":
            setNivel(nivel + 1);
            setSiguienteNivel(true);

        }
        
      }
      );
    }else{
      console.log("Respuesta incorrecta")

      swal({
        title: "Respuesta Incorrecta!",
        text: "No te rindas, tu puedes!",
        icon: "error",
        button:  "Intentar de nuevo!",
      });
    }
  
    
}
const classes = useStyles();
  return <Container className={classes.root}>
    <Container  id="pregunta">
    <Typography
    variant="h4"
    component="div"
    textAlign="center"
    >
      {pregunta.pregunta}
    </Typography>
    </Container>
    <Container>
    < Container id="respuestas" className={classes.respuestasContainer} >
      
      
        <IconButton onClick={()=>setPregunta(prevPregunta=> {return{...prevPregunta,  
       
        respuesta1 : { ...prevPregunta.respuesta1,    
        seleccionada : prevPregunta.respuesta1.seleccionada = true },
        respuesta2 : { ...prevPregunta.respuesta2, 
          seleccionada : prevPregunta.respuesta2.seleccionada = false },
        respuesta3 : {  ...pregunta.respuesta3,
            seleccionada : prevPregunta.respuesta3.seleccionada = false } 

        }})}>
           <Card sx={{ maxWidth: 285 }} id="respuesta_1" className={pregunta.respuesta1.seleccionada? classes.cardSeleccionada:  classes.card }>
          <Typography variant="h6">
          {pregunta.respuesta1.respuesta}
          </Typography>
          
      </Card>
      </IconButton>
     
        <IconButton
          onClick={()=>setPregunta(prevPregunta=> {return{...prevPregunta,  
            respuesta1 : {  ...prevPregunta.respuesta1,
              seleccionada : prevPregunta.respuesta1.seleccionada = false },
            respuesta2 : {  ...prevPregunta.respuesta2,
              seleccionada : prevPregunta.respuesta2.seleccionada = true },
            respuesta3 : {  ...prevPregunta.respuesta3,
              seleccionada : prevPregunta.respuesta3.seleccionada = false },
  
          }})}
        >
           <Card sx={{ maxWidth: 285 }} id="respuesta_2" className={pregunta.respuesta2.seleccionada? classes.cardSeleccionada:  classes.card }>
          <Typography textAlign="center" variant="h6">
          {pregunta.respuesta2.respuesta}
          </Typography>
      
      </Card>
      </IconButton>

        <IconButton
          onClick={()=>setPregunta(prevPregunta=> {return{...prevPregunta,  
            respuesta1 : {  ...prevPregunta.respuesta1,
              seleccionada : prevPregunta.respuesta1.seleccionada = false },
            respuesta2 : {  ...prevPregunta.respuesta2,
              seleccionada : prevPregunta.respuesta2.seleccionada = false },
            respuesta3 : {  ...prevPregunta.respuesta3,
              seleccionada : prevPregunta.respuesta3.seleccionada = true },
  
          }})}
        
        >
           <Card sx={{ maxWidth: 285 }} id="respuesta_3" className={pregunta.respuesta3.seleccionada? classes.cardSeleccionada:  classes.card }>
          <Typography variant="h6">
          {pregunta.respuesta3.respuesta}
          </Typography>
          
          
      </Card>
      </ IconButton>
          
     


      </Container>
     
    </Container>
    <Container id="comprobar" className={classes.comprobarContainer}>
                    <IconButton className={classes.comprobarBtn} id="btn-comprobar" onClick={comprobarRespuesta} >
                    <Card sx={{ maxWidth: 385 }} id="comprobarBtn" className={classes.cardBtnComprobar}>

                      <Typography variant="h6">
                      Comprobar
                      </Typography>
                      </Card>
                       </   IconButton>
          
      </Container>

  </Container>;
};
export default Pregunta;
