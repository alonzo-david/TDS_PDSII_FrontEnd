import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { preguntas } from "../../services/preguntas";
import { ApiPregunta } from "../../services/Api";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme({
  customColor: {
    answer: "#4D8E17",
  },
});

const Pregunta = ({noPregunta, parentCallback}) => {
  const [preguntas, setPreguntas] = useState([]);
  const [numeroPregunta, setNumeroPregunta] = useState(noPregunta);

  useEffect(() => {
    console.log("C Pregunta: ", noPregunta);

    getPreguntas(noPregunta);
  }, []);

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

  const handleClickAswer = (e, _isCorrect) => {
    e.stopPropagation();
    console.log("CORRECT ANSWER: ", _isCorrect);
    parentCallback(false, _isCorrect);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
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
                    <Grid item md={4} key={i} >
                      <Card sx={{ maxWidth: 345 }} onClick={(e) => {handleClickAswer(e, res.is_correct)}}>
                        <CardActionArea sx={{ height: 200 }}>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
};
export default Pregunta;
