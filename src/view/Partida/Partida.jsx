import React, {
  useEffect,
  Fragment,
  useCallback,
  useState,
  useLayoutEffect,
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
import Pregunta from "../../components/Pregunta/Pregunta";

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

const Partida = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isCorrect, setIsCorrect] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [noPregunta, setNoPregunta] = useState(1);
  const [cardSelected, setCardSelected] = useState(null);
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    console.log("useEffect Partida");
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

  /***
   *
   * INICIO STEPPER
   */

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const isStepFailed = (step) => {
    return step === 1;
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  /**
   * FIN STEPPER
   */

  const handleAnswered = (_isCorrect, _cardSelected) => {
    const isCorrect = _isCorrect === 1 ? true : false;

    setIsCorrect(isCorrect);
    setCardSelected(_cardSelected);
  };

  const handleChecked = () => {
    if (isCorrect === null) {

    } else {
      setIsChecked(true);
    }
  }

  const handleContinue = () => {
    handleNext();
    if (noPregunta < 10) {
      setNoPregunta(noPregunta + 1);
    } else {
      setNoPregunta(1);
      handleReset();
    }

    setIsChecked(false);
    setCardSelected(null);
  }

  const handleRetry = () => {
    setCardSelected(null);
    setIsCorrect(null);
    setIsChecked(false);
  }
  // return (
  //   <Container maxWidth="md">
  //     <Typography
  //       component="h1"
  //       variant="h2"
  //       align="center"
  //       color="text.primary"
  //       gutterBottom
  //     >
  //       Trivia Guatemala
  //     </Typography>
  //     <Typography variant="h5" align="center" color="text.secondary" paragraph>
  //       {preguntas[0]}
  //     </Typography>
  //     <Grid container spacing={4}>
  //       {preguntas.map((res, i) => {
  //         if (i > 0) {
  //           return (
  //             <Grid item md={4} key={i}>
  //               <Card
  //                 sx={{ maxWidth: 345 }}
  //                 onClick={() => {
  //                   handleAnswered(res.is_correct);
  //                 }}
  //               >
  //                 <CardActionArea sx={{ height: 200 }}>
  //                   <CardContent>
  //                     <Typography gutterBottom variant="h5" component="div">
  //                       {res.text}
  //                     </Typography>
  //                   </CardContent>
  //                 </CardActionArea>
  //               </Card>
  //             </Grid>
  //           );
  //         }
  //       })}
  //     </Grid>
  //   </Container>
  // );

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: "100%",

          bgcolor: "background.paper",
          mt: 8,
          pb: 6,
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isChecked && !isCorrect && index == noPregunta - 1) {
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
              <Step key={label} {...stepProps}>
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
              Step {activeStep + 1}
              <Container maxWidth="md">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Trivia Guatemala
                </Typography>
                <Typography
                  variant="h5"
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
                            style={cardSelected == i ? { backgroundColor: "#4D8E17", color: "#FFFFFF" } : {}}
                          >
                            <CardActionArea sx={{ height: 200 }}>
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
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
                        <label style={{ color: "#FF0000", fontSize: 25 }}>Su respuesta es incorrecta</label>
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
    </Container>
  );
};

export default Partida;
