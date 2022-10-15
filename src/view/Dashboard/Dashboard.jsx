import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CameraswitchOutlined } from "@mui/icons-material";


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const Dashboard = () => {
  const history = useHistory();

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
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Trivia Guatemala
            </Typography>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 345, height: 225 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="green iguana"
                    />   
                    <CardContent></CardContent>                 
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 345, height: 225 }}
                  onClick={partidaPage}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
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

export default Dashboard;
