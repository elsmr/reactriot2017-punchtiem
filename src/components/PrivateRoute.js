import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ render, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        auth === true
          ? render
          : props => <Redirect to={{ pathname: "/login", state: { from: props.location } }} />}
    />
  );
}

export default PrivateRoute;
