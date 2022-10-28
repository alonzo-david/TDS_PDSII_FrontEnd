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
  Radio,
  RadioGroup,
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
import * as AuthService from "../../services/AuthService";

const theme = createTheme();

const Perfil = () => {
  const [form, setForm] = useState({
    Id: "",
    Nombres: "",
    Apellidos: "",
    FechaNacimiento: "",
    CorreoElectronico: "",
    IdAvatar: "",
    Avatar: ""
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const userId = AuthService.userId();
    getProfile(userId);
  }, []);

  // useEffect(() => {
  //   console.log("Form State: ", form);
  // },[form])

  const getProfile = (userId) => {
    Api.Get("/persona/" + userId, "")
      .then((res) => {
        const data = (res.data[0])[0];
        if (res.status === 200) {
            setForm(data);
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
      IdAvatar: data.get("Avatar"),
    };

    Api.Put("/Usuario/" + form.Id, body, "")
      .then((res) => {
        setLoading(false);        
        
        if (res.status === 200) {
          const data = (res.data[0])[0];

          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            footer: "",
            text: "Perfil actualizado correctamente.",
            allowOutsideClick: false,
            confirmButtonColor: "#4D8E17",
          }).then((response) => {
            if (response.isConfirmed) {
              localStorage.setItem("avatar", data.Avatar);

              const userId = AuthService.userId();
              getProfile(userId);
            }
          });          
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("error", error);
      });
  };

  const handleChangeAvatar = (event) => {
    setForm({...form, "IdAvatar": event.target.value});
  };

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value});
  };

  const avatar = (name) => {

    let avatar = "";
    const avSelected = form.IdAvatar;

    switch (name) {
      case "woman01":
        if( "1" == avSelected) avatar = images.women.woman01.feliz.path;
        else avatar = images.women.woman01.normal.path;
        break;
      case "woman02":
        if( "3" == avSelected) avatar = images.women.woman02.feliz.path;
        else avatar = images.women.woman02.normal.path;
        break;
      case "woman03":
        if( "5" == avSelected) avatar = images.women.woman03.feliz.path;
        else avatar = images.women.woman03.normal.path;
        break;
      case "man01":
        if( "7" == avSelected) avatar = images.men.man01.feliz.path;
        else avatar = images.men.man01.normal.path;
        break;
      case "man02":
        if( "9" == avSelected) avatar = images.men.man02.feliz.path;
        else avatar = images.men.man02.normal.path;
        break;
      case "man03":
        if( "11" == avSelected) avatar = images.men.man03.feliz.path;
        else avatar = images.men.man03.normal.path;
        break;      
      default:
        break;
    }

    return(
      <img src={avatar} width="127px" height="auto" />
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
            <Typography component="h1" variant="h5">
              Mi Perfil
            </Typography>
            <img
              src={form.Avatar}
              alt={form.IdAvatar}
              loading="lazy"
              height={175}
            />            
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
                    value={form.Nombres}
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
                    value={form.Apellidos}
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
                      value={form.FechaNacimiento}
                      minDate={dayjs("01-01-1980")}
                      maxDate={dayjs(new Date())}
                      inputFormat="DD-MM-YYYY"
                      mask="__-__-____"
                      onChange={(newValue) => {


                        //setFechaNacimiento(newValue);
                        setForm({...form, "FechaNacimiento": newValue});
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
                    type="email"
                    value={form.CorreoElectronico}
                    onChange={(e) => {
                      handleChange(e);
                    }}      
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
                    value={form.IdAvatar}          
                  >
                    <FormControlLabel value="7" control={<Radio  style={{display: "none"}} />} label={avatar("man01")} />
                    <FormControlLabel value="9" control={<Radio  style={{display: "none"}} />} label={avatar("man02")} />
                    <FormControlLabel value="11" control={<Radio  style={{display: "none"}} />} label={avatar("man03")} />
                    <FormControlLabel value="1" control={<Radio  style={{display: "none"}} />} label={avatar("woman01")} />
                    <FormControlLabel value="3" control={<Radio  style={{display: "none"}} />} label={avatar("woman02")} />
                    <FormControlLabel value="5" control={<Radio  style={{display: "none"}} />} label={avatar("woman03")} />
                  </RadioGroup>                 
                </Grid>
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
