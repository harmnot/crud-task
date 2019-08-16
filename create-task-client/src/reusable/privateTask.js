import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { TaskContext } from "../contexts/taskContext.js";

function PrivateTask({ component: Component, ...rest }) {
  const { state } = useContext(TaskContext);

  return (
    <Route
      {...rest}
      render={props =>
        state.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateTask;
