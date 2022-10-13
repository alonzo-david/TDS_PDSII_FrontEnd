import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  

  const history = useHistory();

  const handleLogin = () => {
    let path = `/Login`;
    history.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token-priv");
    let path = `/`;
    history.push(path);
  };

  

  return (
    <Box sx={{ flexGrow: 1 }}>
      
    </Box>
  );
};

export default Header;
