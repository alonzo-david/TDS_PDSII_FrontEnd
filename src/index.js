import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./App";
// import reportWebVitals from './reportWebVitals';

const App = () => (
  <Router>
    <Main />
  </Router>
)

render(<App />, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
