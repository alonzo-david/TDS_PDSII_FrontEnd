import React, { Component } from "react";
import * as AuthService from "./../../services/AuthService";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ routes, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = AuthService.isLoggedIn();

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          //   <Component {...props} />
          <routes.component {...props} loggedIn={rest.loggedIn} 
            currentLevel={rest.currentLevel} 
            currentScore={rest.currentScore} 
            restartScore={rest.restartScore} 
            questionNo={rest.questionNo}
          />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
