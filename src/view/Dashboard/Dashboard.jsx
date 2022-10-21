import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CheckSession } from "../../services/Sessions";
import { Api } from "../../services/Api";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const Dashboard = (props) => {
  const [seconds, setSeconds] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    // const userid = CheckSession("userId");
    // getRestaurarPartida(userid);
    return () => clearInterval(interval);
  }, []);

  const getRestaurarPartida = (idUser) => {
    const { currentLevel, currentPoints } = props;

    Api.Get("/partida/restaurar-partida/" + idUser)
      .then((res) => {
        // console.log("Result Auth: ", res.data.json());
        debugger;
        if (res.status === 200) {
          const data = (res.data[0])[0];
          console.log("restaurar ", data.Nivel);

          currentLevel(data.Nivel);
          currentPoints(data.Puntaje);
        }
      })
      .catch((ex) => {
        console.error("error", ex);
      });
  }

  const partidaPage = () => {
    history.push("/Partida");
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
          <Container maxWidth="sm">
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 345, height: 225 }}>
                  {seconds % 3 == 0 ? (
                    <CardMedia
                      component="img"
                      height="225"
                      image="./img/man02_normal.png"
                      alt="avatar"
                      sx={{ padding: "5px 5px 0 5px", objectFit: "contain" }}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="225"
                      image="./img/man02_triste.png"
                      alt="avatar"
                      sx={{ padding: "5px 5px 0 5px", objectFit: "contain" }}
                    />
                  )}
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 450 }}
                  onClick={partidaPage}
                >
                  <CardActionArea sx={{ height: 225 }}>
                    <CardMedia
                      component="img"
                      height="175"
                      image="./img/boton-play.png"
                      alt="boton play"
                      sx={{ padding: "5px 5px 0 5px", objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" align="center">
                        Iniciar Juego
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
            {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(Dashboard);
