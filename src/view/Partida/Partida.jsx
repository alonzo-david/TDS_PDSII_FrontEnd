import React, {
  useEffect,
  Fragment,
  useState,
} from "react";
import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid,
  CardActionArea,
  CardContent,
  Card,
} from "@mui/material";
import { Api, ApiPregunta } from "./../../services/Api";

import "./Partida.css";
import { withRouter, useHistory } from "react-router-dom";
import { CheckSession } from "../../services/Sessions";
import Swal from "sweetalert2";

const steps = [
  "Nivel 1",
  "Nivel 2",
  "Nivel 3",
  "Nivel 4",
  "Nivel 5",
  "Nivel 6",
  "Nivel 7",
  "Nivel 8",
  "Nivel 9",
  "Nivel 10",
];

const Partida = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isCorrect, setIsCorrect] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [noPregunta, setNoPregunta] = useState(null);
  const [cardSelected, setCardSelected] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState([]);
  const history = useHistory();

  useEffect(() => {
    console.log("useEffect Partida");

    // setNoPregunta(props.questionNo);
    // setActiveStep(props.questionNo - 1);
    // getPreguntas(props.questionNo);
    debugger;
    const userid = CheckSession("userId");
    getRestaurarPartida(userid);
    //getRestaurarPartida();
  }, []);

  useEffect(() => {
    console.log("Partida No. Pregunta: ", noPregunta);
    getPreguntas(noPregunta);
  }, [noPregunta]);

  const getTipoUsuarios = () => {
    Api.Get("/tipousuario")
      .then((res) => {
        console.log("Result Auth: ", res);
      })
      .catch((ex) => {
        console.error("error", ex);
      });
  };

  const getPreguntas = (_noPregunta) => {
    ApiPregunta.Get("/preguntas.php?grupo=6&nivel=" + _noPregunta)
      .then((res) => {
        // console.log("Result Auth: ", res.data.json());
        const result = Object.values(res.data);
        console.log("Result Auth: ", result);
        setPreguntas(result);
      })
      .catch((ex) => {
        console.error("error", ex);
      });
  };

  const getRestaurarPartida = (idUser) => {
    const { currentLevel, currentScore, restartScore } = props;

    restartScore();

    Api.Get("/partida/restaurar-partida/" + idUser)
      .then((res) => {
        // console.log("Result Auth: ", res.data.json());
        debugger;
        if (res.status === 200) {
          const data = (res.data[0])[0];
          console.log("restaurar nivel", data.Nivel);
          console.log("restaurar puntaje", data.Puntaje);
          debugger;
          setNoPregunta(data.Nivel);
          setActiveStep(data.Nivel - 1);
          getPreguntas(data.Nivel);

          currentLevel(data.Nivel);
          currentScore(data.Puntaje);
        }
      })
      .catch((ex) => {
        console.error("error", ex);
      });
  }

  /***
   *
   * INICIO STEPPER
   */
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  /**
   * FIN STEPPER
   */

  const handleAnswered = (_isCorrect, _cardSelected) => {
    const isCorrect = _isCorrect === 1 ? true : false;


    const selected = preguntas[_cardSelected];
    setPreguntaSeleccionada(selected);
    //console.log("preguntasss ", preguntass);

    setIsCorrect(isCorrect);
    setCardSelected(_cardSelected);
  };

  const handleChecked = () => {
    if (isCorrect === null) {

    } else {
      if (isCorrect) {
        const values = {
          IdUsuario: 1,
          Pregunta: preguntas[0],
          Respuesta: preguntaSeleccionada.text,
          EsCorrecta: preguntaSeleccionada.is_correct,
          Puntos: 10,
          Tipo: 2
        };

        Api.Post("/partida", values, "")
          .then((res) => {

            if (res.status === 200) {
            }
          })
          .catch((ex) => {
            console.log("error", ex);
          });
      }
      setIsChecked(true);
    }
  }

  const handleContinue = () => {
    const { currentLevel, currentScore } = props;
    handleNext();
    if (noPregunta < 10) {
      setNoPregunta(noPregunta + 1);
    } else {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        footer: "",
        type: "success",
        text: "¡Felicidades!, has terminado la partida, presiona continuar para inicar una nueva partida o finalizar para ir a la pantalla principal.",
        allowOutsideClick: false,
        showDenyButton: true,
        confirmButtonText: "Continuar",
        confirmButtonColor: "#4D8E17",
        denyButtonText: "Finalizar",
        denyButtonColor: "#FCA311",
      }).then((response) => {
        if (response.isConfirmed) {
          //setNoPregunta(1);
          handleReset();
          const userid = CheckSession("userId");
          getRestaurarPartida(userid);
          
        } else if (response.isDenied) {
          history.push("/")
        }
      });

    }

    setIsChecked(false);
    setCardSelected(null);

    currentLevel(1);
    currentScore(10);
  }

  const handleRetry = () => {
    setCardSelected(null);
    setIsCorrect(null);
    setIsChecked(false);
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: "100%", bgcolor: "background.paper",
          mt: 8, pb: 6,
        }}
      >
        <Stepper activeStep={activeStep} >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isChecked && !isCorrect && index === noPregunta - 1) {
              labelProps.optional = (
                <Typography variant="caption" color="error">
                  Respuesta incorrecta
                </Typography>
              );

              labelProps.error = true;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}
                sx={{
                  '& .MuiStepLabel-root .Mui-active': {
                    color: '#FCA311',
                  },
                }}
              >
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <Container maxWidth="md">
                <Typography
                  variant="h4"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  {preguntas[0]}
                </Typography>
                <Grid container spacing={4}>
                  {preguntas.map((res, i) => {
                    if (i > 0) {
                      return (
                        <Grid item md={4} key={i}>
                          <Card
                            sx={{ maxWidth: 345 }}
                            onClick={() => {
                              !isChecked && (handleAnswered(res.is_correct, i));
                            }}
                            key={i}
                            style={cardSelected === i ? { backgroundColor: "#4D8E17", color: "#FFFFFF" } : {}}
                          >
                            <CardActionArea sx={{ height: 200 }}>
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div" align="center">
                                  {res.text}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      );
                    }
                  })}
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                  sx={{
                    pt: 3,
                    pb: 6,
                  }}
                >
                  <Grid item md={12}>
                    {
                      isChecked && isCorrect && (
                        <label style={{ color: "#4D8E17", fontSize: 25 }}>Su respuesta es correcta</label>
                      )
                    }
                    {
                      isChecked && !isCorrect && (
                        <label style={{ color: "#FF0000", fontSize: 25 }}>Su respuesta es incorrecta, Intentalo de nuevo!</label>
                      )
                    }
                  </Grid>
                  <Grid item md={12}>
                    {
                      isChecked ? (
                        isCorrect ? (
                          <Button variant="contained" style={{ backgroundColor: "#4D8E17" }} onClick={handleContinue}>Continuar</Button>
                        ) : (
                          <Button variant="contained" style={{ backgroundColor: "#4D8E17" }} onClick={handleRetry}>Reintentar</Button>
                        )
                      ) : (
                        <Button variant="contained" style={{ backgroundColor: "#4D8E17" }} onClick={handleChecked}>Comprobar</Button>
                      )
                    }
                  </Grid>
                </Grid>
              </Container>
            </Typography>
          </Fragment>
        )}
      </Box>
    </Container >

  );
};

export default withRouter(Partida);
