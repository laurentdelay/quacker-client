import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

function LoadingDimmer({ active, children }) {
  return (
    <Dimmer active={active}>
      <Loader active size="huge">
        {children}
      </Loader>
    </Dimmer>
  );
}

export default LoadingDimmer;
