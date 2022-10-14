import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";

import "./Home.css";
import Login from "../Login/Login";
import Partida from "../Partida/Partida";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log("useEffect Home");
    fetchData();
  }, []);

  const fetchData = () => {};

  return (
    <div className="height-body" style={{ backgroundColor: "#EFEFEF" }}>
      {/* <Login></Login> */}
      <Partida></Partida>
    </div>
  );
};

export default withRouter(Home);
