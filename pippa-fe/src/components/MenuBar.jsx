import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import Paper from "@mui/material/Paper";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import auth from "../authentication/AuthenticationService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

 
const pages = ["Info For Patients", "Info For Carers"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
 
const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showLogout, setShowLogout] = useState(false);

 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 
  const handleCarerInfo = () => {
    const url =
      "https://myhealth.alberta.ca/health/AfterCareInformation/pages/conditions.aspx?HwId=abo6512";
    window.open(url, "_blank");
  };
 
  const handlePatientInfo = () => {
    const url =
      "https://myapps-aaa1fa.albertahealthservices.ca/logon/LogonPoint/tmindex-ahs.html";
    window.open(url, "_blank");
  };
  
  useEffect(() => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if(isAuthenticated === 'true'){
    setShowLogout(true);
  }},[]);

 
  return (
    <AppBar position="static" color="transparent">
      {/* <Container maxWidth="xl"> */}
      <Toolbar disableGutters>
        <NavLink to="/" activeClassName={classes.active}>
          <Paper variant="contained">
            <img height="60" width="225" src="./images/pippa-logo.png" />
          </Paper>
        </NavLink>
 
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} justifyContent="flex-end" alignItems="flex-end">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            onClick={handleCarerInfo}
            sx={{ my: 2, color: "black", display: "block" }}
          >
            {pages[0]}
          </Button>
          <Button
            onClick={handlePatientInfo}
            sx={{ my: 2, color: "black", display: "block" }}
          >
            {pages[1]}
          </Button>
          {showLogout && (<Button
            // onClick={handlePatientInfo}
            component={Link} to="/" onClick={auth.logout}
            sx={{ my: 2, color: "black", display: "block" }}
          >
            Logout
          </Button>
          )}
        </Box>
 
        <Box sx={{ flexGrow: 0 }}>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
};
export default ResponsiveAppBar;