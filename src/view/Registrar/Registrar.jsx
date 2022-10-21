import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Backdrop, CircularProgress, Switch } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Moment from "moment/moment";
import { Api } from "../../services/Api";
import Swal from "sweetalert2";

const theme = createTheme();

const Registrar = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [recibirNotificacion, setRecibirNotificacion] = useState(true);
  const [reproducirMusica, setReproducirMusica] = useState(true);
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const history = useHistory();

  const handleChangeNotificacion = () => {
    setRecibirNotificacion(!recibirNotificacion);
  };

  const handleChangeMusica = () => {
    setReproducirMusica(!reproducirMusica);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    signUp(data);
  };

  const toLogin = () => {
    history.push("/Login");
  }

  const signUp = (data) => {

    const value = data.get('FechaNacimiento');
    const [day, month, year] = value.split('-');
    const date = new Date(
      +year,
      +month - 1,
      +day
    );
    const dateFormatted = Moment(date).format("YYYY-MM-DD");

    const body = {
      Nombres: data.get('Nombres'),
      Apellidos: data.get('Apellidos'),
      FechaNacimiento: dateFormatted, //moment(Date()).format("YYYY-MM-DD"),
      CorreoElectronico: data.get('CorreoElectronico'),
      Usuario: data.get('Usuario'),
      Password: data.get('Password'),
      RecibirNotificacion: (data.get('RecibirNotificacion') === "on" ? 1 : 0),
      ReproducirMusica: (data.get('ReproducirMusica') === "on" ? 1 : 0)
    }

    console.log("Data Body: ", body);

    Api.Post("/auth/register", body, "")
      .then((res) => {
        console.log("Res: ", res);
        setLoading(false);
        const data = res.data;

        if (res.status === 201) {
          setErrorMessage('');
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            footer: "",
            type: "success",
            text: "Usuario creado correctamente, por favor inicia sesión.",
            allowOutsideClick: false,
            confirmButtonColor: "#4D8E17"
          }).then((response) => {
            if (response.isConfirmed) {
              toLogin();
            }
          });

        } else if (res.status === 200) {
          if (data.code === 0) {
            if (data.message === "USER_ALREADY_EXISTS") {
              Swal.fire({
                icon: "error",
                title: "Error!",
                footer: "",
                type: "error",
                text: "Ya existe una cuenta con el usuario ingresado",
                allowOutsideClick: false,
                confirmButtonColor: "#DC3545"
              }).then((response) => {
                if (response.isConfirmed) {
                  setErrorMessage("Ya existe una cuenta con el usuario ingresado.");
                }
              });

            }
          }
        }


      })
      .catch((error) => {
        setLoading(false);
        console.error("error", error);
      })
  }

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 8, pb: 6,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              // noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="Nombres"
                    required
                    fullWidth
                    id="Nombres"
                    label="Nombres"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="Apellidos"
                    label="Apellidos"
                    name="Apellidos"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha de Nacimiento"
                      value={fechaNacimiento}
                      minDate={dayjs('01-01-1980')}
                      maxDate={dayjs(new Date())}
                      inputFormat="DD-MM-YYYY"
                      mask="__-__-____"
                      onChange={(newValue) => {
                        setFechaNacimiento(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} helperText="dd-mm-yyyy" fullWidth id="FechaNacimiento" name="FechaNacimiento" />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="CorreoElectronico"
                    label="Correo Electronico"
                    name="CorreoElectronico"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Usuario"
                    label="Usuario"
                    name="Usuario"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Password"
                    label="Password"
                    type="password"
                    id="Password"
                    autoComplete="new-password"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        id="RecibirNotificacion"
                        name="RecibirNotificacion"
                        checked={recibirNotificacion}
                        onChange={handleChangeNotificacion}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Recibir Notificaciones"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        id="ReproducirMusica"
                        name="ReproducirMusica"
                        checked={reproducirMusica}
                        onChange={handleChangeMusica}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Reproducir Musica"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrar
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item md={12}>
                  <Link to="/Login" variant="body2">
                    ¿Ya tienes una cuenta? Accede a ella.
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
        </Container>
      </ThemeProvider>
    </>
  );
};

export default withRouter(Registrar);
