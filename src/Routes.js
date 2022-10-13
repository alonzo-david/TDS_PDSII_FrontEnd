import React from "react";
import VIEWS from "./config/routing/routes";
import { Switch, Route } from "react-router-dom";

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
              <route.component
                {...routeProps}
                itemShopping={props.itemCarrito}
              />
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
              <route.component
                {...routeProps}
              />
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