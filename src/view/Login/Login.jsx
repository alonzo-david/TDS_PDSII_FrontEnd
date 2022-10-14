import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, withRouter } from "react-router-dom";

import { Api } from "./../../services/Api";
import { useHistory } from "react-router-dom";

import "./Login.css";

const Login = (props) => {
  const [, setData] = useState([]);
  const [, setDataUsuario] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {}, []);

  const signIn = () => {
    fetchLogin();
  };

  const handleSubmit = () => {};

  const fetchLogin = () => {
    let JData = {
      Usuario: usuario,
      Password: password,
    };

    Api.Post("/auth/login", JData, "")
      .then((res) => {
        console.log("Result Auth: ", res);
        // if (res.status === 200) {
        //   if (res.data.success === 1) {
        //     console.log("data login: ", JSON.stringify(res.data.data.dataUsuario));
        //     setData(res.data.data);
        //     setDataUsuario(res.data.data.dataUsuario);
        //     localStorage.setItem("token-priv", res.data.data.tokenPriv);
        //     localStorage.setItem("datos-personales", JSON.stringify(res.data.data.dataUsuario));

        //   }
        // }
      })
      .catch((ex) => {
        console.error("error", ex);
      });
  };

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#14213D",
        contrastText: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Bienvenido a TriviaGuatemala
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {" "}
              {/* noValidate> */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Usuario"
                name="userName"
                autoComplete="userName"
                autoFocus
                theme={theme}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                theme={theme}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#4D8E17", color: "#FFFFFF" }}
              >
                Ingresar
              </Button>

              <Grid container>
                <Grid item>
                  <Link to="/Registrar" variant="body2">
                    {"¿No tienes una cuenta? Registrate."}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default withRouter(Login);
