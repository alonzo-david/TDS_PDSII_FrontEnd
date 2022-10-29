import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as AuthService from "../../../services/AuthService";

const theme = createTheme();

const DashboardAdmin = (props) => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const _avatar = AuthService.avatar();
    setAvatar(_avatar);
  }, []);

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
            <Grid container spacing={30} alignItems="center" justifyContent="center" direction="column">
              <Grid item xs={12} sm={12}>
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
            </Grid>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default withRouter(DashboardAdmin);
