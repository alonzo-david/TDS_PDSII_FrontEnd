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
import { CssBaseline, Drawer, ListItem, ListItemText } from "@mui/material";
import LinkButton from "../LinkButton/LinkButton";
import { useHistory } from "react-router-dom";

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

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#000000",
      },
    },
  });

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
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                onClick={InitPage}
              >
                Trivia Guatemala
              </Typography>
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
