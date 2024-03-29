import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={ props => context.authenticatedAdmin ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: "/admin-login",
                state: { from: props.location },
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};