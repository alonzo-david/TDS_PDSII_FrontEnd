import React, { useState } from "react";
import Routes from "./Routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);

  const changeLogin = (value) => {
    setLoggedIn(value);
  }

  const changeCurrentPoints = (value) => {
    setCurrentPoints((prevState) => prevState + value);
  }

  const changeCurrentLevel = (value) => {
    setCurrentLevel((prevState) => prevState + value);
  }

  return (
    <div className="container">
      <Header loggedIn={loggedIn} currentLevel={currentLevel} currentPoints={currentPoints} updateLevel={changeCurrentLevel} />
      <Routes loggedIn={changeLogin} currentLevel={changeCurrentLevel} currentPoints={changeCurrentPoints} />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
