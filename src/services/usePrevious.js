import React, { useRef, useEffect } from "react";

/*function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}*/

function usePrevious(data) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current;
}

export default usePrevious;
