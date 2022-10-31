import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Api } from "../../../services/Api";

const ConfigApi = () => {
  const [form, setForm] = useState({
    Id: "",
    Link: "",
    Grupo: 0,
  });

  useEffect(() => {
    getLinkApi();
  }, []);

  const getLinkApi = () => {
    Api.Get("/configapi/", "")
      .then((res) => {
        const data = res.data[0][0];
        if (res.status === 200) {
          setForm(data);
        }
      })
      .catch((ex) => {
        console.error("error", ex);
      });
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {};

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        component="form"
        // noValidate
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          pb: 6,
          width: 1,
        }}
      >
        <Typography component="h1" variant="h5">
          Configuración de Api
        </Typography>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <TextField
              required
              fullWidth
              id="Link"
              label="Link"
              name="Link"
              autoFocus
              value={form.Link}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              required
              fullWidth
              id="Grupo"
              label="Grupo"
              name="Grupo"
              type="number"
              value={form.Grupo}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Grid>
          <Grid item sm={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ConfigApi;
