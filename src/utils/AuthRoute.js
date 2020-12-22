import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuth } from "../context/Auth";

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
