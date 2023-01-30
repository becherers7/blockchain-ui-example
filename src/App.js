import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LoginIcon from "@mui/icons-material/Login";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssetTable from "./components/AssetTable";
import MintNft from "./components/createNft/MintNft";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  customHeight: {
    minHeight: 200
  }
}));

export default function App() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logout();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logout = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };
  const hasUser = () => {
    if (currentUser) return true;
    return false;
  };
  return (
    <React.Fragment>
      <AppBar color={"primary"}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Blockchain Portfolio Project
          </Typography>

          {currentUser ? (
            <>
              <IconButton color="inherit">
                <Link
                  to={"/dashboard"}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <DashboardIcon />
                </Link>
              </IconButton>
              <IconButton color="inherit">
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/profile"
                >
                  <AccountCircleIcon />
                </Link>
              </IconButton>
              <IconButton onClick={logout} color="inherit">
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/login"
                >
                  <ExitToAppIcon />
                </Link>
              </IconButton>
            </>
          ) : (
            <IconButton color="inherit">
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                to="/login"
              >
                <LoginIcon />
              </Link>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Routes>
        {/* TO DO: MAKE DASHBOARD DEFAULT REROUTE FOR / HOME URL */}
        <Route path={"/"} element={<Navigate to={"/login"} replace={true} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path={"/dashboard"} element={<AssetTable />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-nft" element={<MintNft />} />
      </Routes>
    </React.Fragment>
  );
}
