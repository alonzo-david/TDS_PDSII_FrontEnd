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
import * as AuthService from "../../services/AuthService";

const theme = createTheme();

const Dashboard = (props) => {
  const [avatar, setAvatar] = useState("");
  const history = useHistory();

  useEffect(() => {
    const _avatar = AuthService.avatar();
    setAvatar(_avatar);
  }, []);

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
            pt: 20,
            pb: 25,
          }}
        >
          <Container maxWidth="md">
            <Grid container spacing={30}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 300, height: 225 }}>
                  <CardMedia
                    component="img"
                    height="225"
                    image={avatar}
                    alt="avatar"
                    sx={{ padding: "5px 5px 0 5px", objectFit: "contain" }}
                  />                  
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 300 }}
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
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(Dashboard);
