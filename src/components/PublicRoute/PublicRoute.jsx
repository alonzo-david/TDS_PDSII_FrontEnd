import React from "react";
import * as AuthService from "../../services/AuthService";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ routes, ...rest }) => {
  const isLoggedIn = AuthService.isLoggedIn();

  return (
    <Route
      {...rest}
      render={(props) => {
        return !isLoggedIn ? (
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

export default PublicRoute;
