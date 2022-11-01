import React, { useState, useEffect } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Api } from "./../../services/Api";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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

import "./Login.css";
import Swal from "sweetalert2";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    if(errorMessage !== ""){
      console.log(errorMessage);
      Swal.fire({
        icon: "error",
        title: "Error!",
        footer: "",
        type: "error",
        text: `${errorMessage}`,
        allowOutsideClick: false,
        confirmButtonColor: "#DC3545",
      }).then((response) => {
        if (response.isConfirmed) {
          setErrorMessage(
            ""
          );
        }
      });
    }
   }, [errorMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //handleToggle();
    setLoading(true);

    const data = new FormData(event.currentTarget);
    signIn(data);
  };

  const signIn = (data) => {
    const { loggedIn } = props;


    let body = {
      Usuario: data.get('userName'),
      Password: data.get('password'),
    };

    Api.Post("/auth/login", body, "")
      .then((res) => {
        if (res.status === 200) {
          const data = res.data; //(res.data[0])[0];

          if (data.code === 0) {
            if (data.message === "PASSWORD_INCORRECT") {
              setErrorMessage("Contraseña incorrecta.");
            }else if(data.message === "NOT_FOUND_USER"){
              setErrorMessage("Usuario y/o contraseña incorrectos.");
            }
          } else {
            localStorage.setItem("isLogin", true);
            localStorage.setItem("userName", data.NombreCompleto);
            localStorage.setItem("userId", data.Id);
            localStorage.setItem("avatar", data.Avatar);
            localStorage.setItem("kindaUser", data.IdTipoUsuario);
            localStorage.setItem("usarCache", data.UsarCache);
            localStorage.setItem("apiPreguntas", data.Link);
            setErrorMessage("");
            loggedIn(true);
            HomePage();
          }
          setLoading(false);

        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("error", error);
      });

  };

  const HomePage = () => {
    history.push("/");
    window.location.reload();
    //history.push("/");
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
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(http://18.117.103.213:3002/img/login.png)",//"url(https://source.unsplash.com/random)",
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
                ¡Bienvenido!
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
                  <Grid item md={12}>
                    <Link to="/Registrar" variant="body2">
                      {"¿No tienes una cuenta? Registrate."}
                    </Link>
                  </Grid>
                  {errorMessage !== "" && (
                    <Grid item md={12}>
                      <Typography variant="caption" align="center" color="error.main" paragraph>{errorMessage}</Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </ThemeProvider>
    </>
  );
};

export default withRouter(Login);
