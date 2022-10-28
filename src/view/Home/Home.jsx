import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Welcome from "../Welcome/Welcome";
import { CheckSession } from "../../services/Sessions";

import "./Home.css";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let value = CheckSession("isLogin");
    value = JSON.parse(value);
    setIsLogin(value);
    console.log("value login: ", value);

    console.log("useEffect Home");
    fetchData();
  }, []);

  const fetchData = () => {};

  return (
    <div className="height-body" style={{ backgroundColor: "#EFEFEF" }}>
      {isLogin ? <Dashboard /> : <Welcome />}
    </div>
  );
};

export default withRouter(Home);
