import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Welcome from "../Welcome/Welcome";
import DashboardAdmin from "../Admin/Dashboard/DashboardAdmin";
import * as AuthService from "./../../services/AuthService";
import "./Home.css";

const Home = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [kindaUser, setKindaUser] = useState(null);

  useEffect(() => {
    const _isLogin = AuthService.isLoggedIn();
    setIsLogin(_isLogin);
    const _kindaUser = AuthService.kindaUser();
    setKindaUser(_kindaUser);
  }, []);


  return (
    <div className="height-body" style={{ backgroundColor: "#EFEFEF" }}>
      {isLogin ? (
        kindaUser === 1 ? <DashboardAdmin /> : <Dashboard />
      ) : <Welcome />}
    </div>
  );
};

export default withRouter(Home);
