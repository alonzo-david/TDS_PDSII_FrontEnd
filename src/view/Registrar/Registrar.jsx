import React, { useState } from "react";
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
  RadioGroup,
  Radio,
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
import { images } from "../../services/Avatars";

const theme = createTheme();



const Registrar = () => {
  const [formulario, setFormulario] = useState({
    Nombres: "",
    Apellidos: "",
    FechaNacimiento: "",
    CorreoElectronico: "",
    Usuario: "",
    Password: "",
    Avatar: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [avSelected, setAvSelected] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    signUp(data);
  };

  const toLogin = () => {
    history.push("/Login");
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
      IdAvatar: data.get("Avatar")    
    };

    if(data.get("Avatar") == null){
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error!",
        footer: "",
        type: "error",
        text: "¡No has seleccionado un avatar!",
        allowOutsideClick: false,
        confirmButtonColor: "#DC3545",
      }).then((response) => {
        if (response.isConfirmed) {
          setErrorMessage(
            "¡No has seleccionado un avatar!"
          );
        }
      });
    }else{

    Api.Post("/auth/register", body, "")
      .then((res) => {
        setLoading(false);
        const data = res.data;

        if (res.status === 201) {
          setErrorMessage("");
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            footer: "",
            type: "success",
            text: "Usuario creado correctamente, por favor inicia sesión.",
            allowOutsideClick: false,
            confirmButtonColor: "#4D8E17",
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
                confirmButtonColor: "#DC3545",
              }).then((response) => {
                if (response.isConfirmed) {
                  setErrorMessage(
                    "Ya existe una cuenta con el usuario ingresado."
                  );
                }
              });
            }
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("error", error);
      });
    }
  };

  const handleChangeAvatar = (ev) => {
    setAvSelected(ev.target.value);
  };

  const handleChange = (event) => {
    setFormulario({...formulario, [event.target.name]: event.target.value});
  };

  const avatar = (name) => {

    let avatar = "";

    switch (name) {
      case "woman01":
        if( "1" === avSelected) avatar = images.women.woman01.feliz.path;
        else avatar = images.women.woman01.normal.path;
        break;
      case "woman02":
        if( "3" === avSelected) avatar = images.women.woman02.feliz.path;
        else avatar = images.women.woman02.normal.path;
        break;
      case "woman03":
        if( "5" === avSelected) avatar = images.women.woman03.feliz.path;
        else avatar = images.women.woman03.normal.path;
        break;
      case "man01":
        if( "7" === avSelected) avatar = images.men.man01.feliz.path;
        else avatar = images.men.man01.normal.path;
        break;
      case "man02":
        if( "9" === avSelected) avatar = images.men.man02.feliz.path;
        else avatar = images.men.man02.normal.path;
        break;
      case "man03":
        if( "11" === avSelected) avatar = images.men.man03.feliz.path;
        else avatar = images.men.man03.normal.path;
        break;      
      default:
        break;
    }

    return(
      <img src={avatar} alt={avatar} width="127px" height="auto" />
    );
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
              Registrarme
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
                    name="Nombres"
                    required
                    fullWidth
                    id="Nombres"
                    label="Nombres"
                    autoFocus
                    value={formulario.Nombres}
                    onChange={(e) => {
                      const re = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
                      if (e.target.value === '' || re.test(e.target.value)) {
                        handleChange(e);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="Apellidos"
                    label="Apellidos"
                    name="Apellidos"
                    value={formulario.Apellidos}
                    onChange={(e) => {
                      const re = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
                      if (e.target.value === '' || re.test(e.target.value)) {
                        handleChange(e);
                      }
                    }}                    
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Fecha de Nacimiento"
                      value={fechaNacimiento}
                      minDate={dayjs("01-01-1922")}
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
                    type="email"
                    value={formulario.CorreoElectronico}
                    onChange={(e) => {
                      handleChange(e);
                    }}                    
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Usuario"
                    label="Usuario"
                    name="Usuario"
                    value={formulario.Usuario}
                    onChange={handleChange}
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
                    value={formulario.Password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography fullWidth variant="h6" component="div" align="left" gutterBottom >Selecciona tu avatar:</Typography>
                  <Typography fullWidth variant="body2" component="div" align="left" gutterBottom >Al seleccionarlo el avatar cambiará de estado.</Typography>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="Avatar"
                    id="Avatar"     
                    onChange={handleChangeAvatar}     
                    value={avSelected}          
                  >
                    <FormControlLabel value="7" control={<Radio  style={{display: "none"}} />} label={avatar("man01")} />
                    <FormControlLabel value="9" control={<Radio  style={{display: "none"}} />} label={avatar("man02")} />
                    <FormControlLabel value="11" control={<Radio  style={{display: "none"}} />} label={avatar("man03")} />
                    <FormControlLabel value="1" control={<Radio  style={{display: "none"}} />} label={avatar("woman01")} />
                    <FormControlLabel value="3" control={<Radio  style={{display: "none"}} />} label={avatar("woman02")} />
                    <FormControlLabel value="5" control={<Radio  style={{display: "none"}} />} label={avatar("woman03")} />
                  </RadioGroup>
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        // onChange={this.handleChange("")}
                        value={false}
                        key={2}
                        style={{display: "none"}}
                      />
                    }
                    label={
                      <>
                        <img
                          src={"./img/dashboard.png"}
                          key={1}
                          className="profile-img"
                          width="200px"
                          height="auto"
                          style={{ marginRight: "5px" }}
                        />
                        My text
                      </>
                    }
                  /> */}
                </Grid>

                {/* <Grid item xs={12} sm={6}>
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
                </Grid> */}
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
                    <Typography
                      variant="caption"
                      align="center"
                      color="error.main"
                      paragraph
                    >
                      {errorMessage}
                    </Typography>
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
