import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
    <div className="App height-body">
      <Box xs={{ flexGrow: 1 }}>
        <Grid item xs={12} sm={12} lg={12}>
          <form onSubmit={signIn} className="form">
            <Card>
              <CardHeader
                title="Login"
                subheader="to continue to Trivia Guatemala"
              />
              <CardContent>
                <ThemeProvider theme={theme}>
                  <TextField
                    id="Usuario"
                    label="Usuario"
                    type="text"
                    onChange={(event) => {
                      const { value } = event.target;
                      setUsuario(value);
                    }}
                    autoFocus
                    required
                    margin="normal"
                    color="neutral"
                  />
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <TextField
                    id="outlined-password-input"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(event) => {
                      const { value } = event.target;
                      setPassword(value);
                    }}
                    margin="normal"
                    color="neutral"
                  />
                </ThemeProvider>
              </CardContent>
              <CardActions style={{ justifyContent: "space-between" }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#4D8E17", color: "#FFFFFF" }}
                >
                  Iniciar Sesión
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Box>
    </div>
  );
};

export default withRouter(Login);
