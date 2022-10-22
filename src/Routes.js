import React from "react";
import VIEWS from "./config/routing/routes";
import { Switch, Route } from "react-router-dom";
import Home from "./view/Home/Home";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";

const Routes = (props) => {
  const { HOME, PUBLIC, PRIVATE, NOT_FOUND } = VIEWS;

  return (
    <Switch>
      <Route
        key={HOME.path}
        path={`${HOME.path}`}
        component={HOME.component}
        exact
      />

      {PUBLIC.map((route) => {
        return (
          <PublicRoute
            key={route.path}
            path={route.path}
            exact={true}

            loggedIn={props.loggedIn}
            currentLevel={props.currentLevel}
            currentScore={props.currentScore}
            restartScore={props.restartScore}

            questionNo={props.questionNo}
            routes={route}
          />
        );
      })}

      {PRIVATE.map((route) => {
        return (
          <PrivateRoute
            key={route.path}
            path={route.path}
            exact={true}
            
            loggedIn={props.loggedIn}
            currentLevel={props.currentLevel}
            currentScore={props.currentScore}
            restartScore={props.restartScore}
            questionNo={props.questionNo}
            routes={route}
          />
        );
      })}
      <Route component={NOT_FOUND.component} />
    </Switch>
  );
};

export default Routes;
