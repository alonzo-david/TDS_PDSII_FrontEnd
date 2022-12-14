import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Backdrop, CircularProgress, CssBaseline, Drawer, ListItem, ListItemText } from "@mui/material";
import { useHistory } from "react-router-dom";
import CastleIcon from '@mui/icons-material/Castle';
import StarIcon from '@mui/icons-material/Star';
import * as AuthService from "../../services/AuthService";

const Header = (props) => {
  const [isLogin, setIsLogin] = useState(props.loggedIn);
  const [, setMenuLogin] = useState(null);
  const [openMenuBar, setOpenMenuBar] = useState(false);

  const [userName, setUserName] = useState("");
  const [, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [kindaUser, setKindaUser] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const _isLogin = AuthService.isLoggedIn();
    setIsLogin(_isLogin);
    const _userName = AuthService.userName();
    setUserName(_userName);
    const _userId = AuthService.userId();
    setUserId(_userId);
    const _kindaUser = AuthService.kindaUser();
    setKindaUser(_kindaUser);

  }, [])

  const handleOpenMenuBar = (event) => {
    setOpenMenuBar(!openMenuBar);
  };

  // const handleChange = (event) => {
  //   setIsLogin(event.target.checked);
  // };

  // const handleMenu = (event) => {
  //   setMenuLogin(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setMenuLogin(null);
  // };

  const InitPage = () => {
    history.push("/");
  };

  const handleLogin = () => {
    setOpenMenuBar(false);
    history.push("/Login");
  };

  const handleRegister = () => {
    setOpenMenuBar(false);
    history.push("/Registrar");
  }

  const handleLogOut = () => {

    setIsLogin(false);
    setUserName("");
    // setProgressLevel(0);
    // setProgressPoints(0);
    setOpenMenuBar(false);

    AuthService.logOut();

    setLoading(true);
    history.push("/");
    window.location.reload();
  }

  const handleProfile = () => {
    
    setLoading(true);
    
    const interval = setInterval(() => {
      setOpenMenuBar(false);
      setLoading(false);
      clearInterval(interval);
      if(kindaUser === 1)
        history.push("/PerfilAdmin");
      else
        history.push("/Perfil");  
    }, 300);

    
  }

  const handleHome = () => {
    setOpenMenuBar(false);
    history.push("/");
  }

  const handleConfigApi = () => {
    setOpenMenuBar(true);
    setOpenMenuBar(false);
    history.push("/ConfigApi");
  }

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
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {openMenuBar && (
        <Drawer
          open={openMenuBar}
          onClose={() => {
            setOpenMenuBar(!openMenuBar);
          }}
        >
          <ListItem button onClick={handleHome}>
            <ListItemText primary={"Inicio"} />
          </ListItem>
          {isLogin ? (
            <>            
              <ListItem button onClick={handleProfile}>
                <ListItemText primary={"Mi Perfil"} />
              </ListItem>

              {
                kindaUser === 1 && (
                  <>                  
                    <ListItem button onClick={handleConfigApi}>
                      <ListItemText primary={"Configuraci??n"} />
                    </ListItem>
                  </>
                )
              }
              <ListItem button onClick={handleLogOut}>
                <ListItemText primary={"Salir"} />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={handleLogin}>
                <ListItemText primary={"Iniciar Sesi??n"} />
              </ListItem>
              <ListItem button onClick={handleRegister}>
                <ListItemText primary={"Registrarme"} />
              </ListItem>
            </>
          )}

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
                {userName}
              </Typography>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={InitPage}>
                  Trivia Guatemala
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                {isLogin && kindaUser === 2 && (
                  <>
                    <IconButton size="small" aria-label="show 4 new mails" color="inherit">
                      <StarIcon style={headerButtons} />
                      Puntos {props.currentScore}
                    </IconButton>

                    <IconButton size="small" edge="end" color="inherit" >
                      <CastleIcon style={headerButtons} />
                      Nivel {props.currentLevel}/10
                    </IconButton>
                  </>
                )}
              </Box>


              {/* {!isLogin && (
                <LinkButton to="/Login">Iniciar Sesi??n</LinkButton>
              )} */}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
      <CssBaseline />
    </>
  );
};

export default Header;
