import React from "react";
import { withRouter } from "react-router";
import { Button } from "@mui/material";

const LinkButton = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;
  return (    
    <Button
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event);
        history.push(to);
      }}
      style={{ backgroundColor: "#4D8E17", color: "#FFFFFF" }}
    />
  );
};

export default withRouter(LinkButton);
