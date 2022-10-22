import React, { useEffect, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Grid,
  Box,
  Typography,
  Container,
  Backdrop,
  CircularProgress,
  Switch,
} from "@mui/material";
import Moment from "moment/moment";
import Swal from "sweetalert2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Api } from "../../services/Api";
import * as AuthService from "../../services/AuthService";

const theme = createTheme();

const Perfil = () => {
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    const [correoElectronico, setCorreoElectronico] = useState("");

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const userId = AuthService.userId();
    getProfile(userId);
  }, []);

  const getProfile = (userId) => {
    Api.Get("/persona/" + userId, "")
      .then((res) => {
        const data = (res.data[0])[0];
        if (res.status === 200) {
            setNombres(data.Nombres);
            setApellidos(data.Apellidos);
            setFechaNacimiento(data.FechaNacimiento);
            setCorreoElectronico(data.CorreoElectronico);
        }
      })
      .catch((ex) => {
        console.error("error", ex);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    signUp(data);
  };

  const signUp = (data) => {
    const value = data.get("FechaNacimiento");
    const [day, month, year] = value.split("-");
    const date = new Date(+year, +month - 1, +day);
    const dateFormatted = Moment(date).format("YYYY-MM-DD");

    const body = {
      Nombres: data.get("Nombres"),
      Apellidos: data.get("Apellidos"),
      FechaNacimiento: dateFormatted, //moment(Date()).format("YYYY-MM-DD"),
      CorreoElectronico: data.get("CorreoElectronico"),
      Usuario: data.get("Usuario"),
      Password: data.get("Password"),
      RecibirNotificacion: data.get("RecibirNotificacion") === "on" ? 1 : 0,
      ReproducirMusica: data.get("ReproducirMusica") === "on" ? 1 : 0,
    };

    console.log("Data Body: ", body);

    Api.Post("/auth/register", body, "")
      .then((res) => {
        console.log("Res: ", res);
        setLoading(false);
        const data = res.data;

        if (res.status === 200) {
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("error", error);
      });
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
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
              mt: 8,
              pb: 6,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Perfil
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
                    value={nombres}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="Apellidos"
                    label="Apellidos"
                    name="Apellidos"
                    value={apellidos}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha de Nacimiento"
                      value={fechaNacimiento}
                      minDate={dayjs("01-01-1980")}
                      maxDate={dayjs(new Date())}
                      inputFormat="DD-MM-YYYY"
                      mask="__-__-____"
                      onChange={(newValue) => {
                        setFechaNacimiento(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          helperText="dd-mm-yyyy"
                          fullWidth
                          id="FechaNacimiento"
                          name="FechaNacimiento"
                        />
                      )}
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
                    value={correoElectronico}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Usuario"
                    label="Usuario"
                    name="Usuario"
                    autoComplete="usuario"
                    value={usuario}
                  />
                </Grid> */}
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Password"
                    label="Password"
                    type="password"
                    id="Password"
                    autoComplete="password"
                    value={}
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default withRouter(Perfil);
