import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Badge, CssBaseline, Drawer, ListItem, ListItemText } from "@mui/material";
import LinkButton from "../LinkButton/LinkButton";
import { useHistory } from "react-router-dom";
import CastleIcon from '@mui/icons-material/Castle';
import StarIcon from '@mui/icons-material/Star';

const Header = () => {
  const [auth, setAuth] = useState(false);
  const [menuLogin, setMenuLogin] = useState(null);
  const [openMenuBar, setOpenMenuBar] = useState(false);
  const history = useHistory();

  const handleOpenMenuBar = (event) => {
    console.log("CLICK OPEN MENU BAR");
    setOpenMenuBar(!openMenuBar);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setMenuLogin(event.currentTarget);
  };

  const handleClose = () => {
    setMenuLogin(null);
  };

  const InitPage = () => {
    history.push("/");
  };

  const ProfilePage = () => {
    //history.push("/Perfil");
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#000000",
      },
    },
  });

  const headerButtons = {
    color: "#FCA311",
  };

  return (
    <>
      {openMenuBar && (
        <Drawer
          open={openMenuBar}
          onClose={() => {
            setOpenMenuBar(!openMenuBar);
          }}
        >
          <ListItem button>
            <ListItemText primary={"Inicio"} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={"Búsqueda de amigos"} />
          </ListItem>
        </Drawer>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" enableColorOnDark>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleOpenMenuBar}
              >
                <MenuIcon style={headerButtons} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={ProfilePage}>
                Grupo 6
              </Typography>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={InitPage}>
                  Trivia Guatemala
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton size="small" aria-label="show 4 new mails" color="inherit">
                  <StarIcon style={headerButtons} />
                  Puntos 85
                </IconButton>

                <IconButton size="small" edge="end" color="inherit" >
                  <CastleIcon style={headerButtons} />
                  Nivel 5/10
                </IconButton>
              </Box>


              {auth ? (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={menuLogin}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(menuLogin)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                </div>
              ) : (
                <LinkButton to="/Login">Iniciar Sesión</LinkButton>
              )}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
      <CssBaseline />
    </>
  );
};

export default Header;
