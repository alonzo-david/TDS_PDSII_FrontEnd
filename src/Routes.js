import React from "react";
import VIEWS from "./config/routing/routes";
import { Switch, Route } from "react-router-dom";
import Home from "./view/Home/Home";

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
          <Route
            key={route.path}
            path={`${route.path}`}
            render={(routeProps) => (
              <route.component {...routeProps} loggedIn={props.loggedIn} currentLevel={props.currentLevel} currentScore={props.currentScore} restartScore={props.restartScore} questionNo={props.questionNo} />
            )}
            exact
            match={props.search}
          />
        );
      })}

      {PRIVATE.map((route) => {
        return (
          <Route
            key={route.path}
            path={`${route.path}`}
            render={(routeProps) => (
              <route.component {...routeProps} loggedIn={props.loggedIn} currentLevel={props.currentLevel} currentScore={props.currentScore} restartScore={props.restartScore} questionNo={props.questionNo} />
            )}
            exact
          />
        );
      })}
      <Route component={NOT_FOUND.component} />
    </Switch>
  );
};

export default Routes;
