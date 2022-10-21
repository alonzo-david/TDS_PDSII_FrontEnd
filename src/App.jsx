import React, { useState } from "react";
import Routes from "./Routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const changeLogin = (value) => {
    setLoggedIn(value);
  }

  const changeCurrentScore = (value) => {
    setCurrentScore((prevState) => prevState + value);
  }

  const changeCurrentLevel = (value) => {
    setCurrentLevel((prevState) => prevState + value);
  }

  const restartLevelsScore = () => {
    setCurrentScore(0);
    setCurrentLevel(0);
  }

  return (
    <div className="container">
      <Header loggedIn={loggedIn} currentLevel={currentLevel} currentScore={currentScore} updateLevel={changeCurrentLevel} />
      <Routes loggedIn={changeLogin} currentLevel={changeCurrentLevel} currentScore={changeCurrentScore} restartScore={restartLevelsScore} />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
